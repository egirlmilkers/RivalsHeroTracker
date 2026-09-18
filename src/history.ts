import { calculateTotalScore, heroData, heroDefinitions, pointBaselines } from './script'
import { querySelector } from './util'

// ============================================================================
// Proficiency History Tracking
//
// Every time a hero's level/points changes, we log { timestamp, total } to
// localStorage. To avoid cluttering the chart with "oops, fat-fingered it"
// corrections, edits made within 60s of the previous log for that hero
// overwrite it instead of creating a new point.
//
// Charts plot "fractional level" (e.g. 23.4) over time so the Y axis reads
// the same way the rest of the site does. Every hero's line starts from a
// synthetic anchor point at Level 0 - either Season 0 (game launch) or, for
// heroes added later, the season they released in - connected to their first
// *real* logged point with a dashed line, since we don't actually know what
// happened in between.
// ============================================================================

const HISTORY_KEY = 'rivalsProficiencyHistory'
const EDIT_BUFFER_MS = 60_000 // 60s "oops" window

// Season start dates (UTC)
export const SEASON_DATES: Record<string, number> = {
	'0': Date.UTC(2024, 11, 6), // Dec 6, 2024
	'1': Date.UTC(2025, 0, 10), // Jan 10, 2025
	'1.5': Date.UTC(2025, 1, 21), // Feb 21, 2025
	'2': Date.UTC(2025, 3, 11), // Apr 11, 2025
	'2.5': Date.UTC(2025, 4, 30), // May 30, 2025
	'3': Date.UTC(2025, 6, 11), // July 11, 2025
	'3.5': Date.UTC(2025, 7, 8), // Aug 8, 2025
	'4': Date.UTC(2025, 8, 12), // Sep 12, 2025
	'4.5': Date.UTC(2025, 9, 10), // Oct 10, 2025
	'5': Date.UTC(2025, 10, 14), // Nov 14, 2025
	'5.5': Date.UTC(2025, 11, 12), // Dec 12, 2025
	'6': Date.UTC(2026, 0, 16), // Jan 16, 2026
	'6.5': Date.UTC(2026, 1, 13), // Feb 13, 2026
	'7': Date.UTC(2026, 2, 20), // Mar 20, 2026
	'7.5': Date.UTC(2026, 3, 17), // Apr 17, 2026
	'8': Date.UTC(2026, 4, 15), // May 15, 2026
	'8.5': Date.UTC(2026, 5, 12), // June 12, 2026
	'9': Date.UTC(2026, 6, 10), // Jul 10, 2026
	'9.5': Date.UTC(2026, 7, 7), // Aug 7, 2026
	'10': Date.UTC(2026, 8, 11) // Sep 11, 2026
}

const GAME_LAUNCH_TS = SEASON_DATES['0']

function getSeasonTimestamp(season: number | undefined): number
{
	if (season === undefined) return GAME_LAUNCH_TS
	const key = String(season)
	return SEASON_DATES[key] ?? GAME_LAUNCH_TS
}

function loadHistory(): HeroHistoryMap
{
	try
	{
		const raw = localStorage.getItem(HISTORY_KEY)
		return raw ? JSON.parse(raw) : {}
	} catch (e)
	{
		return {}
	}
}

function saveHistory(history: HeroHistoryMap): void
{
	localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}

/**
 * Logs a new proficiency total for a hero, subject to the 60s edit buffer:
 * if the previous log for this hero happened less than 60s ago, it's
 * overwritten rather than appending a new point (accounts for mis-clicks).
 * No-ops if the total hasn't actually changed.
 */
export function recordPoint(heroName: string, total: number, now: number = Date.now()): void
{
	const history = loadHistory()
	const list = history[heroName] || []
	const last = list[list.length - 1]

	if (last && last.total === total) return // nothing changed, don't spam the log

	if (last && now - last.ts <= EDIT_BUFFER_MS) list[list.length - 1] = { ts: now, total }
	else list.push({ ts: now, total })

	history[heroName] = list
	saveHistory(history)
}

/** Returns the full raw history map, for inclusion in data backups. */
export function getHistorySnapshot(): HeroHistoryMap
{
	return loadHistory()
}

/** Restores a history map from a data backup. Overwrites what's here now. */
export function restoreHistorySnapshot(data: HeroHistoryMap | undefined | null): void
{
	saveHistory(data || {})
}

const BACKFILL_FLAG_KEY = 'rivalsProficiencyHistoryBackfilled'

/**
 * Logs every hero's *current* level/points as a real history point, right
 * now - including heroes still sitting at Agent / 0 points, so nothing on
 * the "all heroes" chart looks like it's silently missing. Used both to
 * seed an existing user's first chart data, and to give a freshly-enabled
 * "Track Data" toggle a real starting line instead of a long dashed guess.
 */
