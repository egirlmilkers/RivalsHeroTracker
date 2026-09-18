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

/**
 * The timestamp marking the END of `season` - i.e. the start of the next season,
 * or "now" if `season` is the most recent one we know about. Used for the X-axis
 * MAX bound so picking "through Season N" doesn't clip data logged partway through
 * a season that's still ongoing (the season's own *start* date would be in the past).
 */
function getSeasonEndTimestamp(season: number): number
{
	const seasonKeys = Object.keys(SEASON_DATES).map(Number).sort((a, b) => a - b)
	const idx = seasonKeys.indexOf(season)
	if (idx === -1 || idx === seasonKeys.length - 1) return Date.now()
	return SEASON_DATES[String(seasonKeys[idx + 1])]
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

/** Highest season number we have a start date for (drives the X-axis slider's max). */
export const MAX_SEASON = Math.max(...Object.keys(SEASON_DATES).map(Number))

/** Maps a level (0-70) to the total XP required to reach it - same checkpoints as the gridlines. */
function levelToTotal(lvl: number): number
{
	if (lvl <= 0) return 0
	if (lvl <= 10) return pointBaselines.Captain
	if (lvl <= 20) return pointBaselines.Lord
	if (lvl <= 30) return pointBaselines.Colonel
	if (lvl <= 40) return pointBaselines.Elite
	if (lvl <= 50) return pointBaselines.Champion
	if (lvl <= 60) return pointBaselines.Champion + 31000 // 10 levels * 3100 XP
	return pointBaselines.MAX
}

// ============================================================================
// Chart rendering (plain canvas, no external deps to match the rest of the site)
// ============================================================================

const CHART_PADDING = { top: 20, right: 20, bottom: 30, left: 40 }

/** Manual axis bounds set via the chart settings panel. Undefined fields auto-fit as before. */
export interface ChartAxisRange
{
	xMinSeason?: number
	xMaxSeason?: number
	yMinLevel?: number
	yMaxLevel?: number
}

function drawChart(
	canvas: HTMLCanvasElement,
	seriesList: { name: string; color: string; points: ChartPoint[] }[],
	axisRange: ChartAxisRange = {}
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
	const minTs = axisRange.xMinSeason !== undefined
		? getSeasonTimestamp(axisRange.xMinSeason)
		: GAME_LAUNCH_TS
	const maxTs = axisRange.xMaxSeason !== undefined
		? getSeasonEndTimestamp(axisRange.xMaxSeason)
		: Math.max(Date.now(), ...allPoints.map(p => p.ts))
	// Find the true max XP (defaults to Level 70 MAX)
	const minTotal = axisRange.yMinLevel !== undefined ? levelToTotal(axisRange.yMinLevel) : 0
	const maxTotal = axisRange.yMaxLevel !== undefined
		? levelToTotal(axisRange.yMaxLevel)
		: Math.max(pointBaselines.MAX, ...allPoints.map(p => p.total))

	const x = (ts: number) =>
		CHART_PADDING.left + (maxTs === minTs ? 0 : ((ts - minTs) / (maxTs - minTs)) * plotW)
	const y = (total: number) =>
		CHART_PADDING.top + plotH
		- (maxTotal === minTotal ? 0 : ((total - minTotal) / (maxTotal - minTotal)) * plotH)

	// Gridlines + Y axis labels (Mapped specifically to the XP required for every 10 levels)
	ctx.strokeStyle = 'rgba(255,255,255,0.08)'
	ctx.fillStyle = '#666'
	ctx.font = '11px inherit'
	ctx.textAlign = 'right'
	ctx.textBaseline = 'middle'

	const step = 10
	for (let lvl = 0; lvl <= 70; lvl += step)
	{
		const totalForLevel = levelToTotal(lvl)
		if (totalForLevel < minTotal || totalForLevel > maxTotal) continue

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
		if (ts > maxTs || ts < minTs) continue

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

	// Draw each series, clipped to the plot area (matters once axis bounds are narrowed manually)
	ctx.save()
	ctx.beginPath()
	ctx.rect(CHART_PADDING.left, CHART_PADDING.top, plotW, plotH)
	ctx.clip()

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

	ctx.restore()
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

// Hidden legend heroes for the "All Heroes" (global) chart persist across sessions.
// Per-hero charts only ever show one series (the legend's hidden anyway), so their
// hidden set is always fresh and never touches storage.
const GLOBAL_HIDDEN_HEROES_KEY = 'rivalsChartGlobalHiddenHeroes'

function loadGlobalHiddenHeroes(): Set<string>
{
	try
	{
		const raw = localStorage.getItem(GLOBAL_HIDDEN_HEROES_KEY)
		return new Set(raw ? JSON.parse(raw) : [])
	} catch (e)
	{
		return new Set()
	}
}

function saveGlobalHiddenHeroes(hidden: Set<string>): void
{
	localStorage.setItem(GLOBAL_HIDDEN_HEROES_KEY, JSON.stringify([...hidden]))
}

let hiddenLegendHeroes = new Set<string>()
let isGlobalChart = false
let currentChartHeroes: Hero[] = []
let currentAxisRange: ChartAxisRange = {}

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
			if (isGlobalChart) saveGlobalHiddenHeroes(hiddenLegendHeroes)
			renderChartModal(heroes)
		}
		legend.appendChild(item)
	})
}

