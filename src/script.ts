import { checkChangelog, closeChangelogModal, showFullChangelog } from './changelog'
import { closeShareModal, downloadShareImage, openShareModal } from './share'
import { h, querySelector, querySelectorAll } from './util'

export const heroDefinitions: Hero[] = [
	{
		name: 'Adam Warlock',
		role: 'Strategist',
		color: '#c28b43',
		tags: [
			'gold',
			'guardian',
			'gotg'
		],
		offsetX: 6,
		offsetY: -9,
		scale: 1.5
	},
	{
		name: 'Angela',
		role: 'Vanguard',
		color: '#e68820',
		tags: [
			'gold'
		],
		offsetX: 4,
		offsetY: -11,
		scale: 1.5
	},
	{
		name: 'Black Cat',
		role: 'Duelist',
		color: '#6252da',
		tags: [
			'purple',
			'felicia',
			'hardy'
		],
		offsetX: 0,
		offsetY: -8,
		scale: 1.55
	},
	{
		name: 'Black Panther',
		role: 'Duelist',
		color: '#644579',
		tags: [
			'purple',
			"t'challa",
			'challa'
		],
		offsetX: 3,
		offsetY: -11,
		scale: 1.6
	},
	{
		name: 'Black Widow',
		role: 'Duelist',
		color: '#555b6a',
		tags: [
			'natasha',
			'romanova',
			'black'
		],
		offsetX: -2,
		offsetY: -9,
		scale: 1.4
	},
	{
		name: 'Blade',
		role: 'Duelist',
		color: '#b23e43',
		tags: [
			'red',
			'eric',
			'brooks'
		],
		offsetX: -1,
		offsetY: -9,
		scale: 1.4
	},
	{
		name: 'Bruce Banner',
		role: 'Vanguard',
		color: '#387458',
		tags: [
			'green',
			'hulk',
			'bruce',
			'banner'
		],
		offsetX: 12,
		offsetY: -9,
		scale: 1.5
	},
	{
		name: 'Captain America',
		role: 'Vanguard',
		color: '#3872b1',
		tags: [
			'blue',
			'steven',
			'steve',
			'rogers'
		],
		offsetX: -1,
		offsetY: -11,
		scale: 1.65
	},
	{
		name: 'Cloak and Dagger',
		role: 'Strategist',
		color: '#889bfd',
		tags: [
			'blue',
			'tyrone',
			'johnson',
			'tandy',
			'bowen'
		],
		offsetX: -9,
		offsetY: 0,
		scale: 1.45
	},
	{
		name: 'Cyclops',
		role: 'Duelist',
		color: '#37bdda',
		tags: [
			'mutant',
			'scott',
			'summers',
			'blue'
		],
		offsetX: 12,
		offsetY: 3,
		scale: 1.6
	},
	{
		name: 'Daredevil',
		role: 'Duelist',
		color: '#d02959',
		tags: [
			'matt',
			'murdock',
			'red'
		],
		offsetX: 2,
		offsetY: -11,
		scale: 1.6
	},
	{
		name: 'Deadpool',
		role: [
			'Vanguard',
			'Duelist',
			'Strategist'
		],
		color: '#f24547',
		tags: [
			'red',
			'flex',
			'wade',
			'wilson'
		],
		offsetX: -1,
		offsetY: -5,
		scale: 1.5
	},
	{
		name: 'Devil Dinosaur',
		role: 'Vanguard',
		color: '#b22d39',
		tags: [
			'red',
			'dino',
			'moon',
			'girl'
		],
		offsetX: -9,
		offsetY: -11,
		scale: 1.55
	},
	{
		name: 'Doctor Strange',
		role: 'Vanguard',
		color: '#db635c',
		tags: [
			'stephen',
			'strange',
			'orange'
		],
		offsetX: -3,
		offsetY: -10,
		scale: 1.4
	},
	{
		name: 'Elsa Bloodstone',
		role: 'Duelist',
		color: '#e96346',
		tags: [
			'orange'
		],
		offsetX: 3,
		offsetY: -10,
		scale: 1.4
	},
	{
		name: 'Emma Frost',
		role: 'Vanguard',
		color: '#35ade4',
		tags: [
			'blue',
			'mutant'
		],
		offsetX: 5,
		offsetY: -4,
		scale: 1.4
	},
	{
		name: 'Gambit',
		role: 'Strategist',
		color: '#d763a0',
		tags: [
			'gambit',
			'pink',
			'remy',
			'lebeau'
		],
		offsetX: 0,
		offsetY: 4,
		scale: 1.5
	},
	{
		name: 'Gorr The God Butcher',
		role: 'Duelist',
		color: '#4b808b',
		tags: [
			'turquoise'
		],
		offsetX: 0,
		offsetY: -10,
		scale: 1.6
	},
	{
		name: 'Groot',
		role: 'Vanguard',
		color: '#83a862',
		tags: [
			'green',
			'guardian',
			'gotg'
		],
		offsetX: 5,
		offsetY: 1,
		scale: 1.4
	},
	{
		name: 'Hawkeye',
		role: 'Duelist',
		color: '#8969a6',
		tags: [
			'purple',
			'clint',
			'barton'
		],
		offsetX: -5,
		offsetY: -6,
		scale: 1.5
	},
	{
		name: 'Hela',
		role: 'Duelist',
		color: '#388c8c',
		tags: [
			'green'
		],
		offsetX: 2,
		offsetY: -10,
		scale: 1.4
	},
	{
		name: 'Human Torch',
		role: 'Duelist',
		color: '#d8764a',
		tags: [
			'orange',
			'johnny',
			'storm',
			'4',
			'fantastic'
		],
		offsetX: 1,
		offsetY: -7,
		scale: 1.4
	},
	{
		name: 'Invisible Woman',
		role: 'Strategist',
		color: '#3ac4f7',
		tags: [
			'blue',
			'sue',
			'susan',
			'storm',
			'4',
			'fantastic'
		],
		offsetX: 0,
		offsetY: -2,
		scale: 1.05
	},
	{
		name: 'Iron Fist',
		role: 'Duelist',
		color: '#088078',
		tags: [
			'green',
			'lin',
			'lie'
		],
		offsetX: 4,
		offsetY: -2,
		scale: 1.5
	},
	{
		name: 'Iron Man',
		role: 'Duelist',
		color: '#dd5067',
		tags: [
			'anthony',
			'stark',
			'tony',
			'red'
		],
		offsetX: 6,
		offsetY: -13,
		scale: 1.65
	},
	{
		name: 'Jeff The Land Shark',
		role: 'Strategist',
		color: '#5f79a5',
		tags: [
			'blue',
			'gray',
			'grey'
		],
		offsetX: 7,
		offsetY: -10,
		scale: 1.4
	},
	{
		name: 'Jubilee',
		role: 'Strategist',
		color: '#cbb341',
		tags: [
			'yellow',
			'jubilation',
			'lee'
		],
		offsetX: 0,
		offsetY: -10,
		scale: 1.4
	},
	{
		name: 'Loki',
		role: 'Strategist',
		color: '#4c865c',
		tags: [
			'green',
			'lady',
			'laufeyson'
		],
		offsetX: 3,
		offsetY: -2,
		scale: 1.4
	},
	{
		name: 'Luna Snow',
		role: 'Strategist',
		color: '#1165bf',
		tags: [
			'blue',
			'seol',
			'hee'
		],
		offsetX: 5,
		offsetY: -1,
		scale: 1.55
	},
	{
		name: 'Magik',
		role: 'Duelist',
		color: '#8f615f',
		tags: [
			'mutant',
			'illyana',
			'rasputin',
			'brown'
		],
		offsetX: 3,
		offsetY: -1,
		scale: 1.5
	},
	{
		name: 'Magneto',
		role: 'Vanguard',
		color: '#425f67',
		tags: [
			'mutant',
			'grey',
			'gray',
			'max',
			'eisenhardt'
		],
		offsetX: 3,
		offsetY: -9,
		scale: 1.55
	},
	{
		name: 'Mantis',
		role: 'Strategist',
		color: '#6c8c66',
		tags: [
			'green',
			'guardian',
			'gotg'
		],
		offsetX: 5,
		offsetY: -11,
		scale: 1.5
	},
	{
		name: 'Mister Fantastic',
		role: 'Duelist',
		color: '#2ccbe7',
		tags: [
			'blue',
			'reed',
			'richards',
			'fantastic',
			'4'
		],
		offsetX: 3,
		offsetY: -10,
		scale: 1.5
	},
	{
		name: 'Moon Knight',
		role: 'Duelist',
		color: '#6b8290',
		tags: [
			'grey',
			'gray',
			'marc',
			'spector',
			'steven',
			'grant',
			'jake',
			'lockley'
		],
		offsetX: -2,
		offsetY: 0,
		scale: 1.6
	},
	{
		name: 'Namor',
		role: 'Duelist',
		color: '#22938a',
		tags: [
			'mutant',
			'green',
			'mckenzie'
		],
		offsetX: 3,
		offsetY: -4,
		scale: 1.4
	},
	{
		name: 'Peni Parker',
		role: 'Vanguard',
		color: '#db5151',
		tags: [
			'red'
		],
		offsetX: 3,
		offsetY: -5,
		scale: 1.4
	},
	{
		name: 'Phoenix',
		role: 'Duelist',
		color: '#db5d51',
		tags: [
			'mutant',
			'jean',
			'grey',
			'orange'
		],
		offsetX: -2,
		offsetY: -2,
		scale: 1.6
	},
	{
		name: 'Psylocke',
		role: 'Duelist',
		color: '#a85bbb',
		tags: [
			'mutant',
			'purple',
			'sai'
		],
		offsetX: 4,
		offsetY: -5,
		scale: 1.55
	},
	{
		name: 'Rocket Raccoon',
		role: 'Strategist',
		color: '#d47253',
		tags: [
			'orange',
			'guardian',
			'gotg'
		],
		offsetX: 3,
		offsetY: -4,
		scale: 1.4
	},
	{
		name: 'Rogue',
		role: 'Vanguard',
		color: '#d1b231',
		tags: [
			'mutant',
			'yellow',
			'anna',
			'marie'
		],
		offsetX: 7,
		offsetY: -5,
		scale: 1.4
	},
	{
		name: 'Scarlet Witch',
		role: 'Duelist',
		color: '#d24466',
		tags: [
			'red',
			'wanda',
			'maximoff'
		],
		offsetX: 3,
		offsetY: -5,
		scale: 1.4
	},
	{
		name: 'Spider-Man',
		role: 'Duelist',
		color: '#d44f5a',
		tags: [
			'red',
			'peter',
			'parker'
		],
		offsetX: 2,
		offsetY: -10,
		scale: 1.6
	},
	{
		name: 'Squirrel Girl',
		role: 'Duelist',
		color: '#d38850',
		tags: [
			'orange',
			'doreen',
			'green'
		],
		offsetX: 5,
		offsetY: -10,
		scale: 1.5
	},
	{
		name: 'Star-Lord',
		role: 'Duelist',
		color: '#467ed7',
		tags: [
			'blue',
			'guardian',
			'gotg',
			'peter',
			'quill'
		],
		offsetX: 0,
		offsetY: 2,
		scale: 1.5
	},
	{
		name: 'Storm',
		role: 'Duelist',
		color: '#454f76',
		tags: [
			'mutant',
			'ororo',
			'munroe',
			'gray',
			'grey'
		],
		offsetX: 7,
		offsetY: -8,
		scale: 1.6
	},
	{
		name: 'The Hood',
		role: 'Vanguard',
		color: '#c62c33',
		tags: [
			'parker',
			'robbins',
			'red'
		],
		offsetX: 11,
		offsetY: 0,
		scale: 1.5
	},
	{
		name: 'The Punisher',
		role: 'Duelist',
		color: '#495366',
		tags: [
			'frank',
			'castle',
			'gray',
			'grey'
		],
		offsetX: 3,
		offsetY: -7,
		scale: 1.7
	},
	{
		name: 'The Thing',
		role: 'Vanguard',
		color: '#e1a75e',
		tags: [
			'orange',
			'fantastic',
			'four',
			'ben',
			'grimm'
		],
		offsetX: 3,
		offsetY: 1,
		scale: 1.6
	},
	{
		name: 'Thor',
		role: 'Vanguard',
		color: '#5964ab',
		tags: [
			'blue',
			'odinson'
		],
		offsetX: 3,
		offsetY: -10,
		scale: 1.4
	},
	{
		name: 'Ultron',
		role: 'Strategist',
		color: '#6b779f',
		tags: [
			'gray',
			'grey'
		],
		offsetX: 3,
		offsetY: -6,
		scale: 1.4
	},
	{
		name: 'Venom',
		role: 'Vanguard',
		color: '#2a2e3d',
		tags: [
			'black',
			'edward',
			'eddie',
			'brock'
		],
		offsetX: 8,
		offsetY: -12,
		scale: 1.5
	},
	{
		name: 'White Fox',
		role: 'Strategist',
		color: '#62d4de',
		tags: [
			'ami',
			'han',
			'blue',
			'turquoise'
		],
		offsetX: -2,
		offsetY: 0,
		scale: 1.4
	},
	{
		name: 'Winter Soldier',
		role: 'Duelist',
		color: '#6d7f41',
		tags: [
			'green',
			'james',
			'buchanan',
			'bucky',
			'barnes'
		],
		offsetX: 4,
		offsetY: 0,
		scale: 1.4
	},
	{
		name: 'Wolverine',
		role: 'Duelist',
		color: '#be962a',
		tags: [
			'mutant',
			'yellow',
			'logan'
		],
		offsetX: 3,
		offsetY: -12,
		scale: 1.7
	}
]