export function seedCurrentDataAsHistory(): void
{
	const now = Date.now()
	for (const hero of heroData) recordPoint(hero.name, calculateTotalScore(hero), now)
	localStorage.setItem(BACKFILL_FLAG_KEY, '1')
}

/**
 * One-time on-load seed for people who already had save data (and so
 * tracking defaults to on) before ever loading this feature. Gated behind
 * a flag so it never re-runs and never stomps on history someone's already
 * building.
 */
export function backfillHistoryIfNeeded(): void
{
	if (localStorage.getItem(BACKFILL_FLAG_KEY)) return
	seedCurrentDataAsHistory()
}

/** Real logged points for a hero, sorted oldest -> newest. */
export function getHistory(heroName: string): HistoryPoint[]
{
	const list = loadHistory()[heroName] || []
	return [...list].sort((a, b) => a.ts - b.ts)
}

/** Highest total ever logged for a hero (0 if none logged yet). */
export function getMaxRecordedTotal(heroName: string): number
{
	const list = getHistory(heroName)
	return list.reduce((max, p) => Math.max(max, p.total), 0)
}

/**
 * True if `total` is below the highest point already on this hero's chart -
 * i.e. this input would look like a regression. Used to drive the small
 * warning icon next to the points input.
 */
export function isRegression(heroName: string, total: number): boolean
{
	return total < getMaxRecordedTotal(heroName)
}

/** Builds the full plotted series for a hero: synthetic anchor + real points. */
function buildSeries(hero: Hero): ChartPoint[]
{
	const anchor: ChartPoint = {
		ts: getSeasonTimestamp(hero.releaseSeason),
		total: 0,
		synthetic: true
	}
	const real = getHistory(hero.name).map(p => ({ ...p, synthetic: false }))
	return [anchor, ...real]
}

// ============================================================================
// Chart rendering (plain canvas, no external deps to match the rest of the site)
// ============================================================================

const CHART_PADDING = { top: 20, right: 20, bottom: 30, left: 40 }

function drawChart(
	canvas: HTMLCanvasElement,
	seriesList: { name: string; color: string; points: ChartPoint[] }[]
): void
{
	const dpr = window.devicePixelRatio || 1
	const rect = canvas.getBoundingClientRect()
	canvas.width = rect.width * dpr
	canvas.height = rect.height * dpr
	const ctx = canvas.getContext('2d')
	if (!ctx) return
	ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

	const w = rect.width
	const h = rect.height
	ctx.clearRect(0, 0, w, h)

	const plotW = w - CHART_PADDING.left - CHART_PADDING.right
	const plotH = h - CHART_PADDING.top - CHART_PADDING.bottom

	const visibleSeries = seriesList.filter(s => s.points.length > 0)
	if (visibleSeries.length === 0)
	{
		ctx.fillStyle = '#666'
		ctx.font = '14px inherit'
		ctx.textAlign = 'center'
		ctx.fillText('No data logged yet for this selection.', w / 2, h / 2)
		return
	}

	const allPoints = visibleSeries.flatMap(s => s.points)
	// const minTs = Math.min(...allPoints.map(p => p.ts))
	const minTs = GAME_LAUNCH_TS
	const maxTs = Math.max(Date.now(), ...allPoints.map(p => p.ts))
	// Find the true max XP (defaults to Level 70 MAX)
	const maxTotal = Math.max(pointBaselines.MAX, ...allPoints.map(p => p.total))

	const x = (ts: number) =>
		CHART_PADDING.left + (maxTs === minTs ? 0 : ((ts - minTs) / (maxTs - minTs)) * plotW)
	const y = (total: number) => CHART_PADDING.top + plotH - (total / maxTotal) * plotH

	// Gridlines + Y axis labels (Mapped specifically to the XP required for every 10 levels)
	ctx.strokeStyle = 'rgba(255,255,255,0.08)'
	ctx.fillStyle = '#666'
	ctx.font = '11px inherit'
	ctx.textAlign = 'right'
	ctx.textBaseline = 'middle'

	const step = 10
	for (let lvl = 0; lvl <= 70; lvl += step)
	{
		let totalForLevel = 0
		if (lvl === 10) totalForLevel = pointBaselines.Captain
		else if (lvl === 20) totalForLevel = pointBaselines.Lord
		else if (lvl === 30) totalForLevel = pointBaselines.Colonel
		else if (lvl === 40) totalForLevel = pointBaselines.Elite
		else if (lvl === 50) totalForLevel = pointBaselines.Champion
		else if (lvl === 60) totalForLevel = pointBaselines.Champion + 31000 // 10 levels * 3100 XP
		else if (lvl === 70) totalForLevel = pointBaselines.MAX

		const yy = y(totalForLevel)
		ctx.beginPath()
		ctx.moveTo(CHART_PADDING.left, yy)
		ctx.lineTo(w - CHART_PADDING.right, yy)
		ctx.stroke()
		ctx.fillText(String(lvl), CHART_PADDING.left - 8, yy)
	}

	// X axis labels (Seasons)
	ctx.textBaseline = 'top'
	ctx.fillStyle = '#888'

	for (const [season, ts] of Object.entries(SEASON_DATES))
	{
		if (ts > maxTs) continue

		const xx = x(ts)

		// Tick mark for all seasons/mid-seasons
		ctx.beginPath()
		ctx.moveTo(xx, h - CHART_PADDING.bottom)
		ctx.lineTo(xx, h - CHART_PADDING.bottom + 4)
		ctx.stroke()

		// Label for major seasons only to avoid crowding
		if (!season.includes('.'))
		{
			// Align S0 to the left edge, center the rest
			ctx.textAlign = season === '0' ? 'left' : 'center'
			ctx.fillText(`S${season}`, xx, h - CHART_PADDING.bottom + 8)
		}
	}

	// Keep the current date on the far right edge (shifted down slightly to avoid overlap)
	ctx.textAlign = 'right'
	ctx.fillText(formatDate(maxTs), w - CHART_PADDING.right, h - CHART_PADDING.bottom + 20)

	// Draw each series
	for (const series of visibleSeries)
	{
		const pts = series.points
		ctx.strokeStyle = series.color
		ctx.fillStyle = series.color
		ctx.lineWidth = 2

		for (let i = 1; i < pts.length; i++)
		{
			const prev = pts[i - 1]
			const cur = pts[i]
			ctx.beginPath()
			ctx.setLineDash(prev.synthetic ? [6, 5] : [])

			// Draw raw total XP on the Y axis
			ctx.moveTo(x(prev.ts), y(prev.total))
			ctx.lineTo(x(cur.ts), y(cur.total))
			ctx.stroke()
		}
		ctx.setLineDash([])

		// dots on real points only
		for (const p of pts)
		{
			if (p.synthetic) continue
			ctx.beginPath()
			ctx.arc(x(p.ts), y(p.total), 3, 0, Math.PI * 2)
			ctx.fill()
		}
	}
}

