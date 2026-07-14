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
			const lastSeenVersion = localStorage.getItem(
				'lastSeenVersion',
			);

			if (lastSeenVersion !== latestVersion) {
				let newUpdates = [];
				for (let entry of allChangelogEntries) {
					if (entry.version === lastSeenVersion) break;
					newUpdates.push(entry);
				}

				// If it's a first time visitor, only show the single most recent update
				if (!lastSeenVersion) {
					newUpdates = [allChangelogEntries[0]];
				}

				showChangelogModal(newUpdates, 'New updates since your last visit!');
				localStorage.setItem('lastSeenVersion', latestVersion);
			}
		}
	} catch (e) {
		console.error('Error fetching changelog:', e);
	}
}

// function renderMarkdown(lines) {
// 	let html = '';
// 	let inList = false;

// 	for (let line of lines) {
// 		line = line.trim();
// 		if (!line) continue;

// 		if (line.startsWith('#### ')) {
// 			if (inList) {
// 				html += '</ul>';
// 				inList = false;
// 			}
// 			html += `<h4 style="margin-top: 20px; margin-bottom: 5px; color: #eee; font-size: 1.1em;">${line.substring(5)}</h4>`;
// 		} else if (line.startsWith('- ')) {
// 			if (!inList) {
// 				html += '<ul>';
// 				inList = true;
// 			}
// 			html += `<li>${line.substring(2)}</li>`;
// 		} else if (line.startsWith('> ')) {
// 			if (inList) {
// 				html += '</ul>';
// 				inList = false;
// 			}
// 			html += `<blockquote>${line.substring(2)}</blockquote>`;
// 		} else {
// 			// Catch-all for basic HTML like <small> or plain text
// 			if (inList) {
// 				html += '</ul>';
// 				inList = false;
// 			}
// 			html += `<div style="color: #aaa; margin-top: 5px;">${line}</div>`;
// 		}
// 	}
// 	if (inList) html += '</ul>';
// 	return html;
// }

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
	renderMarkdown();
}

function showFullChangelog() {
	if (allChangelogEntries.length > 0) {
		showChangelogModal(allChangelogEntries);
	}
}

function closeChangelogModal() {
	document.getElementById('changelog-modal').style.display = 'none';
}