// Configuration for Levels and XP
const rankConfig: Rank[] = [
	{ title: 'Agent', startLvl: 1, endLvl: 4, totalRankXP: 500 },
	{ title: 'Knight', startLvl: 5, endLvl: 9, totalRankXP: 1200 },
	{ title: 'Captain', startLvl: 10, endLvl: 14, totalRankXP: 2000 },
	{ title: 'Centurion', startLvl: 15, endLvl: 19, totalRankXP: 2400 },
	{ title: 'Lord', startLvl: 20, endLvl: 24, totalRankXP: 8000 },
	{ title: 'Count', startLvl: 25, endLvl: 29, totalRankXP: 8000 },
	{ title: 'Colonel', startLvl: 30, endLvl: 34, totalRankXP: 8000 },
	{ title: 'Warrior', startLvl: 35, endLvl: 39, totalRankXP: 8000 },
	{ title: 'Elite', startLvl: 40, endLvl: 44, totalRankXP: 8000 },
	{ title: 'Guardian', startLvl: 45, endLvl: 49, totalRankXP: 8000 },
	{ title: 'Champion', startLvl: 50, endLvl: 69, totalRankXP: 62000 } // Approx 3100 per level
]

// Pre-calculate per-level XP for each rank for easy lookup
rankConfig.forEach(conf =>
{
	const levelCount = conf.endLvl - conf.startLvl + 1
	conf.xpPerLevel = conf.totalRankXP / levelCount
	// For Champion, ensure integer math if needed, but 62000/20 is clean 3100
})

