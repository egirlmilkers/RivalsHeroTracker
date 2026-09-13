import { Marked } from 'marked'

export {}

declare global
{
	type RoleType = 'Vanguard' | 'Duelist' | 'Strategist'

	interface Hero
	{
		name: string
		role: RoleType | RoleType[]
		color: string
		tags: string[]
		offsetX?: number
		offsetY?: number
		scale?: number
		imageName?: string
	}

	interface HeroListItem extends Hero
	{
		rank: string
		points: number
		pinned: boolean
		originalIndex: number
	}

	interface Rank
	{
		readonly title: string
		readonly startLvl: number
		readonly endLvl: number
		readonly totalRankXP: number
		xpPerLevel?: number
	}

	interface HeroLevelInfo
	{
		readonly level: number
		readonly xp: number
		readonly maxXp: number
		readonly title: string
	}

	interface ComparisonModalConfig
	{
		title: string
		desc: string
		opt1Title: string
		opt1Data: string
		opt1BtnText: string
		opt1Action: () => void
		opt2Title: string
		opt2Data: string
		opt2BtnText: string
		opt2Action: () => void
		footerText: string
	}

	interface HeroShareItemMeta {
		heroName: string
		fileName: string
		candidates: string[]
	}

	interface HeroShareItem {
		hero: HeroListItem
		score: number
		levelInfo: HeroLevelInfo
		heroName: string
		img: HTMLImageElement | null
		badgeImg: HTMLImageElement | null
	}

	interface ChangelogEntry {
		date: string
		version: string
		rawContent: string[]
	}
}
