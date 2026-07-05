// Matches the hex values in styles.css since canvas can't read CSS custom properties directly
const rankColorMap = {
	Agent: '#8f7c5d',
	Knight: '#737890',
	Captain: '#5e8795',
	Centurion: '#6c80a0',
	Lord: '#ffce76',
	Count: '#8fcdd8',
	Colonel: '#74b4de',
	Warrior: '#c982f3',
	Elite: '#f87940',
	Guardian: '#eb79dd',
	Champion: '#f62a42',
};

function getRankColor(title) {
	return rankColorMap[title] || '#999';
}

function getShareDisplayName(hero) {
	let heroName = hero.name;
	if (settings.hulkIcon && hero.name === 'Bruce Banner') heroName = 'Hulk';
	if (settings.ladyLoki && hero.name === 'Loki') heroName = 'Lady Loki';
	return heroName;
}

// Builds the ordered list of image paths to try, same priority as the on-page fallback logic
function getShareHeroImageCandidates(hero, levelInfo) {
	const heroName = getShareDisplayName(hero);
	const fileName = getHeroFileName(heroName);
	const candidates = [];

	// dont use dynamic icon because the image is still
	if (levelInfo.level >= 20) candidates.push(`img/char/lord/${fileName}`);
	candidates.push(`img/char/${fileName}`);

	return { heroName, fileName, candidates };
}

function loadImageWithFallback(candidates) {
	return new Promise((resolve) => {
		let i = 0;
		const tryNext = () => {
			if (i >= candidates.length) {
				resolve(null);
				return;
			}
			const img = new Image();
			img.onload = () => resolve(img);
			img.onerror = () => {
				i++;
				tryNext();
			};
			img.src = candidates[i];
		};
		tryNext();
	});
}

function drawRoundedRect(ctx, x, y, w, h, r) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}