// Legacy mapping for data storage compatibility
export const pointBaselines: Record<string, number> = {
	Agent: 0,
	Knight: 500,
	Captain: 1_700,
	Centurion: 3_700,
	Lord: 6_100,
	Count: 14_100,
	Colonel: 22_100,
	Warrior: 30_100,
	Elite: 38_100,
	Guardian: 46_100,
	Champion: 54_100,
	MAX: 116_100
}

const ranks: string[] = rankConfig.map(c => c.title)

export let heroData: HeroListItem[] = []

// >> Settings <<
const defaultSettings: Record<string, boolean> = {
	autoSort: false, // Always sort by highest proficiency on load/change
	hulkIcon: false, // Show Hulk icon instead of Bruce Banner
	ladyLoki: false // Show Lady Loki over Loki
}
export let settings: Record<string, boolean> = { ...defaultSettings }
let sorted: boolean = settings.autoSort

function loadSettings(): void
{
	const saved = localStorage.getItem('marvelRivalsSettings')
	if (saved)
	{
		try
		{
			settings = { ...defaultSettings, ...JSON.parse(saved) }
		} catch (e)
		{
			settings = { ...defaultSettings }
		}
	}
	sorted = settings.autoSort
}

function saveSettings(): void
{
	localStorage.setItem('marvelRivalsSettings', JSON.stringify(settings))
}

