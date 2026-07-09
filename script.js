// prettier-ignore
const heroDefinitions = [
	{
		name: 'Adam Warlock',
		role: 'Strategist',
		color: '#c28b43',
		tags: ['gold', 'guardian', 'gotg'],
	},
	{
		name: 'Angela',
		role: 'Vanguard',
		color: '#e68820',
		tags: ['gold'],
	},
	{
		name: 'Black Cat',
		role: 'Duelist',
		color: '#6252da',
		tags: ['purple', 'felicia', 'hardy'],
	},
	{
		name: 'Black Panther',
		role: 'Duelist',
		color: '#644579',
		tags: ['purple', "t'challa", 'challa'],
	},
	{
		name: 'Black Widow',
		role: 'Duelist',
		color: '#555b6a',
		tags: ['natasha', 'romanova', 'black'],
	},
	{
		name: 'Blade',
		role: 'Duelist',
		color: '#b23e43',
		tags: ['red', 'eric', 'brooks'],
	},
	{
		name: 'Bruce Banner',
		role: 'Vanguard',
		color: '#387458',
		tags: ['green', 'hulk', 'bruce', 'banner'],
	},
	{
		name: 'Captain America',
		role: 'Vanguard',
		color: '#3872b1',
		tags: ['blue', 'steven', 'steve', 'rogers'],
	},
	{
		name: 'Cloak and Dagger',
		role: 'Strategist',
		color: '#889bfd',
		tags: ['blue', 'tyrone', 'johnson', 'tandy', 'bowen'],
	},
	{
		name: 'Cyclops',
		role: 'Duelist',
		color: '#37bdda',
		tags: ['mutant', 'scott', 'summers', 'blue'],
	},
	{
		name: 'Daredevil',
		role: 'Duelist',
		color: '#d02959',
		tags: ['matt', 'murdock', 'red'],
	},
	{
		name: 'Deadpool',
		role: ['Vanguard', 'Duelist', 'Strategist'],
		color: '#f24547',
		tags: ['red', 'flex', 'wade', 'wilson'],
	},
	{
		name: 'Devil Dinosaur',
		role: 'Vanguard',
		color: '#b22d39',
		tags: ['red', 'dino', 'moon', 'girl'],
	},
	{
		name: 'Doctor Strange',
		role: 'Vanguard',
		color: '#db635c',
		tags: ['stephen', 'strange', 'orange'],
	},
	{
		name: 'Elsa Bloodstone',
		role: 'Duelist',
		color: '#e96346',
		tags: ['orange'],
	},
	{
		name: 'Emma Frost',
		role: 'Vanguard',
		color: '#35ade4',
		tags: ['blue', 'mutant'],
	},
	{
		name: 'Gambit',
		role: 'Strategist',
		color: '#d763a0',
		tags: ['gambit', 'pink', 'remy', 'lebeau'],
	},
	{
		name: 'Groot',
		role: 'Vanguard',
		color: '#83a862',
		tags: ['green', 'guardian', 'gotg'],
	},
	{
		name: 'Hawkeye',
		role: 'Duelist',
		color: '#8969a6',
		tags: ['purple', 'clint', 'barton'],
	},
	{
		name: 'Hela',
		role: 'Duelist',
		color: '#388c8c',
		tags: ['green'],
	},
	{
		name: 'Human Torch',
		role: 'Duelist',
		color: '#d8764a',
		tags: ['orange', 'johnny', 'storm', '4', 'fantastic'],
	},
	{
		name: 'Invisible Woman',
		role: 'Strategist',
		color: '#3ac4f7',
		tags: ['blue', 'sue', 'susan', 'storm', '4', 'fantastic'],
	},
	{
		name: 'Iron Fist',
		role: 'Duelist',
		color: '#088078',
		tags: ['green', 'lin', 'lie'],
	},
	{
		name: 'Iron Man',
		role: 'Duelist',
		color: '#dd5067',
		tags: ['anthony', 'stark', 'tony', 'red'],
	},
	{
		name: 'Jeff The Land Shark',
		role: 'Strategist',
		color: '#5f79a5',
		tags: ['blue', 'gray', 'grey'],
	},
	{
		name: 'Jubilee',
		role: 'Strategist',
		color: '#cbb341',
		tags: ['yellow', 'jubilation', 'lee'],
	},
	{
		name: 'Loki',
		role: 'Strategist',
		color: '#4c865c',
		tags: ['green', 'lady', 'laufeyson'],
	},
	{
		name: 'Luna Snow',
		role: 'Strategist',
		color: '#1165bf',
		tags: ['blue', 'seol', 'hee'],
	},
	{
		name: 'Magik',
		role: 'Duelist',
		color: '#8f615f',
		tags: ['mutant', 'illyana', 'rasputin', 'brown'],
	},
	{
		name: 'Magneto',
		role: 'Vanguard',
		color: '#425f67',
		tags: ['mutant', 'grey', 'gray', 'max', 'eisenhardt'],
	},
	{
		name: 'Mantis',
		role: 'Strategist',
		color: '#6c8c66',
		tags: ['green', 'guardian', 'gotg'],
	},
	{
		name: 'Mister Fantastic',
		role: 'Duelist',
		color: '#2ccbe7',
		tags: ['blue', 'reed', 'richards', 'fantastic', '4'],
	},
	{
		name: 'Moon Knight',
		role: 'Duelist',
		color: '#6b8290',
		tags: ['grey', 'gray', 'marc', 'spector', 'steven', 'grant', 'jake', 'lockley'],
	},
	{
		name: 'Namor',
		role: 'Duelist',
		color: '#22938a',
		tags: ['mutant', 'green', 'mckenzie'],
	},
	{
		name: 'Peni Parker',
		role: 'Vanguard',
		color: '#db5151',
		tags: ['red'],
	},
	{
		name: 'Phoenix',
		role: 'Duelist',
		color: '#db5d51',
		tags: ['mutant', 'jean', 'grey', 'orange'],
	},
	{
		name: 'Psylocke',
		role: 'Duelist',
		color: '#a85bbb',
		tags: ['mutant', 'purple', 'sai'],
	},
	{
		name: 'Rocket Raccoon',
		role: 'Strategist',
		color: '#d47253',
		tags: ['orange', 'guardian', 'gotg'],
	},
	{
		name: 'Rogue',
		role: 'Vanguard',
		color: '#d1b231',
		tags: ['mutant', 'yellow', 'anna', 'marie'],
	},
	{
		name: 'Scarlet Witch',
		role: 'Duelist',
		color: '#d24466',
		tags: ['red', 'wanda', 'maximoff'],
	},
	{
		name: 'Spider-Man',
		role: 'Duelist',
		color: '#d44f5a',
		tags: ['red', 'peter', 'parker'],
	},
	{
		name: 'Squirrel Girl',
		role: 'Duelist',
		color: '#d38850',
		tags: ['orange', 'doreen', 'green'],
	},
	{
		name: 'Star-Lord',
		role: 'Duelist',
		color: '#467ed7',
		tags: ['blue', 'guardian', 'gotg', 'peter', 'quill'],
	},
	{
		name: 'Storm',
		role: 'Duelist',
		color: '#454f76',
		tags: ['mutant', 'ororo', 'munroe', 'gray', 'grey'],
	},
	{
		name: 'The Punisher',
		role: 'Duelist',
		color: '#495366',
		tags: ['frank', 'castle', 'gray', 'grey'],
	},
	{
		name: 'The Thing',
		role: 'Vanguard',
		color: '#e1a75e',
		tags: ['orange', 'fantastic', 'four', 'ben', 'grimm'],
	},
	{
		name: 'Thor',
		role: 'Vanguard',
		color: '#5964ab',
		tags: ['blue', 'odinson'],
	},
	{
		name: 'Ultron',
		role: 'Strategist',
		color: '#6b779f',
		tags: ['gray', 'grey'],
	},
	{
		name: 'Venom',
		role: 'Vanguard',
		color: '#2a2e3d',
		tags: ['black', 'edward', 'eddie', 'brock'],
	},
	{
		name: 'White Fox',
		role: 'Strategist',
		color: '#62d4de',
		tags: ['ami', 'han', 'blue', 'turquoise'],
	},
	{
		name: 'Winter Soldier',
		role: 'Duelist',
		color: '#6d7f41',
		tags: ['green', 'james', 'buchanan', 'bucky', 'barnes'],
	},
	{
		name: 'Wolverine',
		role: 'Duelist',
		color: '#be962a',
		tags: ['mutant', 'yellow', 'logan'],
	},
];