async function buildTop5ShareCanvas() {
	const canvas = document.getElementById('share-canvas');

	const scale = 2; // draw at 2x and let CSS scale down, so the download stays crisp
	const width = 860;
	const rowHeight = 148;
	const rowGap = 14;
	const headerHeight = 130;
	const footerHeight = 56;
	const padX = 36;
	const rowCount = 5;
	const height = headerHeight + rowCount * rowHeight + footerHeight + 20;

	canvas.width = width * scale;
	canvas.height = height * scale;
	canvas.style.aspectRatio = `${width} / ${height}`;

	const ctx = canvas.getContext('2d');
	ctx.setTransform(scale, 0, 0, scale, 0, 0);

	// Background
	const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
	bgGrad.addColorStop(0, '#141414');
	bgGrad.addColorStop(1, '#0a0a0a');
	ctx.fillStyle = bgGrad;
	ctx.fillRect(0, 0, width, height);

	// Header
	ctx.textAlign = 'center';
	ctx.fillStyle = '#e0e0e0';
	ctx.font = "700 30px 'Segoe UI', Tahoma, Verdana, sans-serif";
	ctx.fillText('MARVEL RIVALS', width / 2, 52);

	ctx.font = "600 15px 'Segoe UI', Tahoma, Verdana, sans-serif";
	ctx.fillStyle = '#f87940';
	ctx.fillText('TOP 5 HERO PROFICIENCIES', width / 2, 76);

	ctx.strokeStyle = '#333';
	ctx.lineWidth = 1;
	ctx.beginPath();
	ctx.moveTo(padX, 96);
	ctx.lineTo(width - padX, 96);
	ctx.stroke();

	// Work out the top 5 by total score (same metric the sort button uses)
	const top5 = [...heroData]
		.sort((a, b) => calculateTotalScore(b) - calculateTotalScore(a))
		.slice(0, 5);

	// Preload every portrait + rank badge before drawing
	const rowData = await Promise.all(
		top5.map(async (hero) => {
			const score = calculateTotalScore(hero);
			const levelInfo = getLevelInfoFromTotal(score);
			const { heroName, candidates } = getShareHeroImageCandidates(
				hero,
				levelInfo,
			);
			const [img, badgeImg] = await Promise.all([
				loadImageWithFallback(candidates),
				loadImageWithFallback([
					`img/icons/${levelInfo.title}_Badge.webp`,
				]),
			]);
			return { hero, score, levelInfo, heroName, img, badgeImg };
		}),
	);

	let y = headerHeight;
	rowData.forEach((data, idx) => {
		const rowY = y;
		const cardX = padX;
		const cardW = width - padX * 2;
		const cardH = rowHeight - rowGap;

		// Row card background
		ctx.fillStyle =
			idx === 0
				? 'rgba(255, 206, 118, 0.08)'
				: 'rgba(255, 255, 255, 0.02)';
		drawRoundedRect(ctx, cardX, rowY, cardW, cardH, 12);
		ctx.fill();
		ctx.strokeStyle = idx === 0 ? '#d5a24688' : '#2a2a2a';
		ctx.lineWidth = idx === 0 ? 2 : 1;
		drawRoundedRect(ctx, cardX, rowY, cardW, cardH, 12);
		ctx.stroke();

		// Rank number
		ctx.font = "800 34px 'Segoe UI', Tahoma, Verdana, sans-serif";
		ctx.fillStyle = idx === 0 ? '#ffce76' : '#555';
		ctx.textAlign = 'left';
		ctx.fillText(`#${idx + 1}`, cardX + 16, rowY + cardH / 2 + 12);

		// Portrait
		const portraitSize = 96;
		const portraitX = cardX + 80;
		const portraitY = rowY + (cardH - portraitSize) / 2;

		ctx.save();
		drawRoundedRect(
			ctx,
			portraitX,
			portraitY,
			portraitSize,
			portraitSize,
			14,
		);
		ctx.clip();

		// Transparent to Hero Color gradient
		const portraitGrad = ctx.createLinearGradient(
			portraitX,
			portraitY,
			portraitX,
			portraitY + portraitSize,
		);
		portraitGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
		portraitGrad.addColorStop(1, data.hero.color || '#222');
		ctx.fillStyle = portraitGrad;

		ctx.fillRect(portraitX, portraitY, portraitSize, portraitSize);
		if (data.img) {
			const ratio = Math.max(
				portraitSize / data.img.width,
				portraitSize / data.img.height,
			);
			const dw = data.img.width * ratio;
			const dh = data.img.height * ratio;
			ctx.drawImage(
				data.img,
				portraitX + (portraitSize - dw) / 2,
				portraitY + (portraitSize - dh) / 2,
				dw,
				dh,
			);
		} else {
			ctx.fillStyle = '#fff';
			ctx.textAlign = 'center';
			ctx.font = "700 34px 'Segoe UI', Tahoma, Verdana, sans-serif";
			ctx.fillText(
				data.heroName.charAt(0),
				portraitX + portraitSize / 2,
				portraitY + portraitSize / 2 + 12,
			);
		}
		ctx.restore();

		ctx.strokeStyle = data.hero.color || '#444';
		ctx.lineWidth = 2;
		drawRoundedRect(
			ctx,
			portraitX,
			portraitY,
			portraitSize,
			portraitSize,
			14,
		);
		ctx.stroke();

		// Name + rank/level text
		const textX = portraitX + portraitSize + 24;
		ctx.textAlign = 'left';
		ctx.fillStyle = data.hero.color;
		ctx.font = "700 22px 'Segoe UI', Tahoma, Verdana, sans-serif";
		ctx.fillText(data.heroName, textX, rowY + 42);

		ctx.font = "600 14px 'Segoe UI', Tahoma, Verdana, sans-serif";
		ctx.fillStyle = getRankColor(data.levelInfo.title);
		ctx.fillText(
			`${data.levelInfo.title.toUpperCase()} · LEVEL ${data.levelInfo.level}`,
			textX,
			rowY + 64,
		);

		// Total progress bar
		const barX = textX;
		const barY = rowY + 82;
		const barW = cardW - (textX - cardX) - 110;
		const barH = 8;
		const totalPct = Math.min(100, (data.score / pointBaselines.MAX) * 100);

		ctx.fillStyle = '#2b2b2b';
		drawRoundedRect(ctx, barX, barY, barW, barH, 4);
		ctx.fill();

		// Solid color instead of linear gradient
		ctx.fillStyle = getRankColor(data.levelInfo.title);
		drawRoundedRect(
			ctx,
			barX,
			barY,
			Math.max(6, (barW * totalPct) / 100),
			barH,
			4,
		);
		ctx.fill();

		ctx.font = "600 12px 'Segoe UI', Tahoma, Verdana, sans-serif";
		ctx.fillStyle = '#888';
		ctx.fillText(`${totalPct.toFixed(1)}% TOTAL PROGRESS`, barX, barY + 24);

		// Rank badge, top right of the card
		if (data.badgeImg) {
			const badgeH = 56;
			const badgeW =
				(data.badgeImg.width / data.badgeImg.height) * badgeH;
			ctx.drawImage(
				data.badgeImg,
				cardX + cardW - badgeW - 20,
				rowY + (cardH - badgeH) / 2,
				badgeW,
				badgeH,
			);
		}

		y += rowHeight;
	});
	
	// Footer site
	ctx.textAlign = 'center';
	ctx.font = "500 20px 'Segoe UI', Tahoma, Verdana, sans-serif";
	ctx.fillStyle = '#666';
	ctx.fillText(
		'https://rivals.ladyofpa.in/',
		width / 2,
		height - 44,
	);

	// Footer credit
	ctx.textAlign = 'center';
	ctx.font = "500 13px 'Segoe UI', Tahoma, Verdana, sans-serif";
	ctx.fillStyle = '#555';
	ctx.fillText(
		'Marvel Rivals Proficiency Tracker',
		width / 2,
		height - 22,
	);

	return canvas;
}

function openShareModal() {
	document.getElementById('share-modal').style.display = 'flex';
	const loadingEl = document.getElementById('share-loading');
	const downloadBtn = document.getElementById('share-download-btn');
	loadingEl.textContent = 'Building image…';
	loadingEl.classList.remove('hidden');
	downloadBtn.disabled = true;

	buildTop5ShareCanvas()
		.then(() => {
			loadingEl.classList.add('hidden');
			downloadBtn.disabled = false;
		})
		.catch((err) => {
			console.error('Failed to build share image:', err);
			loadingEl.textContent = "Couldn't build the image.";
		});
}

function closeShareModal() {
	document.getElementById('share-modal').style.display = 'none';
}

function downloadShareImage() {
	const canvas = document.getElementById('share-canvas');
	canvas.toBlob((blob) => {
		if (!blob) return;
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download =
			'marvel_rivals_top5_' +
			new Date().toISOString().slice(0, 10) +
			'.png';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		URL.revokeObjectURL(url);
	}, 'image/png');
}