function openSettingsModal(): void
{
	querySelector<HTMLInputElement>('#setting-autoSort').checked = settings.autoSort
	querySelector<HTMLInputElement>('#setting-hulkIcon').checked = settings.hulkIcon
	querySelector<HTMLInputElement>('#setting-ladyLoki').checked = settings.ladyLoki
	querySelector<HTMLDivElement>('#settings-modal').style.display = 'flex'
}

function closeSettingsModal(): void
{
	querySelector<HTMLDivElement>('#settings-modal').style.display = 'none'
}

function updateSetting(key: string, value: boolean): void
{
	settings[key] = value
	saveSettings()

	if (key === 'autoSort')
	{
		sorted = value
		sortHeroes()
		saveData()
	}

	renderList()
}

export function getHeroFileName(name: string): string
{
	return name.replace(/(\s+|_|-)/g, '') + '.webp'
}

function init(): void
{
	loadSettings()
	let v3Data = localStorage.getItem('marvelRivalsDataV3')
	let stdData = localStorage.getItem('marvelRivalsData')

	// >>> Data Migration Conflict <<<
	if (v3Data && stdData)
	{
		openComparisonModal({
			title: 'Save File Conflict Detected!',
			desc:
				"We found an older 'V3' save file alongside a newer save file. Please review your top heroes to decide which data you want to keep.",
			opt1Title: 'Older Save (V3)',
			opt1Data: v3Data,
			opt1BtnText: 'Keep V3 Save',
			opt1Action: () => resolveMigration('v3'),
			opt2Title: 'Newest Save',
			opt2Data: stdData,
			opt2BtnText: 'Keep Newest Save',
			opt2Action: () => resolveMigration('std'),
			footerText:
				'Whichever you choose, the old V3 data will be removed to prevent this loop from happening again.'
		})
		return
	}

	// >>> Seamless Migration or Normal Load <<<
	let savedData = null
	if (v3Data && !stdData)
	{
		savedData = v3Data
		localStorage.setItem('marvelRivalsData', v3Data)
		localStorage.removeItem('marvelRivalsDataV3')
	} else
	{
		savedData = stdData
	}

	processLoadedData(savedData)
	checkChangelog()

	initCallbacks()
}

function processLoadedData(savedData: string | null): void
{
	if (savedData)
	{
		const parsedData: HeroListItem[] = JSON.parse(savedData)
		heroData = heroDefinitions.map((def, idx) =>
		{
			const saved = parsedData.find(p => p.name === def.name)
			return saved
				? {
					...def,
					rank: saved.rank,
					points: saved.points,
					pinned: saved.pinned || false, // pinning
					originalIndex: idx
				}
				: {
					...def,
					rank: 'Agent',
					points: 0,
					pinned: false, // pinning
					originalIndex: idx
				}
		})
	} else
	{
		heroData = heroDefinitions.map((def, idx) => ({
			...def,
			rank: 'Agent',
			points: 0,
			pinned: false, // pinning
			originalIndex: idx
		}))
	}
	sortHeroes()
}

function getTopHeroesHTML(dataStr: string): string
{
	if (!dataStr)
	{
		return String
			.raw`<div style='text-align:center; color:#666; margin-top:20px;'>No progress</div>`
	}
	try
	{
		const parsed: HeroListItem[] = JSON.parse(dataStr)
		// Sort by points to find the highest
		parsed.sort((a, b) => calculateTotalScore(b) - calculateTotalScore(a))

		// Filter out heroes that have 0 points (no progress) and get top 4
		const top4 = parsed
			.filter(h => calculateTotalScore(h) > 0)
			.slice(0, 4)

		if (top4.length === 0)
		{
			return String
				.raw`<div style='text-align:center; color:#666; margin-top:20px;'>No progress</div>`
		}

		let html = ''
		top4.forEach(h =>
		{
			const totalPts = calculateTotalScore(h)
			const levelInfo = getLevelInfoFromTotal(totalPts)
			html += String.raw`
				<div class="top-hero-item">
					<span style="color: #ccc">${h.name}</span>
					<span class="rank-${levelInfo.title}" style="font-weight:bold">${levelInfo.title} (Lv${levelInfo.level})</span>
				</div>`
		})
		return html
	} catch (e)
	{
		return String
			.raw`<div style='text-align:center; color:red; margin-top:20px;'>Data Error</div>`
	}
}