// Configuration for Levels and XP
const levelConfig = [
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
	{ title: 'Champion', startLvl: 50, endLvl: 69, totalRankXP: 62000 }, // Approx 3100 per level
];

// Pre-calculate per-level XP for each rank for easy lookup
levelConfig.forEach((conf) => {
	const levelCount = conf.endLvl - conf.startLvl + 1;
	conf.xpPerLevel = conf.totalRankXP / levelCount;
	// For Champion, ensure integer math if needed, but 62000/20 is clean 3100
});

// Legacy mapping for data storage compatibility
const pointBaselines = {
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
	MAX: 116_100,
};

const ranks = levelConfig.map((c) => c.title);

let heroData = [];

// >> Settings <<
const defaultSettings = {
	autoSort: false, // Always sort by highest proficiency on load/change
	hulkIcon: false, // Show Hulk icon instead of Bruce Banner
	ladyLoki: false, // Show Lady Loki over Loki
};
let settings = { ...defaultSettings };
let sorted = settings.autoSort;

function loadSettings() {
	const saved = localStorage.getItem('marvelRivalsSettings');
	if (saved) {
		try {
			settings = { ...defaultSettings, ...JSON.parse(saved) };
		} catch (e) {
			settings = { ...defaultSettings };
		}
	}
	sorted = settings.autoSort;
}

