const heroDefinitions = [
	{ name: "Adam Warlock", role: "Strategist", color: "#cba25c" },
	{ name: "Angela", role: "Vanguard", color: "#dd965c" },
	{ name: "Black Panther", role: "Duelist", color: "#a86ccf" },
	{ name: "Black Widow", role: "Duelist", color: "#545a68" },
	{ name: "Blade", role: "Duelist", color: "#ba4340" },
	{ name: "Bruce Banner", role: "Vanguard", color: "#448f56" },
	{ name: "Captain America", role: "Vanguard", color: "#366bac" },
	{ name: "Cloak and Dagger", role: "Strategist", color: "#899de1" },
	{ name: "Daredevil", role: "Duelist", color: "#d44a69" },
	{ name: "Deadpool", role: ["Vanguard", "Duelist", "Strategist"], color: "#d55959" },
	{ name: "Doctor Strange", role: "Vanguard", color: "#ee7d5e" },
	{ name: "Elsa Bloodstone", role: "Duelist", color: "#ee855f" },
	{ name: "Emma Frost", role: "Vanguard", color: "#2599bf" },
	{ name: "Gambit", role: "Strategist", color: "#bd5e98" },
	{ name: "Groot", role: "Vanguard", color: "#7b9e63" },
	{ name: "Hawkeye", role: "Duelist", color: "#9f70c3" },
	{ name: "Hela", role: "Duelist", color: "#2f8888" },
	{ name: "Human Torch", role: "Duelist", color: "#dc8f49" },
	{ name: "Invisible Woman", role: "Strategist", color: "#4c91bc" },
	{ name: "Iron Fist", role: "Duelist", color: "#4187cb" },
	{ name: "Iron Man", role: "Duelist", color: "#d55968" },
	{ name: "Jeff The Land Shark", role: "Strategist", color: "#5c77a1" },
	{ name: "Loki", role: "Strategist", color: "#4a967b" },
	{ name: "Luna Snow", role: "Strategist", color: "#4d77ba" },
	{ name: "Magik", role: "Duelist", color: "#8b615f" },
	{ name: "Magneto", role: "Vanguard", color: "#5e5688" },
	{ name: "Mantis", role: "Strategist", color: "#8ca171" },
	{ name: "Mister Fantastic", role: "Duelist", color: "#18a5be" },
	{ name: "Moon Knight", role: "Duelist", color: "#657986" },
	{ name: "Namor", role: "Duelist", color: "#009897" },
	{ name: "Peni Parker", role: "Vanguard", color: "#e26363" },
	{ name: "Phoenix", role: "Duelist", color: "#e27568" },
	{ name: "Psylocke", role: "Duelist", color: "#a95db6" },
	{ name: "Rocket Raccoon", role: "Strategist", color: "#c77356" },
	{ name: "Rogue", role: "Vanguard", color: "#c2ae62" },
	{ name: "Scarlet Witch", role: "Duelist", color: "#dc4769" },
	{ name: "Spider Man", role: "Duelist", color: "#d35b60" },
	{ name: "Squirrel Girl", role: "Duelist", color: "#c88858" },
	{ name: "Star Lord", role: "Duelist", color: "#4187cb" },
	{ name: "Storm", role: "Duelist", color: "#474e74" },
	{ name: "The Punisher", role: "Duelist", color: "#56667a" },
	{ name: "The Thing", role: "Vanguard", color: "#c98a58" },
	{ name: "Thor", role: "Vanguard", color: "#666aae" },
	{ name: "Ultron", role: "Strategist", color: "#8391b8" },
	{ name: "Venom", role: "Vanguard", color: "#576788" },
	{ name: "Winter Soldier", role: "Duelist", color: "#667b48" },
	{ name: "Wolverine", role: "Duelist", color: "#c49c3e" },
];