function openComparisonModal(config: ComparisonModalConfig)
{
	const opt1Btn = querySelector<HTMLButtonElement>('#modal-opt1-btn')
	const opt2Btn = querySelector<HTMLButtonElement>('#modal-opt2-btn')

	querySelector<HTMLHeadingElement>('#modal-title').innerText = config.title
	querySelector<HTMLParagraphElement>('#modal-desc').innerText = config.desc

	querySelector<HTMLHeadingElement>('#modal-opt1-title').innerText = config.opt1Title
	querySelector<HTMLDivElement>('#modal-opt1-heroes').innerHTML = getTopHeroesHTML(
		config.opt1Data
	)
	opt1Btn.innerText = config.opt1BtnText
	opt1Btn.onclick = config.opt1Action

	querySelector<HTMLHeadingElement>('#modal-opt2-title').innerText = config.opt2Title
	querySelector<HTMLDivElement>('#modal-opt2-heroes').innerHTML = getTopHeroesHTML(
		config.opt2Data
	)
	opt2Btn.innerText = config.opt2BtnText
	opt2Btn.onclick = config.opt2Action

	querySelector<HTMLParagraphElement>('#modal-footer').innerText = config.footerText

	querySelector<HTMLDivElement>('#migration-modal').style.display = 'flex'
}

function resolveMigration(choice: string): void
{
	let v3Data = localStorage.getItem('marvelRivalsDataV3')
	let stdData = localStorage.getItem('marvelRivalsData')

	if (!v3Data) throw new Error('Migrating from non-existent old data.')

	if (choice === 'v3')
	{
		processLoadedData(v3Data)
		localStorage.setItem('marvelRivalsData', v3Data) // Overwrite newest with V3
	} else
	{
		processLoadedData(stdData) // Keep newest
	}

	// Clean up V3 so we don't ask again
	localStorage.removeItem('marvelRivalsDataV3')
	querySelector<HTMLDivElement>('#migration-modal').style.display = 'none'
}

// convert between Stored Rank/Points and UI Levels
export function calculateTotalScore(hero: HeroListItem): number
{
	const baseline = pointBaselines[hero.rank] || 0
	const points = hero.points || 0
	return baseline + points
}

export function getLevelInfoFromTotal(totalPoints: number): HeroLevelInfo
{
	let cumulativeXP = 0

	for (let conf of rankConfig)
	{
		if (!conf.xpPerLevel) throw new Error("Hero data hasn't been initialized before processing")

		// Calculate max points for this entire Tier
		const tierTotal = conf.totalRankXP
		const tierEndXP = cumulativeXP + tierTotal

		// If total points fall in this tier (or it's the last tier)
		if (totalPoints < tierEndXP || conf.title === 'Champion')
		{
			const pointsInTier = Math.max(0, totalPoints - cumulativeXP)

			// Calculate which level within the tier
			// e.g., Agent (125 per lvl). 200 pts in -> 200/125 = 1.6 -> Level index 1 (Level 2)
			// Use floor, but ensure we don't exceed max levels
			const levelIndex = Math.floor(pointsInTier / conf.xpPerLevel)
			const currentLevel = conf.startLvl + levelIndex

			// Allow level to cap at max defined in config (70)
			const clampedLevel = Math.min(currentLevel, conf.endLvl + 1)

			// Calculate XP remaining in that specific level
			// If we are capped at 70, we might be full
			let xpInCurrentLevel = pointsInTier - (clampedLevel - conf.startLvl) * conf.xpPerLevel
			xpInCurrentLevel = Math.max(0, Math.round(xpInCurrentLevel))

			return {
				level: clampedLevel,
				xp: xpInCurrentLevel,
				maxXp: conf.xpPerLevel,
				title: conf.title
			}
		}

		cumulativeXP += tierTotal
	}

	// Fallback max
	return { level: 70, xp: 3100, maxXp: 3100, title: 'Champion' }
}

function getDataFromLevel(targetLevel: number, targetXP: number): { rank: string; points: number }
{
	console.log('Calculating data from Level:', targetLevel, 'XP:', targetXP)
	let cumulativeXP = 0

	for (let conf of rankConfig)
	{
		if (!conf.xpPerLevel)
			throw new Error("Some or all hero data hasn't been initialized before processing")

		if (targetLevel >= conf.startLvl && targetLevel <= conf.endLvl)
		{
			// Found the tier
			const levelsCompletedInTier = targetLevel - conf.startLvl
			const pointsFromCompletedLevels = levelsCompletedInTier * conf.xpPerLevel

			// Calculate points relative to the Rank Baseline (Agent start, Knight start, etc)

			// Ensure XP doesn't exceed the level cap
			const finalXP = Math.min(targetXP, conf.xpPerLevel)

			const pointsInTier = pointsFromCompletedLevels + finalXP

			console.log(
				`> Rank: ${conf.title}, Points: ${pointsInTier} (Levels Completed: ${levelsCompletedInTier}, XP in Current Level: ${finalXP})`
			)

			return {
				rank: conf.title,
				points: Math.round(pointsInTier)
			}
		} else if (targetLevel == conf.endLvl + 1 && conf.title === 'Champion')
		{
			// If char has max level, xp input is uncapped
			return {
				rank: conf.title,
				points: Math.round(
					(conf.endLvl - conf.startLvl + 1) * conf.xpPerLevel
						+ targetXP
				)
			}
		}
		cumulativeXP += conf.totalRankXP // Not used for return, but for loop logic if needed
	}
	return { rank: 'Champion', points: 62000 }
}

function toggleFilters(): void
{
	const content = querySelector<HTMLDivElement>('#filter-content')
	const arrow = querySelector<HTMLSpanElement>('#filter-arrow')
	content.classList.toggle('expanded')
	arrow.style.transform = content.classList.contains('expanded')
		? 'rotate(90deg)'
		: 'rotate(0deg)'
}