function saveSettings() {
	localStorage.setItem('marvelRivalsSettings', JSON.stringify(settings));
}

function openSettingsModal() {
	document.getElementById('setting-autoSort').checked = settings.autoSort;
	document.getElementById('setting-hulkIcon').checked = settings.hulkIcon;
	document.getElementById('setting-ladyLoki').checked = settings.ladyLoki;
	document.getElementById('settings-modal').style.display = 'flex';
}

function closeSettingsModal() {
	document.getElementById('settings-modal').style.display = 'none';
}

function updateSetting(key, value) {
	settings[key] = value;
	saveSettings();

	if (key === 'autoSort') {
		sorted = value;
		sortHeroes();
		saveData();
	}

	renderList();
}

function getHeroFileName(name) {
	return name.replace(/(\s+|_|-)/g, '') + '.webp';
}

function init() {
	loadSettings();
	let v3Data = localStorage.getItem('marvelRivalsDataV3');
	let stdData = localStorage.getItem('marvelRivalsData');

	// >>> Data Migration Conflict <<<
	if (v3Data && stdData) {
		openComparisonModal({
			title: 'Save File Conflict Detected!',
			desc: "We found an older 'V3' save file alongside a newer save file. Please check your top heroes to decide which data you want to keep.",
			opt1Title: 'Older Save (V3)',
			opt1Data: v3Data,
			opt1BtnText: 'Keep V3 Save',
			opt1Action: () => resolveMigration('v3'),
			opt2Title: 'Newest Save',
			opt2Data: stdData,
			opt2BtnText: 'Keep Newest Save',
			opt2Action: () => resolveMigration('std'),
			footerText:
				'Whichever you choose, the old V3 data will be removed to prevent this loop from happening again.',
		});
		return;
	}

	// >>> Seamless Migration or Normal Load <<<
	let savedData = null;
	if (v3Data && !stdData) {
		savedData = v3Data;
		localStorage.setItem('marvelRivalsData', v3Data);
		localStorage.removeItem('marvelRivalsDataV3');
	} else {
		savedData = stdData;
	}

	processLoadedData(savedData);
}

function processLoadedData(savedData) {
	if (savedData) {
		const parsedData = JSON.parse(savedData);
		heroData = heroDefinitions.map((def, idx) => {
			const saved = parsedData.find((p) => p.name === def.name);
			return saved
				? {
						...def,
						rank: saved.rank,
						points: saved.points,
						originalIndex: idx,
					}
				: { ...def, rank: 'Agent', points: 0, originalIndex: idx };
		});
	} else {
		heroData = heroDefinitions.map((def, idx) => ({
			...def,
			rank: 'Agent',
			points: 0,
			originalIndex: idx,
		}));
	}
	sortHeroes();
}

