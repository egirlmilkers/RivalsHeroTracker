const heroDefinitions = [
	{ name: "Adam Warlock", role: "Strategist", color: "#cba25c" },
	{ name: "Angela", role: "Vanguard", color: "#dd965c" },
	{ name: "Black Panther", role: "Duelist", color: "#a86ccf" },
	{ name: "Black Widow", role: "Duelist", color: "#545a68" },
	{ name: "Blade", role: "Duelist", color: "#ba4340" },
	{ name: "Hulk", role: "Vanguard", color: "#448f56" },
	{ name: "Captain America", role: "Vanguard", color: "#366bac" },
	{ name: "Cloak and Dagger", role: "Strategist", color: "#899de1" },
	{ name: "Daredevil", role: "Duelist", color: "#d44a69" },
	{ name: "Doctor Strange", role: "Vanguard", color: "#ee7d5e" },
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

const rankBaselines = {
	Agent: 0,
	Knight: 500,
	Captain: 1700,
	Centurion: 3700,
	Lord: 6100,
};

const ranks = ["Agent", "Knight", "Captain", "Centurion", "Lord"];

let heroData = [];

function getHeroFileName(name) {
	return name.replace(/\s+/g, "") + ".webp";
}

function init() {
	const savedData = localStorage.getItem("marvelRivalsDataV3");

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

function calculateTotalScore(hero) {
	const baseline = rankBaselines[hero.rank] || 0;
	const points = parseInt(hero.points) || 0;
	return baseline + points;
}

function getProgressInfo(hero) {
	const total = calculateTotalScore(hero);
	const currentRankIndex = ranks.indexOf(hero.rank);

	// Stats for Next Badge
	let nextRankName = "Max Rank";
	let nextRankPct = 100;
	let nextRankClass = "fill-max";

	if (currentRankIndex < ranks.length - 1) {
		nextRankName = ranks[currentRankIndex + 1];

		const currentBase = rankBaselines[hero.rank];
		const nextBase = rankBaselines[nextRankName];
		const pointsInTier = total - currentBase;
		const tierSpan = nextBase - currentBase;

		nextRankPct = Math.min(100, Math.max(0, (pointsInTier / tierSpan) * 100));
		nextRankClass = `fill-next-${nextRankName}`;
	}

	// Stats for Lord (Total)
	const lordBase = rankBaselines["Lord"];
	// We allow this to go over 100 now for calculation, but visual clamp is handled in render
	const rawLordPct = (total / lordBase) * 100;

	return {
		nextRankName,
		nextRankPct: nextRankPct.toFixed(1),
		nextRankClass,
		rawLordPct: rawLordPct.toFixed(1), // Can be > 100
	};
}

function renderList() {
	const container = document.getElementById("hero-list");
	container.innerHTML = `
                <div class="hero-row header-row">
                    <div></div>
                    <div>Hero & Progress</div>
                    <div>Rank</div>
                    <div>Points</div>
                </div>
            `;

	heroData.forEach((hero, index) => {
		const row = document.createElement("div");
		row.className = "hero-row";

		let options = ranks.map((r) => `<option value="${r}" ${hero.rank === r ? "selected" : ""}>${r}</option>`).join("");

		const subFolder = hero.rank === "Lord" ? "lord/" : "";
		const heroImgPath = `img/char/${subFolder}${getHeroFileName(hero.name)}`;
		const roleIconPath = `img/${hero.role}_Icon.webp`;
		const rankBadgePath = `img/icons/${hero.rank}_Badge.webp`;

		const progress = getProgressInfo(hero);
		const totalScore = calculateTotalScore(hero);

		// === LOGIC FOR LORD OVERFILL ===
		let progressHTML = "";

		if (hero.rank === "Lord") {
			// Only display Lord Overfill bar
			progressHTML = `
						<div class="progress-section">
							<div class="progress-label">
								<span style="color:var(--color-gold); font-weight:bold;">Lord Mastery</span>
								<span style="color:var(--color-gold); font-weight:bold;">${progress.rawLordPct}%</span>
							</div>
							<div class="progress-bg">
								<div class="progress-fill fill-overfill" style="width: 100%"></div>
							</div>
						</div>
					`;
		} else {
			// Display Normal 2 bars
			// Visual clamp for standard view
			const visualLordPct = Math.min(100, progress.rawLordPct);

			progressHTML = `
						<div class="progress-section">
							<div class="progress-label">
								<span>To ${progress.nextRankName}</span>
								<span>${progress.nextRankPct}%</span>
							</div>
							<div class="progress-bg">
								<div class="progress-fill ${progress.nextRankClass}" style="width: ${progress.nextRankPct}%"></div>
							</div>

							<div class="progress-label" style="margin-top:2px;">
								<span>Total Progress</span>
								<span>${visualLordPct}%</span>
							</div>
							<div class="progress-bg">
								<div class="progress-fill fill-total" style="width: ${visualLordPct}%"></div>
							</div>
						</div>
					`;
		}

		// Added background-color style to img
		row.innerHTML = `
					<div class="portrait-container">
						<img src="${heroImgPath}" 
							class="hero-portrait rank-${hero.rank}" 
							style="background-color: ${hero.color || "#000"}"
							onerror="this.src='img/char/${getHeroFileName(hero.name)}'" alt="${hero.name}">
						<img src="${roleIconPath}" class="role-icon-mini" title="${hero.role}" 
							onerror="this.style.display='none'">
					</div>

					<div class="hero-details">
						<span class="hero-name ${"rank-" + hero.rank}">
							${hero.name} 
							<span style="font-size:0.7em; margin-left:10px; color:#666; font-weight:normal;">(${totalScore})</span>
						</span>
						
						${progressHTML}
					</div>

					<div class="rank-select-container">
						<img src="${rankBadgePath}" class="rank-badge-img" onerror="this.style.display='none'">
						<select onchange="updateHero(${index}, 'rank', this.value)">
							${options}
						</select>
					</div>

					<div>
						<input type="number" value="${hero.points}" min="0" 
								onchange="updateHero(${index}, 'points', this.value)" placeholder="0">
					</div>
				`;
		container.appendChild(row);
	});
}

function updateHero(index, field, value) {
	heroData[index][field] = value;
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
	localStorage.setItem("marvelRivalsDataV3", JSON.stringify(dataToSave));
}

function clearData() {
	if (confirm("Are you sure you want to clear all your inputs?")) {
		localStorage.removeItem("marvelRivalsDataV3");
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
					localStorage.setItem("marvelRivalsDataV3", JSON.stringify(parsedData));
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