function handleImageFallback(img: HTMLImageElement, heroName: string, fileName: string)
{
	fileName = fileName || getHeroFileName(heroName)
	const baseSrc = `img/char/${fileName}`
	const lordSrc = `img/char/lord/${fileName}`

	if (img.src.includes('/champion/')) img.src = lordSrc
	else if (img.src.includes('/lord/')) img.src = baseSrc
	else
	{
		img.onerror = null // Kills the infinite loop if the base image is also gone
		alert('The base image for ' + heroName + ' is missing.')
	}
}

function renderList(): boolean | void
{
	const container = querySelector<HTMLDivElement>('#hero-list')

	// Get Filter Values
	const searchText = querySelector<HTMLInputElement>('#searchInput').value.toLowerCase()
	const checkedRoles = Array.from(
		querySelectorAll<HTMLInputElement>('.role-filters input:checked')
	).map(cb => cb.value)

	// Filter Data
	const visibleHeroes = heroData.filter(hero =>
	{
		const matchesName = hero.name.toLowerCase().includes(searchText)
		const matchesTag = Array.isArray(hero.tags)
			&& hero.tags.some(tag => tag.toLowerCase().includes(searchText))

		const matchesRole = checkedRoles.length === 0
			|| (Array.isArray(hero.role)
				? hero.role.some(r => checkedRoles.includes(r))
				: checkedRoles.includes(hero.role))
		return (matchesName || matchesTag) && matchesRole
	})

	container.innerHTML = String.raw`
		<div class="hero-row header-row">
			<div></div>
			<div>Hero & Level</div>
			<div>Rank</div>
			<div>Points</div>
		</div> 
	`

	if (visibleHeroes.length === 0)
	{
		container.innerHTML += String
			.raw`<div style="text-align:center; padding:20px; color:#666;">No heroes found matching your filters.</div>`
		return
	}

	visibleHeroes.forEach(hero =>
	{
		const row = document.createElement('div')
		row.className = 'hero-row'

		// Calculate Level Info
		const totalScore = calculateTotalScore(hero)
		const levelInfo = getLevelInfoFromTotal(totalScore)

		let subFolder
		let isChamp = false
		if (levelInfo.level >= 50)
		{
			subFolder = 'champion/'
			isChamp = true
		} else if (levelInfo.level >= 20) subFolder = 'lord/'
		else subFolder = ''
		// Allow the "Hulk Icon instead of Banner" setting to swap in an alternate portrait
		let heroName = hero.name
		if (settings.hulkIcon && hero.name === 'Bruce Banner') heroName = 'Hulk'
		if (settings.ladyLoki && hero.name === 'Loki') heroName = 'Lady Loki'
		let heroFileName = getHeroFileName(heroName)
		const heroImgPath = `img/char/${subFolder}${heroFileName}`
		const rankBadgePath = `img/icons/${levelInfo.title}_Badge.webp`

		// Progress Bars
		// Bar 1: Progress to Next Title
		const currentConfig = rankConfig.find(
			c => c.title === levelInfo.title
		)

		if (!currentConfig || !currentConfig.xpPerLevel)
			throw new Error('Config is unexpectedly null or contains null value')

		const pointsInTier = (levelInfo.level - currentConfig.startLvl)
				* currentConfig.xpPerLevel
			+ levelInfo.xp
		const titlePct = Math.min(
			100,
			(pointsInTier / currentConfig.totalRankXP) * 100
		)

		// Bar 2: Total Progress (Max)
		const totalPct = Math.min(100, (totalScore / pointBaselines.MAX) * 100)

		const displayRole = Array.isArray(hero.role)
			? hero.role.join(' / ')
			: hero.role

		// Safely grab the offsets, defaulting to your standard 0 and -9
		const offX = hero.offsetX !== undefined ? hero.offsetX : 0
		const offY = hero.offsetY !== undefined ? hero.offsetY : -9
		const offScale = hero.scale !== undefined ? hero.scale : 1.4

		// Calculate the CSS Transform value (no "transform:" prefix, no semicolon)
		const transformValue = levelInfo.level >= 50
			? `scale(${offScale}) translate(${offX}px, ${offY}px)`
			: `translate(${offX}px, ${offY}px)`

		row.replaceChildren(
			h(
				'div',
				{ class: 'portrait-container' },
				h(
					'div',
					{
						class: 'char-img-wrapper',
						style: levelInfo.level >= 50
							? { boxShadow: `0 0 22px ${hero.color}` }
							: undefined
					},
					h('img', {
						src: heroImgPath,
						class: `hero-portrait rank-${levelInfo.title}`,
						style: {
							background: `linear-gradient(180deg,rgba(0, 0, 0, 0) 10%, ${
								hero.color || '#000'
							} 100%)`,
							...(isChamp ? { transform: transformValue } : {})
						},
						alt: heroName,
						onerror: (e: Event) =>
							handleImageFallback(
								e.target as HTMLImageElement,
								heroName,
								heroFileName
							)
					})
				),
				h(
					'div',
					{ class: 'role-icon-container' },
					h('img', {
						src: 'img/Vanguard_Icon.webp',
						class: 'role-icon-mini',
						title: 'Vanguard',
						style: { display: displayRole.includes('Vanguard') ? 'block' : 'none' }
					}),
					h('img', {
						src: 'img/Duelist_Icon.webp',
						class: 'role-icon-mini',
						title: 'Duelist',
						style: { display: displayRole.includes('Duelist') ? 'block' : 'none' }
					}),
					h('img', {
						src: 'img/Strategist_Icon.webp',
						class: 'role-icon-mini',
						title: 'Strategist',
						style: { display: displayRole.includes('Strategist') ? 'block' : 'none' }
					})
				)
			),
			h(
				'div',
				{ class: 'hero-details' },
				h(
					'span',
					{ class: `hero-name rank-${levelInfo.title}` },
					`${heroName} `,
					h('span', {
						style: {
							fontSize: '0.7em',
							marginLeft: '10px',
							color: '#666',
							fontWeight: 'normal'
						}
					}, `(${levelInfo.title})`),
					h('span', {
						class: `pin-btn ${hero.pinned ? 'pinned' : ''} hover-btn`,
						title: `Pin ${heroName}`,
						onclick: () => togglePin(hero.name)
					}, hero.pinned ? '★' : '☆')
				),
				h(
					'div',
					{ class: 'progress-section' },
					h(
						'div',
						{ class: 'progress-label' },
						h('span', {}, `To ${ranks[ranks.indexOf(levelInfo.title) + 1] || 'MAX'}`),
						h('span', {}, `${titlePct.toFixed(1)}%`)
					),
					h(
						'div',
						{ class: 'progress-bg' },
						h('div', {
							class: `progress-fill fill-next-${levelInfo.title}`,
							style: { width: `${titlePct}%` }
						})
					),
					h(
						'div',
						{ class: 'progress-label', style: { marginTop: '2px' } },
						h('span', {}, 'Total Progress'),
						h('span', {}, `${totalPct.toFixed(1)}%`)
					),
					h(
						'div',
						{ class: 'progress-bg' },
						h('div', {
							class: 'progress-fill fill-total',
							style: { width: `${totalPct}%` }
						})
					)
				)
			),
			// Rank Badge & Level Input
			h(
				'div',
				{ class: 'rank-select-container' },
				h('img', {
					src: rankBadgePath,
					class: 'rank-badge-img',
					title: levelInfo.title,
					onerror: (e: Event) =>
					{
						;(e.target as HTMLElement).style.display = 'none'
					}
				}),
				h(
					'div',
					{
						style: {
							display: 'flex',
							flexDirection: 'column',
							width: '60px',
							position: 'relative'
						}
					},
					h('span', {
						style: {
							position: 'absolute',
							top: '-17px',
							color: '#999',
							fontSize: '0.7em'
						}
					}, 'Level'),
					h('input', {
						type: 'number',
						class: 'level-input',
						min: '1',
						max: '70',
						value: String(levelInfo.level),
						onchange: (e: Event) =>
							updateHero(
								hero.name,
								'level',
								parseInt((e.target as HTMLInputElement).value)
							)
					})
				)
			),
			h(
				'div',
				{ class: 'point-container' },
				h('input', {
					type: 'number',
					class: 'no-scroll-track',
					value: String(levelInfo.xp),
					min: '0',
					...(levelInfo.level > currentConfig.endLvl
						? {}
						: { max: String(levelInfo.maxXp) }),
					placeholder: '0',
					onchange: (e: Event) =>
						updateHero(
							hero.name,
							'points',
							parseInt((e.target as HTMLInputElement).value)
						)
				}),
				h(
					'span',
					{ class: 'point-suffix' },
					levelInfo.level > currentConfig.endLvl ? '∞' : String(levelInfo.maxXp)
				)
			)
		)

		container.appendChild(row)
	})
}