function renderChartModal(heroes: Hero[]): void
{
	currentChartHeroes = heroes
	const canvas = querySelector<HTMLCanvasElement>('#chart-canvas')
	const series = heroes
		.filter(hero => !hiddenLegendHeroes.has(hero.name))
		.map(hero => ({ name: hero.name, color: hero.color, points: buildSeries(hero) }))
	drawChart(canvas, series, currentAxisRange)
	renderLegend(heroes)
}

/** Resets the axis-settings panel's sliders/labels back to "auto-fit" and hides the panel. */
function resetAxisSettingsUI(): void
{
	currentAxisRange = {}
	querySelector<HTMLDivElement>('#chart-axis-settings').style.display = 'none'

	const xMin = querySelector<HTMLInputElement>('#chart-x-min')
	const xMax = querySelector<HTMLInputElement>('#chart-x-max')
	const yMin = querySelector<HTMLInputElement>('#chart-y-min')
	const yMax = querySelector<HTMLInputElement>('#chart-y-max')

	xMin.value = '0'
	xMax.value = String(MAX_SEASON)
	yMin.value = '0'
	yMax.value = '70'
	updateAxisLabels()
}

function updateDualRangeFill(
	minInput: HTMLInputElement,
	maxInput: HTMLInputElement,
	fill: HTMLDivElement
): void
{
	const lo = +minInput.min
	const hi = +minInput.max
	const span = hi - lo || 1
	const loPct = ((+minInput.value - lo) / span) * 100
	const hiPct = ((+maxInput.value - lo) / span) * 100
	fill.style.left = `${loPct}%`
	fill.style.right = `${100 - hiPct}%`
}

function updateAxisLabels(): void
{
	const xMin = querySelector<HTMLInputElement>('#chart-x-min')
	const xMax = querySelector<HTMLInputElement>('#chart-x-max')
	const yMin = querySelector<HTMLInputElement>('#chart-y-min')
	const yMax = querySelector<HTMLInputElement>('#chart-y-max')

	querySelector<HTMLSpanElement>('#chart-x-min-val').innerText = `S${xMin.value}`
	querySelector<HTMLSpanElement>('#chart-x-max-val').innerText = `S${xMax.value}`
	querySelector<HTMLSpanElement>('#chart-y-min-val').innerText = yMin.value
	querySelector<HTMLSpanElement>('#chart-y-max-val').innerText = yMax.value

	updateDualRangeFill(xMin, xMax, querySelector<HTMLDivElement>('#chart-x-fill'))
	updateDualRangeFill(yMin, yMax, querySelector<HTMLDivElement>('#chart-y-fill'))
}

/** Largest season number whose start date is at or before `ts` (0 if `ts` predates launch). */
function seasonFloor(ts: number): number
{
	let best = 0
	for (const [season, seasonTs] of Object.entries(SEASON_DATES))
		if (seasonTs <= ts)
			best = Math.max(best, Number(season))
	return best
}

/** Smallest 10-level checkpoint whose XP requirement is at or above `total`. */
function levelCeilForTotal(total: number): number
{
	for (let lvl = 0; lvl <= 70; lvl += 10) if (levelToTotal(lvl) >= total) return lvl
	return 70
}

/**
 * Zooms the axis sliders to the real (non-synthetic, non-dashed) data actually on
 * screen: X starts a little before the earliest logged point, Y tops out a little
 * above the highest logged total. Leaves the other two edges on auto-fit. No-ops
 * if nothing's logged yet for the current selection.
 */