function getTopHeroesHTML(dataStr) {
	if (!dataStr)
		return "<div style='text-align:center; color:#666; margin-top:20px;'>No progress</div>";
	try {
		const parsed = JSON.parse(dataStr);
		// Sort by points to find the highest
		parsed.sort((a, b) => calculateTotalScore(b) - calculateTotalScore(a));

		// Filter out heroes that have 0 points (no progress) and get top 4
		const top4 = parsed
			.filter((h) => calculateTotalScore(h) > 0)
			.slice(0, 4);

		if (top4.length === 0)
			return "<div style='text-align:center; color:#666; margin-top:20px;'>No progress</div>";

		let html = '';
		top4.forEach((h) => {
			const totalPts = calculateTotalScore(h);
			const levelInfo = getLevelInfoFromTotal(totalPts);
			html += `
				<div class="top-hero-item">
					<span style="color: #ccc">${h.name}</span>
					<span class="rank-${levelInfo.title}" style="font-weight:bold">${levelInfo.title} (Lv${levelInfo.level})</span>
				</div>`;
		});
		return html;
	} catch (e) {
		return "<div style='text-align:center; color:red; margin-top:20px;'>Data Error</div>";
	}
}

function openComparisonModal(config) {
	document.getElementById('modal-title').innerText = config.title;
	document.getElementById('modal-desc').innerText = config.desc;

	document.getElementById('modal-opt1-title').innerText = config.opt1Title;
	document.getElementById('modal-opt1-heroes').innerHTML = getTopHeroesHTML(
		config.opt1Data,
	);
	document.getElementById('modal-opt1-btn').innerText = config.opt1BtnText;
	document.getElementById('modal-opt1-btn').onclick = config.opt1Action;

	document.getElementById('modal-opt2-title').innerText = config.opt2Title;
	document.getElementById('modal-opt2-heroes').innerHTML = getTopHeroesHTML(
		config.opt2Data,
	);
	document.getElementById('modal-opt2-btn').innerText = config.opt2BtnText;
	document.getElementById('modal-opt2-btn').onclick = config.opt2Action;

	document.getElementById('modal-footer').innerText = config.footerText;

	document.getElementById('migration-modal').style.display = 'flex';
}

function resolveMigration(choice) {
	let v3Data = localStorage.getItem('marvelRivalsDataV3');
	let stdData = localStorage.getItem('marvelRivalsData');

	if (choice === 'v3') {
		processLoadedData(v3Data);
		localStorage.setItem('marvelRivalsData', v3Data); // Overwrite newest with V3
	} else {
		processLoadedData(stdData); // Keep newest
	}

	// Clean up V3 so we don't ask again
	localStorage.removeItem('marvelRivalsDataV3');
	document.getElementById('migration-modal').style.display = 'none';
}

// convert between Stored Rank/Points and UI Levels
function calculateTotalScore(hero) {
	const baseline = pointBaselines[hero.rank] || 0;
	const points = parseInt(hero.points) || 0;
	return baseline + points;
}

function getLevelInfoFromTotal(totalPoints) {
	let cumulativeXP = 0;

	for (let conf of levelConfig) {
		// Calculate max points for this entire Tier
		const tierTotal = conf.totalRankXP;
		const tierEndXP = cumulativeXP + tierTotal;

		// If total points fall in this tier (or it's the last tier)
		if (totalPoints < tierEndXP || conf.title === 'Champion') {
			const pointsInTier = Math.max(0, totalPoints - cumulativeXP);

			// Calculate which level within the tier
			// e.g., Agent (125 per lvl). 200 pts in -> 200/125 = 1.6 -> Level index 1 (Level 2)
			// Use floor, but ensure we don't exceed max levels
			const levelIndex = Math.floor(pointsInTier / conf.xpPerLevel);
			const currentLevel = conf.startLvl + levelIndex;

			// Allow level to cap at max defined in config (70)
			const clampedLevel = Math.min(currentLevel, conf.endLvl + 1);

			// Calculate XP remaining in that specific level
			// If we are capped at 70, we might be full
			let xpInCurrentLevel =
				pointsInTier - (clampedLevel - conf.startLvl) * conf.xpPerLevel;
			xpInCurrentLevel = Math.max(0, Math.round(xpInCurrentLevel));

			return {
				level: clampedLevel,
				xp: xpInCurrentLevel,
				maxXp: conf.xpPerLevel,
				title: conf.title,
			};
		}

		cumulativeXP += tierTotal;
	}

	// Fallback max
	return { level: 70, xp: 3100, maxXp: 3100, title: 'Champion' };
}