function updateHero(name: string, field: string, value: number): void
{
	console.log(`Updating ${name} - Field: ${field}, Value: ${value}`)
	const index = heroData.findIndex(h => h.name === name)
	if (index === -1) return

	// Get current state
	let total = calculateTotalScore(heroData[index])
	let currentInfo = getLevelInfoFromTotal(total)

	let newLevel = currentInfo.level
	let newXP = currentInfo.xp

	if (field === 'level')
	{
		newLevel = value
		newXP = 0 // Reset XP when level changes to avoid a rare bug where it will level you back up if your points are max
	} else if (field === 'points')
	{
		newXP = value
	}

	// Convert back to Rank/Points storage format
	const newData = getDataFromLevel(newLevel, newXP)

	// Update Data
	heroData[index].rank = newData.rank
	heroData[index].points = newData.points

	sortHeroes()
	saveData()
}

function sortHeroes(toggle = false): void
{
	if (toggle) sorted = !sorted

	heroData.sort((a, b) =>
	{
		// check if pinned
		if (a.pinned && !b.pinned) return -1
		if (!a.pinned && b.pinned) return 1

		// fallback to current toggle sort
		if (sorted) return calculateTotalScore(b) - calculateTotalScore(a)
		else return a.name.localeCompare(b.name)
	})

	const btnSort = querySelector<HTMLButtonElement>('#btn-sort')
	if (sorted) btnSort.textContent = 'Sort Alphabetically'
	else btnSort.textContent = 'Sort by Proficiency'
	renderList()
}

function togglePin(name: string): void
{
	const index = heroData.findIndex(h => h.name === name)
	if (index === -1) return

	heroData[index].pinned = !heroData[index].pinned
	saveData()
	sortHeroes()
}