function fitAxisToData(): void
{
	const visibleHeroes = currentChartHeroes.filter(h => !hiddenLegendHeroes.has(h.name))
	const realPoints = visibleHeroes.flatMap(h => getHistory(h.name))
	if (realPoints.length === 0) return

	const firstTs = Math.min(...realPoints.map(p => p.ts))
	const maxTotal = Math.max(...realPoints.map(p => p.total))

	const xMinSeason = Math.max(0, seasonFloor(firstTs))
	const yMaxLevel = Math.min(70, levelCeilForTotal(maxTotal) + 10)

	const xMinInput = querySelector<HTMLInputElement>('#chart-x-min')
	const xMaxInput = querySelector<HTMLInputElement>('#chart-x-max')
	const yMinInput = querySelector<HTMLInputElement>('#chart-y-min')
	const yMaxInput = querySelector<HTMLInputElement>('#chart-y-max')

	xMinInput.value = String(xMinSeason)
	yMaxInput.value = String(yMaxLevel)
	updateAxisLabels()

	// querySelector<HTMLDivElement>('#chart-axis-settings').style.display = 'block'

	currentAxisRange = {
		xMinSeason: +xMinInput.value,
		xMaxSeason: +xMaxInput.value,
		yMinLevel: +yMinInput.value,
		yMaxLevel: +yMaxInput.value
	}
	renderChartModal(currentChartHeroes)
}

/** Wires up the gear icon, the two dual sliders, and the Apply/Reset buttons. Call once on page load. */
export function wireChartAxisSettings(): void
{
	const xMin = querySelector<HTMLInputElement>('#chart-x-min')
	const xMax = querySelector<HTMLInputElement>('#chart-x-max')
	const yMin = querySelector<HTMLInputElement>('#chart-y-min')
	const yMax = querySelector<HTMLInputElement>('#chart-y-max')

	xMin.max = xMax.max = String(MAX_SEASON)

	xMin.oninput = () =>
	{
		if (+xMin.value > +xMax.value) xMax.value = xMin.value
		updateAxisLabels()
	}
	xMax.oninput = () =>
	{
		if (+xMax.value < +xMin.value) xMin.value = xMax.value
		updateAxisLabels()
	}
	yMin.oninput = () =>
	{
		if (+yMin.value > +yMax.value) yMax.value = yMin.value
		updateAxisLabels()
	}
	yMax.oninput = () =>
	{
		if (+yMax.value < +yMin.value) yMin.value = yMax.value
		updateAxisLabels()
	}

	querySelector<HTMLButtonElement>('#chart-settings-btn').onclick = () =>
	{
		const panel = querySelector<HTMLDivElement>('#chart-axis-settings')
		panel.style.display = panel.style.display === 'none' ? 'block' : 'none'
	}

	querySelector<HTMLButtonElement>('#chart-fit-data-btn').onclick = fitAxisToData

	querySelector<HTMLButtonElement>('#chart-axis-apply-btn').onclick = () =>
	{
		currentAxisRange = {
			xMinSeason: +xMin.value,
			xMaxSeason: +xMax.value,
			yMinLevel: +yMin.value,
			yMaxLevel: +yMax.value
		}
		renderChartModal(currentChartHeroes)
	}

	querySelector<HTMLButtonElement>('#chart-axis-reset-btn').onclick = () =>
	{
		resetAxisSettingsUI()
		renderChartModal(currentChartHeroes)
	}

	updateAxisLabels()
}

/** Opens the chart modal scoped to a single hero. */
export function openHeroChartModal(heroName: string): void
{
	const hero = heroDefinitions.find(h => h.name === heroName)
	if (!hero) return

	isGlobalChart = false
	hiddenLegendHeroes = new Set()
	resetAxisSettingsUI()
	querySelector<HTMLSpanElement>('#chart-modal-title').innerText = `${heroName} Progress`
	querySelector<HTMLDivElement>('#chart-modal').style.display = 'flex'
	renderChartModal([hero])
}

/** Opens the chart modal with every hero that has any logged progress. */
export function openAllHeroesChartModal(): void
{
	isGlobalChart = true
	hiddenLegendHeroes = loadGlobalHiddenHeroes()
	resetAxisSettingsUI()
	const touched = heroDefinitions.filter(hero =>
	{
		const item = heroData.find(h => h.name === hero.name)
		if (!item) return false
		return getHistory(hero.name).length > 0 || calculateTotalScore(item) > 0
	})

	querySelector<HTMLSpanElement>('#chart-modal-title').innerText = 'All Heroes Progress'
	querySelector<HTMLDivElement>('#chart-modal').style.display = 'flex'
	renderChartModal(touched.length > 0 ? touched : heroDefinitions)
}

export function closeChartModal(): void
{
	querySelector<HTMLDivElement>('#chart-modal').style.display = 'none'
}