function getDataFromLevel(targetLevel, targetXP) {
	console.log('Calculating data from Level:', targetLevel, 'XP:', targetXP);
	let cumulativeXP = 0;

	for (let conf of levelConfig) {
		if (targetLevel >= conf.startLvl && targetLevel <= conf.endLvl) {
			// Found the tier
			const levelsCompletedInTier = targetLevel - conf.startLvl;
			const pointsFromCompletedLevels =
				levelsCompletedInTier * conf.xpPerLevel;

			// Calculate points relative to the Rank Baseline (Agent start, Knight start, etc)

			// Ensure XP doesn't exceed the level cap
			const finalXP = Math.min(targetXP, conf.xpPerLevel);

			const pointsInTier = pointsFromCompletedLevels + finalXP;

			console.log(
				`> Rank: ${conf.title}, Points: ${pointsInTier} (Levels Completed: ${levelsCompletedInTier}, XP in Current Level: ${finalXP})`,
			);

			return {
				rank: conf.title,
				points: Math.round(pointsInTier),
			};
		} else if (targetLevel == conf.endLvl + 1) {
			// If char has max level, xp input is uncapped
			return {
				rank: conf.title,
				points: Math.round(
					(conf.endLvl - conf.startLvl + 1) * conf.xpPerLevel +
						targetXP,
				),
			};
		}
		cumulativeXP += conf.totalRankXP; // Not used for return, but for loop logic if needed
	}
	return { rank: 'Champion', points: 62000 };
}

function toggleFilters() {
	const content = document.getElementById('filter-content');
	const arrow = document.getElementById('filter-arrow');
	content.classList.toggle('expanded');
	arrow.style.transform = content.classList.contains('expanded')
		? 'rotate(90deg)'
		: 'rotate(0deg)';
}

function handleImageFallback(img, heroName, fileName) {
	fileName = fileName || getHeroFileName(heroName);
	const baseSrc = `img/char/${fileName}`;
	const lordSrc = `img/char/lord/${fileName}`;

	if (img.src.includes('/dyna/')) {
		img.src = lordSrc;
	} else if (img.src.includes('/lord/')) {
		img.src = baseSrc;
	} else {
		img.onerror = null; // Kills the infinite loop if the base image is also gone
		alert('The base image for ' + heroName + ' is missing.');
	}
}