function saveData(): void
{
	// We map only the dynamic data for saving to keep localStorage clean
	const dataToSave = heroData.map(h => ({
		name: h.name,
		rank: h.rank,
		points: h.points,
		pinned: h.pinned || false // pinning
	}))
	localStorage.setItem('marvelRivalsData', JSON.stringify(dataToSave))
}

function clearData(): void
{
	if (confirm('Are you sure you want to clear all your inputs?'))
	{
		localStorage.removeItem('marvelRivalsData')
		localStorage.removeItem('marvelRivalsDataV3') // Also clear legacy just in case
		location.reload()
	}
}

function downloadBackup(): void
{
	// Backup needs to save basic stats, definitions (colors/roles) are hardcoded
	const dataToSave = heroData.map(h => ({
		name: h.name,
		rank: h.rank,
		points: h.points,
		pinned: h.pinned // pinning
	}))
	const dataStr = JSON.stringify(dataToSave, null, 2)
	const blob = new Blob([dataStr], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = url
	a.download = 'rivals_data_backup_' + new Date().toISOString().slice(0, 10) + '.json'
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
	URL.revokeObjectURL(url)
}

function handleFileUpload(input: HTMLInputElement): void
{
	if (!input.files || !input.files[0]) return

	const file = input.files[0]
	const reader = new FileReader()
	reader.onload = function(e)
	{
		try
		{
			const contents = e.target!.result!.toString()
			const parsedData = JSON.parse(contents)
			if (
				Array.isArray(parsedData)
				&& parsedData.length > 0
				&& parsedData[0].hasOwnProperty('name')
			)
			{
				// Grab current data directly from our active array to compare
				const currentDataStr = JSON.stringify(
					heroData.map(h => ({
						name: h.name,
						rank: h.rank,
						points: h.points,
						pinned: h.pinned // pinning
					}))
				)

				openComparisonModal({
					title: 'Confirm Backup Import',
					desc:
						'You are about to overwrite your current progress with a backup file. Please compare below to make sure this is what you want to do.',
					opt1Title: 'Current Progress',
					opt1Data: currentDataStr,
					opt1BtnText: 'Keep Current (Cancel)',
					opt1Action: () =>
					{
						querySelector<HTMLDivElement>(
							'#migration-modal'
						).style.display = 'none'
						input.value = '' // Reset input so they can upload the same file again if needed
					},
					opt2Title: 'Backup File',
					opt2Data: contents,
					opt2BtnText: 'Import Backup',
					opt2Action: () =>
					{
						localStorage.setItem(
							'marvelRivalsData',
							JSON.stringify(parsedData)
						)
						location.reload()
					},
					footerText: 'Importing the backup cannot be undone.'
				})
			} else
			{
				alert('Invalid backup file format.')
				input.value = ''
			}
		} catch (err)
		{
			alert('Error reading file: ' + err)
			input.value = ''
		}
	}
	reader.readAsText(file)
}

// Close modals when clicking on the overlay background
window.addEventListener('click', function(event: PointerEvent): void
{
	const { target } = event
	if (target instanceof HTMLElement && target.classList.contains('modal-overlay'))
		target.style.display = 'none'
})

function initCallbacks(): void
{
	querySelector<HTMLButtonElement>('#version-display').onclick = showFullChangelog
	querySelector<HTMLButtonElement>('#close-changelog-btn').onclick = closeChangelogModal
	querySelector<HTMLButtonElement>('#btn-sort').onclick = () => sortHeroes(true)
	querySelector<HTMLButtonElement>('#btn-share').onclick = openShareModal
	querySelector<HTMLButtonElement>('#btn-settings').onclick = openSettingsModal
	querySelector<HTMLButtonElement>('#btn-filter-toggle').onclick = toggleFilters

	querySelector<HTMLInputElement>('#searchInput').oninput = renderList
	querySelector<HTMLInputElement>('input[value="Vanguard"]').onchange = renderList
	querySelector<HTMLInputElement>('input[value="Duelist"]').onchange = renderList
	querySelector<HTMLInputElement>('input[value="Strategist"]').onchange = renderList

	const fileInput = querySelector<HTMLInputElement>('#fileInput')
	querySelector<HTMLButtonElement>('#download-backup').onclick = downloadBackup
	querySelector<HTMLButtonElement>('#upload-backup').onclick = () => fileInput.click()
	fileInput.onchange = () => handleFileUpload(fileInput)

	querySelector<HTMLButtonElement>('#share-download-btn').onclick = downloadShareImage
	querySelector<HTMLButtonElement>('#close-share-btn').onclick = closeShareModal

	const settingAutoSort = querySelector<HTMLInputElement>('#setting-autoSort')
	const settingHulkIcon = querySelector<HTMLInputElement>('#setting-hulkIcon')
	const settingLadyLoki = querySelector<HTMLInputElement>('#setting-ladyLoki')
	settingAutoSort.onchange = () => updateSetting('autoSort', settingAutoSort.checked)
	settingHulkIcon.onchange = () => updateSetting('hulkIcon', settingHulkIcon.checked)
	settingLadyLoki.onchange = () => updateSetting('ladyLoki', settingLadyLoki.checked)

	querySelector<HTMLButtonElement>('#reset-all-data-btn').onclick = clearData
	querySelector<HTMLButtonElement>('#settings-done-btn').onclick = closeSettingsModal
}

init()