// Configuration for Levels and XP
const levelConfig = [
	{ title: "Agent", startLvl: 1, endLvl: 4, totalRankXP: 500 },
	{ title: "Knight", startLvl: 5, endLvl: 9, totalRankXP: 1200 },
	{ title: "Captain", startLvl: 10, endLvl: 14, totalRankXP: 2000 },
	{ title: "Centurion", startLvl: 15, endLvl: 19, totalRankXP: 2400 },
	{ title: "Lord", startLvl: 20, endLvl: 24, totalRankXP: 8000 },
	{ title: "Count", startLvl: 25, endLvl: 29, totalRankXP: 8000 },
	{ title: "Colonel", startLvl: 30, endLvl: 34, totalRankXP: 8000 },
	{ title: "Warrior", startLvl: 35, endLvl: 39, totalRankXP: 8000 },
	{ title: "Elite", startLvl: 40, endLvl: 44, totalRankXP: 8000 },
	{ title: "Guardian", startLvl: 45, endLvl: 49, totalRankXP: 8000 },
	{ title: "Champion", startLvl: 50, endLvl: 70, totalRankXP: 62000 }, // Approx 3100 per level
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

function getHeroFileName(name) {
	return name.replace(/\s+/g, "") + ".webp";
}

function init() {
	const savedData = localStorage.getItem("marvelRivalsDataV3") ?? localStorage.getItem("marvelRivalsData");

	if (savedData) {
		const parsedData = JSON.parse(savedData);
		heroData = heroDefinitions.map((def) => {
			const saved = parsedData.find((p) => p.name === def.name);
			// Ensure we keep the color/role from definition, but get rank/points from save
			return saved ? { ...def, rank: saved.rank, points: saved.points } : { ...def, rank: "Agent", points: 0 };
		});
	} else {
		heroData = heroDefinitions.map((def) => ({
			...def,
			rank: "Agent",
			points: 0,
		}));
	}
	renderList();
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
		if (totalPoints < tierEndXP || conf.title === "Champion") {
			const pointsInTier = Math.max(0, totalPoints - cumulativeXP);

			// Calculate which level within the tier
			// e.g., Agent (125 per lvl). 200 pts in -> 200/125 = 1.6 -> Level index 1 (Level 2)
			// Use floor, but ensure we don't exceed max levels
			const levelIndex = Math.floor(pointsInTier / conf.xpPerLevel);
			const currentLevel = conf.startLvl + levelIndex;

			// Allow level to cap at max defined in config (70)
			const clampedLevel = Math.min(currentLevel, conf.endLvl);

			// Calculate XP remaining in that specific level
			// If we are capped at 70, we might be full
			let xpInCurrentLevel = pointsInTier - (clampedLevel - conf.startLvl) * conf.xpPerLevel;
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
	return { level: 70, xp: 3100, maxXp: 3100, title: "Champion" };
}

function getDataFromLevel(targetLevel, targetXP) {
	let cumulativeXP = 0;

	for (let conf of levelConfig) {
		if (targetLevel >= conf.startLvl && targetLevel <= conf.endLvl) {
			// Found the tier
			const levelsCompletedInTier = targetLevel - conf.startLvl;
			const pointsFromCompletedLevels = levelsCompletedInTier * conf.xpPerLevel;

			// Calculate points relative to the Rank Baseline (Agent start, Knight start, etc)
			// Stored data format is { rank: "Agent", points: 200 } where 200 is relative to Agent start
			// But wait, the previous system stored points relative to the Rank Start.
			// So we just need pointsInTier.

			// Ensure XP doesn't exceed the level cap
			const finalXP = Math.min(targetXP, conf.xpPerLevel);

			const pointsInTier = pointsFromCompletedLevels + finalXP;

			return {
				rank: conf.title,
				points: Math.round(pointsInTier),
			};
		}
		cumulativeXP += conf.totalRankXP; // Not used for return, but for loop logic if needed
	}
	return { rank: "Champion", points: 62000 };
}

function toggleFilters() {
	const content = document.getElementById("filter-content");
	const arrow = document.getElementById("filter-arrow");
	content.classList.toggle("expanded");
	arrow.style.transform = content.classList.contains("expanded") ? "rotate(90deg)" : "rotate(0deg)";
}

function renderList() {
	const container = document.getElementById("hero-list");

	// Get Filter Values
	const searchText = document.getElementById("searchInput").value.toLowerCase();
	const checkedRoles = Array.from(document.querySelectorAll(".role-filters input:checked")).map((cb) => cb.value);

	// Filter Data
	const visibleHeroes = heroData.filter((hero) => {
		const matchesName = hero.name.toLowerCase().includes(searchText);

		const matchesRole = checkedRoles.length === 0 || (Array.isArray(hero.role) ? hero.role.some((r) => checkedRoles.includes(r)) : checkedRoles.includes(hero.role));
		return matchesName && matchesRole;
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
		const row = document.createElement("div");
		row.className = "hero-row";

		// Calculate Level Info
		const totalScore = calculateTotalScore(hero);
		const levelInfo = getLevelInfoFromTotal(totalScore);

		const subFolder = ranks.indexOf(levelInfo.title) >= ranks.indexOf("Lord") ? "lord/" : "";
		const heroImgPath = `img/char/${subFolder}${getHeroFileName(hero.name)}`;
		const rankBadgePath = `img/icons/${levelInfo.title}_Badge.webp`;

		// Progress Bars
		// Bar 1: Progress to Next Title
		const currentConfig = levelConfig.find(c => c.title === levelInfo.title);
		const pointsInTier = ((levelInfo.level - currentConfig.startLvl) * currentConfig.xpPerLevel) + levelInfo.xp;
		const titlePct = Math.min(100, (pointsInTier / currentConfig.totalRankXP) * 100);

		// Bar 2: Total Progress (Max)
		const totalPct = Math.min(100, (totalScore / pointBaselines.MAX) * 100);

		const displayRole = Array.isArray(hero.role) ? hero.role.join(" / ") : hero.role;

		row.innerHTML = `
			<div class="portrait-container">
				<img src="${heroImgPath}" 
					class="hero-portrait rank-${levelInfo.title}" 
					style="background: linear-gradient(180deg,rgba(0, 0, 0, 0) 10%, ${hero.color || "#000"} 100%)"
					onerror="this.src='img/char/${getHeroFileName(hero.name)}'" alt="${hero.name}">
				<div class="role-icon-container">
					<img src="img/Vanguard_Icon.webp" class="role-icon-mini" title="Vanguard" style="display:${displayRole.includes("Vanguard") ? "block" : "none"}">
					<img src="img/Duelist_Icon.webp" class="role-icon-mini" title="Duelist" style="display:${displayRole.includes("Duelist") ? "block" : "none"}">
					<img src="img/Strategist_Icon.webp" class="role-icon-mini" title="Strategist" style="display:${displayRole.includes("Strategist") ? "block" : "none"}">
				</div>
			</div>

			<div class="hero-details">
				<span class="hero-name ${"rank-" + levelInfo.title}">
					${hero.name} 
					<span style="font-size:0.7em; margin-left:10px; color:#666; font-weight:normal;">(${levelInfo.title})</span>
				</span>
				
				<div class="progress-section">
					<div class="progress-label">
						<span>To ${ranks[ranks.indexOf(levelInfo.title) + 1] || "MAX"}</span>
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
				<input type="number" value="${levelInfo.xp}" min="0" max="${levelInfo.maxXp}"
						onchange="updateHero('${hero.name}', 'points', this.value)" placeholder="0">
				<span class="point-suffix">/ ${levelInfo.maxXp}</span>
			</div>
		`;
		container.appendChild(row);
	});
}

function updateHero(name, field, value) {
	const index = heroData.findIndex((h) => h.name === name);
	if (index === -1) return;

	// Get current state
	let total = calculateTotalScore(heroData[index]);
	let currentInfo = getLevelInfoFromTotal(total);

	let newLevel = currentInfo.level;
	let newXP = currentInfo.xp;

	if (field === "level") {
		newLevel = parseInt(value);
	} else if (field === "points") {
		newXP = parseInt(value);
	}

	// Convert back to Rank/Points storage format
	const newData = getDataFromLevel(newLevel, newXP);

	// Update Data
	heroData[index].rank = newData.rank;
	heroData[index].points = newData.points;

	saveData();
	// Re-render to update bars/layout
	renderList();
}

function sortHeroes() {
	heroData.sort((a, b) => calculateTotalScore(b) - calculateTotalScore(a));
	renderList();
	saveData();
}

function saveData() {
	// We map only the dynamic data for saving to keep localStorage clean
	const dataToSave = heroData.map((h) => ({ name: h.name, rank: h.rank, points: h.points }));
	localStorage.setItem("marvelRivalsData", JSON.stringify(dataToSave));
}

function clearData() {
	if (confirm("Are you sure you want to clear all your inputs?")) {
		localStorage.removeItem("marvelRivalsData");
		location.reload();
	}
}

function downloadBackup() {
	// Backup needs to save basic stats, definitions (colors/roles) are hardcoded
	const dataToSave = heroData.map((h) => ({ name: h.name, rank: h.rank, points: h.points }));
	const dataStr = JSON.stringify(dataToSave, null, 2);
	const blob = new Blob([dataStr], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "marvel_rivals_backup_" + new Date().toISOString().slice(0, 10) + ".json";
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
			if (Array.isArray(parsedData) && parsedData.length > 0 && parsedData[0].hasOwnProperty("name")) {
				if (confirm("This will overwrite your current data with the backup file. Continue?")) {
					localStorage.setItem("marvelRivalsData", JSON.stringify(parsedData));
					alert("Backup restored successfully!");
					location.reload();
				}
			} else {
				alert("Invalid backup file format.");
			}
		} catch (err) {
			alert("Error reading file: " + err);
		}
	};
	reader.readAsText(file);
	input.value = "";
}

init();

async function fileUrlToDataUrl(url) {
	// 1. Fetch the resource
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	// 2. Get the response as a Blob
	const blob = await response.blob();

	// 3. Convert the Blob to a Data URL using FileReader
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		// Set up the onload event listener
		reader.onloadend = () => {
			if (reader.result) {
				resolve(reader.result);
			} else {
				reject(new Error("FileReader could not convert the blob to a data URL."));
			}
		};
		// Set up the error handler
		reader.onerror = () => {
			reject(reader.error);
		};

		// Read the blob as a data URL
		reader.readAsDataURL(blob);
	});
}