function formatDate(ts: number): string
{
	return new Date(ts).toLocaleDateString(undefined, {
		month: 'short',
		day: 'numeric',
		year: '2-digit'
	})
}

// ============================================================================
// Modal wiring
// ============================================================================

let hiddenLegendHeroes = new Set<string>()

function renderLegend(heroes: Hero[]): void
{
	const legend = querySelector<HTMLDivElement>('#chart-legend')
	legend.innerHTML = ''
	legend.style.display = heroes.length > 1 ? 'flex' : 'none'

	heroes.forEach(hero =>
	{
		const item = document.createElement('span')
		item.className = 'chart-legend-item'
			+ (hiddenLegendHeroes.has(hero.name) ? ' chart-legend-off' : '')
		item.innerHTML =
			`<span class="chart-legend-swatch" style="background:${hero.color}"></span>${hero.name}`
		item.onclick = () =>
		{
			if (hiddenLegendHeroes.has(hero.name)) hiddenLegendHeroes.delete(hero.name)
			else hiddenLegendHeroes.add(hero.name)
			renderChartModal(heroes)
		}
		legend.appendChild(item)
	})
}

function renderChartModal(heroes: Hero[]): void
{
	const canvas = querySelector<HTMLCanvasElement>('#chart-canvas')
	const series = heroes
		.filter(hero => !hiddenLegendHeroes.has(hero.name))
		.map(hero => ({ name: hero.name, color: hero.color, points: buildSeries(hero) }))
	drawChart(canvas, series)
	renderLegend(heroes)
}

/** Opens the chart modal scoped to a single hero. */
export function openHeroChartModal(heroName: string): void
{
	const hero = heroDefinitions.find(h => h.name === heroName)
	if (!hero) return

	hiddenLegendHeroes = new Set()
	querySelector<HTMLHeadingElement>('#chart-modal-title').innerText = `${heroName} Progress`
	querySelector<HTMLDivElement>('#chart-modal').style.display = 'flex'
	renderChartModal([hero])
}

/** Opens the chart modal with every hero that has any logged progress. */
export function openAllHeroesChartModal(): void
{
	hiddenLegendHeroes = new Set()
	const touched = heroDefinitions.filter(hero =>
	{
		const item = heroData.find(h => h.name === hero.name)
		if (!item) return false
		return getHistory(hero.name).length > 0 || calculateTotalScore(item) > 0
	})

	querySelector<HTMLHeadingElement>('#chart-modal-title').innerText = 'All Heroes Progress'
	querySelector<HTMLDivElement>('#chart-modal').style.display = 'flex'
	renderChartModal(touched.length > 0 ? touched : heroDefinitions)
}

export function closeChartModal(): void
{
	querySelector<HTMLDivElement>('#chart-modal').style.display = 'none'
}
