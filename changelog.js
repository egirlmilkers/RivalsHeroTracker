let allChangelogEntries = [];

async function checkChangelog() {
	try {
		const response = await fetch('CHANGELOG.md');
		if (!response.ok) return;
		const text = await response.text();

		const lines = text.split('\n');
		let currentEntry = null;

		for (let i = 0; i < lines.length; i++) {
			let line = lines[i].trim();

			// Ignore the main # Changelog header
			if (line.startsWith('# ') && !line.startsWith('##')) continue;

			// Check for new version blocks
			if (line.startsWith('### ')) {
				// Parse date and version (e.g., "### Jul 13th 2026 v31")
				const headerMatch = /^###\s+(.+?)\s+(v[a-zA-Z0-9\.]+)\s*$/.exec(
					line,
				);

				// Alert the developer if a header fails parsing formatting rules
				if (!headerMatch) {
					alert(
						`Changelog parsing error on line ${i + 1}:\n"${line}"\nExpected format: ### [Date] [vVersion]`,
					);
					continue;
				}

				if (currentEntry) allChangelogEntries.push(currentEntry);

				currentEntry = {
					date: headerMatch[1],
					version: headerMatch[2],
					rawContent: [],
				};
			} else if (currentEntry) {
				currentEntry.rawContent.push(line);
			}
		}
		// Push the final entry
		if (currentEntry) allChangelogEntries.push(currentEntry);

		if (allChangelogEntries.length > 0) {
			const latestVersion = allChangelogEntries[0].version;

			// Update the top right text
			const versionBtn = document.getElementById('version-display');
			if (versionBtn) {
				versionBtn.innerText = latestVersion;
			}

			// Check for new updates since the user's last visit
			const lastSeenVersion = localStorage.getItem('lastSeenVersion');

			// extremely lazy way to reset version numbers (only version that had old number was v31)
			if (lastSeenVersion < latestVersion || lastSeenVersion == "31") {
				let newUpdates = [];
				for (let entry of allChangelogEntries) {
					if (entry.version <= lastSeenVersion) break;
					newUpdates.push(entry);
				}
				
				let h = "New Updates!"
				// If it's a first time visitor, only show the single most recent update
				if (lastSeenVersion) {
					newUpdates = [allChangelogEntries.find(e => !e.version.includes('.'))];
					h = "Latest Update"
				}

				showChangelogModal(
					newUpdates,
					h,
				);
				localStorage.setItem('lastSeenVersion', latestVersion);
			}
		}
	} catch (e) {
		console.error('Error fetching changelog:', e);
	}
}

function showChangelogModal(entries, title = 'Update History') {
	document.getElementById('changelog-title').innerText = title;

	let html = '';
	entries.forEach((entry) => {
		html += `<h3 class="cl-headers">
					${entry.version} 
					<span>${entry.date}</span>
				</h3>`;
		html += marked.parse(entry.rawContent.join('\n'));
	});

	document.getElementById('changelog-body').innerHTML = html;
	document.getElementById('changelog-modal').style.display = 'flex';
}

function showFullChangelog() {
	if (allChangelogEntries.length > 0) {
		showChangelogModal(allChangelogEntries);
	}
}

function closeChangelogModal() {
	document.getElementById('changelog-modal').style.display = 'none';
}