// Make this function async so we can await the image conversions
async function generateRouletteJSON() {
	// 1. Separate heroes by role
	const vanguards = [];
	const duelists = [];
	const strategists = [];

	// Base weight per role group (Total weight will be 300)
	const ROLE_TOTAL_WEIGHT = 100;

	heroDefinitions.forEach((hero) => {
		hero.imageName = getHeroFileName(hero.name);
		if (Array.isArray(hero.role)) {
			hero.role.forEach((r) => {
				const entry = {
					...hero,
					role: r,
				};

				if (r === "Vanguard") {
					entry.name = hero.name === "Deadpool" ? "Tankpool" : `${hero.name} (${r})`;
					vanguards.push(entry);
				}
				if (r === "Duelist") {
					entry.name = hero.name === "Deadpool" ? "DPSpool" : `${hero.name} (${r})`;
					duelists.push(entry);
				}
				if (r === "Strategist") {
					entry.name = hero.name === "Deadpool" ? "Healpool" : `${hero.name} (${r})`;
					strategists.push(entry);
				}
			});
		} else {
			if (hero.role === "Vanguard") vanguards.push(hero);
			if (hero.role === "Duelist") duelists.push(hero);
			if (hero.role === "Strategist") strategists.push(hero);
		}
	});

	// 2. Calculate weight per hero within their role and use Math.round() for whole numbers
	const vWeight = vanguards.length > 0 ? Math.round(ROLE_TOTAL_WEIGHT / vanguards.length) : 0;
	const dWeight = duelists.length > 0 ? Math.round(ROLE_TOTAL_WEIGHT / duelists.length) : 0;
	const sWeight = strategists.length > 0 ? Math.round(ROLE_TOTAL_WEIGHT / strategists.length) : 0;

	// 3. Helper function to process an array of heroes into entries asynchronously
	const processEntries = async (heroList, weight) => {
		return Promise.all(
			heroList.map(async (hero) => {
				let base64Image = "";
				try {
					// Wait for the image to be fetched and converted
					base64Image = await fileUrlToDataUrl(`img/char/${hero.imageName}`);
				} catch (err) {
					console.error(`Error converting image for ${hero.name} (${hero.imageName}):`, err);
				}

				return {
					text: hero.name,
					weight: weight,
					enabled: true,
					color: hero.color,
					image: base64Image,
					imageName: hero.imageName,
				};
			}),
		);
	};

	// Wait for all three groups to finish converting their images
	const vEntries = await processEntries(vanguards, vWeight);
	const dEntries = await processEntries(duelists, dWeight);
	const sEntries = await processEntries(strategists, sWeight);

	// Combine them all into the final entries array and sort by name again
	const entries = [...vEntries, ...dEntries, ...sEntries].sort((a, b) => b.imageName.localeCompare(a.imageName));

	// 4. Construct the full JSON object using settings from the user's example
	const rouletteData = {
		wheels: [
			{
				wheelConfig: {
					afterSpinSound: "cymbal-sound",
					afterSpinSoundVolume: 50,
					allowDuplicates: true,
					animateWinner: false,
					autoRemoveWinner: false,
					centerText: "",
					colorSettings: [
						{
							color: "#32334f",
							enabled: true,
						},
						{
							color: "#fefefc",
							enabled: true,
						},
						{
							color: "#f3d22b",
							enabled: true,
						},
						{
							color: "#009925",
							enabled: false,
						},
						{
							color: "#000000",
							enabled: false,
						},
						{
							color: "#000000",
							enabled: false,
						},
					],
					coverImageName: "",
					coverImageType: "",
					customCoverImageDataUri: "",
					customPictureDataUri: "data:image/jpeg;base64,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",
					customPictureName: "470470635_122096646698702486_2430148602589562945_n.jpg",
					description: "- All heroes up to Season 6.5\n- Adjusted weights for each class\n- Colored panels based on in-game colors\n- Hero portraits",
					displayHideButton: true,
					displayRemoveButton: true,
					displayWinnerDialog: true,
					drawOutlines: true,
					drawShadow: false,
					duringSpinSound: "ticking-sound",
					duringSpinSoundVolume: 50,
					entries: entries.map((h) => {
						delete h.imageName; // Exclude the imageName from the final JSON (it was only for internal processing)
						return h;
					}),
					galleryPicture: "/images/none.png",
					hubSize: "M",
					isAdvanced: true,
					launchConfetti: true,
					maxNames: 1000,
					pageBackgroundColor: "#FFFFFF",
					pictureType: "uploaded",
					playClickWhenWinnerRemoved: false,
					showTitle: true,
					slowSpin: false,
					spinTime: 10,
					title: "Marvel Rivals Roulette",
					type: "color",
					winnerMessage: "You have landed on",
					pointerChangesColor: true,
					pageGradient: true,
				},
				path: "kg7-we2",
				shareMode: "copyable",
			},
		],
	};

	// 5. Trigger Download
	const dataStr = JSON.stringify(rouletteData, null, 2);
	const blob = new Blob([dataStr], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = "Marvel Rivals Roulette.wheel";
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
	URL.revokeObjectURL(url);
}