function renderList() {
	const container = document.getElementById('hero-list');

	// Get Filter Values
	const searchText = document
		.getElementById('searchInput')
		.value.toLowerCase();
	const checkedRoles = Array.from(
		document.querySelectorAll('.role-filters input:checked'),
	).map((cb) => cb.value);

	// Filter Data
	const visibleHeroes = heroData.filter((hero) => {
		const matchesName = hero.name.toLowerCase().includes(searchText);
		const matchesTag =
			Array.isArray(hero.tags) &&
			hero.tags.some((tag) => tag.toLowerCase().includes(searchText));

		const matchesRole =
			checkedRoles.length === 0 ||
			(Array.isArray(hero.role)
				? hero.role.some((r) => checkedRoles.includes(r))
				: checkedRoles.includes(hero.role));
		return (matchesName || matchesTag) && matchesRole;
	});

	container.innerHTML = `
				<div class="hero-row header-row">
					<div></div>
					<div>Hero & Level</div>
					<div>Rank</div>
					<div>Points</div>
				</div>
			`;

	if (visibleHeroes.length === 0) {
		container.innerHTML += `<div style="text-align:center; padding:20px; color:#666;">No heroes found matching your filters.</div>`;
		return;
	}

	visibleHeroes.forEach((hero) => {
		const row = document.createElement('div');
		row.className = 'hero-row';

		// Calculate Level Info
		const totalScore = calculateTotalScore(hero);
		const levelInfo = getLevelInfoFromTotal(totalScore);

		let subFolder;
		if (levelInfo.level >= 50) {
			subFolder = 'dyna/';
		} else if (levelInfo.level >= 20) {
			subFolder = 'lord/';
		} else {
			subFolder = '';
		}
		// Allow the "Hulk Icon instead of Banner" setting to swap in an alternate portrait
		let heroName = hero.name;
		if (settings.hulkIcon && hero.name === 'Bruce Banner') {
			heroName = 'Hulk';
		}
		if (settings.ladyLoki && hero.name === 'Loki') {
			heroName = 'Lady Loki';
		}
		let heroFileName = getHeroFileName(heroName);
		const heroImgPath = `img/char/${subFolder}${heroFileName}`;
		const rankBadgePath = `img/icons/${levelInfo.title}_Badge.webp`;

		// Progress Bars
		// Bar 1: Progress to Next Title
		const currentConfig = levelConfig.find(
			(c) => c.title === levelInfo.title,
		);
		const pointsInTier =
			(levelInfo.level - currentConfig.startLvl) *
				currentConfig.xpPerLevel +
			levelInfo.xp;
		const titlePct = Math.min(
			100,
			(pointsInTier / currentConfig.totalRankXP) * 100,
		);

		// Bar 2: Total Progress (Max)
		const totalPct = Math.min(100, (totalScore / pointBaselines.MAX) * 100);

		const displayRole = Array.isArray(hero.role)
			? hero.role.join(' / ')
			: hero.role;

		row.innerHTML = `
			<div class="portrait-container">
				<div class="char-img-wrapper"${levelInfo.level >= 50 ? `style=\"box-shadow: 0 0 22px ${hero.color};\"` : ''}>
					<img src="${heroImgPath}" 
						class="hero-portrait rank-${levelInfo.title}" 
						style="background: linear-gradient(180deg,rgba(0, 0, 0, 0) 10%, ${hero.color || '#000'} 100%); ${levelInfo.level >= 50 ? `transform: scale(1.4) translateY(-9px);` : ''}"
						onerror="handleImageFallback(this, '${heroName}', '${heroFileName}')" alt="${heroName}">
				</div>
				<div class="role-icon-container">
					<img src="img/Vanguard_Icon.webp" class="role-icon-mini" title="Vanguard" style="display:${displayRole.includes('Vanguard') ? 'block' : 'none'}">
					<img src="img/Duelist_Icon.webp" class="role-icon-mini" title="Duelist" style="display:${displayRole.includes('Duelist') ? 'block' : 'none'}">
					<img src="img/Strategist_Icon.webp" class="role-icon-mini" title="Strategist" style="display:${displayRole.includes('Strategist') ? 'block' : 'none'}">
				</div>
			</div>

			<div class="hero-details">
				<span class="hero-name ${'rank-' + levelInfo.title}">
					${heroName} 
					<span style="font-size:0.7em; margin-left:10px; color:#666; font-weight:normal;">(${levelInfo.title})</span>
				</span>
				
				<div class="progress-section">
					<div class="progress-label">
						<span>To ${ranks[ranks.indexOf(levelInfo.title) + 1] || 'MAX'}</span>
						<span>${titlePct.toFixed(1)}%</span>
					</div>
					<div class="progress-bg">
						<div class="progress-fill fill-next-${levelInfo.title}" style="width: ${titlePct}%"></div>
					</div>

					<div class="progress-label" style="margin-top:2px;">
						<span>Total Progress</span>
						<span>${totalPct.toFixed(1)}%</span>
					</div>
					<div class="progress-bg">
						<div class="progress-fill fill-total" style="width: ${totalPct}%"></div>
					</div>
				</div>
			</div>

			<!-- Rank Badge & Level Input -->
			<div class="rank-select-container">
				<img src="${rankBadgePath}" class="rank-badge-img" onerror="this.style.display='none'" title="${levelInfo.title}">
				<div style="display:flex; flex-direction:column; width: 60px; position: relative;">
					<span style="position: absolute; top: -17px; color: #999; font-size:0.7em;">Level</span>
					<input type="number" class="level-input" min="1" max="70" value="${levelInfo.level}" 
						onchange="updateHero('${hero.name}', 'level', this.value)">
				</div>
			</div>

			<div class="point-container">
				<input type="number" value="${levelInfo.xp}" min="0" ${levelInfo.level > currentConfig.endLvl ? '' : `max="${levelInfo.maxXp}"`}
						onchange="updateHero('${hero.name}', 'points', this.value)" placeholder="0">
				<span class="point-suffix">/ ${levelInfo.level > currentConfig.endLvl ? '&infin;' : levelInfo.maxXp}</span>
			</div>
		`;
		container.appendChild(row);
	});
}

function updateHero(name, field, value) {
	console.log(`Updating ${name} - Field: ${field}, Value: ${value}`);
	const index = heroData.findIndex((h) => h.name === name);
	if (index === -1) return;

	// Get current state
	let total = calculateTotalScore(heroData[index]);
	let currentInfo = getLevelInfoFromTotal(total);

	let newLevel = currentInfo.level;
	let newXP = currentInfo.xp;

	if (field === 'level') {
		newLevel = parseInt(value);
		newXP = 0; // Reset XP when level changes to avoid a rare bug where it will level you back up if your points are max
	} else if (field === 'points') {
		newXP = parseInt(value);
	}

	// Convert back to Rank/Points storage format
	const newData = getDataFromLevel(newLevel, newXP);

	// Update Data
	heroData[index].rank = newData.rank;
	heroData[index].points = newData.points;

	sortHeroes();
	saveData();
}

function sortHeroes(toggle = false) {
	if (toggle) sorted = !sorted;
	if (sorted) {
		heroData.sort(
			(a, b) => calculateTotalScore(b) - calculateTotalScore(a),
		);
		document.getElementById('btn-sort').textContent = 'Sort Alphabetically';
	} else {
		heroData.sort((a, b) => a.name.localeCompare(b.name));
		document.getElementById('btn-sort').textContent = 'Sort by Proficiency';
	}
	renderList();
}

function saveData() {
	// We map only the dynamic data for saving to keep localStorage clean
	const dataToSave = heroData.map((h) => ({
		name: h.name,
		rank: h.rank,
		points: h.points,
	}));
	localStorage.setItem('marvelRivalsData', JSON.stringify(dataToSave));
}

function clearData() {
	if (confirm('Are you sure you want to clear all your inputs?')) {
		localStorage.removeItem('marvelRivalsData');
		localStorage.removeItem('marvelRivalsDataV3'); // Also clear legacy just in case
		location.reload();
	}
}

function downloadBackup() {
	// Backup needs to save basic stats, definitions (colors/roles) are hardcoded
	const dataToSave = heroData.map((h) => ({
		name: h.name,
		rank: h.rank,
		points: h.points,
	}));
	const dataStr = JSON.stringify(dataToSave, null, 2);
	const blob = new Blob([dataStr], { type: 'application/json' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download =
		'rivals_data_backup_' + new Date().toISOString().slice(0, 10) + '.json';
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}

function handleFileUpload(input) {
	const file = input.files[0];
	if (!file) return;
	const reader = new FileReader();
	reader.onload = function (e) {
		try {
			const contents = e.target.result;
			const parsedData = JSON.parse(contents);
			if (
				Array.isArray(parsedData) &&
				parsedData.length > 0 &&
				parsedData[0].hasOwnProperty('name')
			) {
				// Grab current data directly from our active array to compare
				const currentDataStr = JSON.stringify(
					heroData.map((h) => ({
						name: h.name,
						rank: h.rank,
						points: h.points,
					})),
				);

				openComparisonModal({
					title: 'Confirm Backup Import',
					desc: 'You are about to overwrite your current progress with a backup file. Please compare below to make sure this is what you want to do.',
					opt1Title: 'Current Progress',
					opt1Data: currentDataStr,
					opt1BtnText: 'Keep Current (Cancel)',
					opt1Action: () => {
						document.getElementById(
							'migration-modal',
						).style.display = 'none';
						input.value = ''; // Reset input so they can upload the same file again if needed
					},
					opt2Title: 'Backup File',
					opt2Data: contents,
					opt2BtnText: 'Import Backup',
					opt2Action: () => {
						localStorage.setItem(
							'marvelRivalsData',
							JSON.stringify(parsedData),
						);
						location.reload();
					},
					footerText: 'Importing the backup cannot be undone.',
				});
			} else {
				alert('Invalid backup file format.');
				input.value = '';
			}
		} catch (err) {
			alert('Error reading file: ' + err);
			input.value = '';
		}
	};
	reader.readAsText(file);
}

init();