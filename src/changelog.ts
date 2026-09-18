import { marked } from 'marked'
import { querySelector } from './util'

let allChangelogEntries: ChangelogEntry[] = []

export let currentSiteVersion: number = -1

export async function checkChangelog()
{
	try
	{
		const response = await fetch('CHANGELOG.md')
		if (!response.ok) return
		const text = await response.text()

		const lines = text.split('\n')
		let currentEntry: ChangelogEntry = null!

		for (let i = 0; i < lines.length; i++)
		{
			let line = lines[i].trim()

			// Ignore the main # Changelog header
			if (line.startsWith('# ') && !line.startsWith('##')) continue

			// Check for new version blocks
			if (line.startsWith('### '))
			{
				// Parse date and version (e.g., "### Jul 13th 2026 v31")
				const headerMatch = /^###\s+(.+?)\s+(v[a-zA-Z0-9\.]+)\s*$/.exec(
					line
				)

				// Alert the developer if a header fails parsing formatting rules
				if (!headerMatch)
				{
					alert(
						`Changelog parsing error on line ${
							i + 1
						}:\n"${line}"\nExpected format: ### [Date] [vVersion]`
					)
					continue
				}

				if (currentEntry) allChangelogEntries.push(currentEntry)

				currentEntry = {
					date: headerMatch[1],
					version: headerMatch[2],
					rawContent: []
				}
			} else if (currentEntry)
			{
				currentEntry.rawContent.push(line)
			}
		}
		// Push the final entry
		if (currentEntry) allChangelogEntries.push(currentEntry)

		if (allChangelogEntries.length > 0)
		{
			const latestVersion = allChangelogEntries[0].version

			// Update the top right text
			const versionBtn = document.getElementById('version-display')
			if (versionBtn) versionBtn.innerText = latestVersion

			// Check for new updates since the user's last visit
			const lastSeenVersion = localStorage.getItem('lastSeenVersion')

			// Convert versions like "v32" or "v27.1" to actual numbers for safe comparison
			const latestNum = parseFloat(latestVersion.replace('v', ''))
			const lastSeenNum = lastSeenVersion ? parseFloat(lastSeenVersion.replace('v', '')) : 0

			currentSiteVersion = latestNum

			if (lastSeenNum < latestNum)
			{
				let newUpdates: ChangelogEntry[] = []
				for (let entry of allChangelogEntries)
				{
					const entryNum = parseFloat(entry.version.replace('v', ''))
					if (entryNum <= lastSeenNum) break
					newUpdates.push(entry)
				}

				let h = 'New Updates!'

				// If it's a first time visitor, only show the single most recent major update
				if (!lastSeenVersion)
				{
					newUpdates = [allChangelogEntries.find(e => !e.version.includes('.'))!]
					h = 'Latest Update'
				}

				showChangelogModal(
					newUpdates,
					h
				)
				localStorage.setItem('lastSeenVersion', latestVersion)
			}
		}
	} catch (e)
	{
		console.error('Error fetching changelog:', e)
	}
}

function showChangelogModal(entries: ChangelogEntry[], title = 'Update History')
{
	querySelector<HTMLHeadingElement>('#changelog-title').innerText = title

	let html = ''
	entries.forEach(entry =>
	{
		html += `<h3 class="cl-headers">
					${entry.version} 
					<span>${entry.date}</span>
				</h3>`
		html += marked.parse(entry.rawContent.join('\n'))
	})

	querySelector<HTMLDivElement>('#changelog-body').innerHTML = html
	querySelector<HTMLDivElement>('#changelog-modal').style.display = 'flex'
}

export function showFullChangelog()
{
	if (allChangelogEntries.length > 0) showChangelogModal(allChangelogEntries)
}

export function closeChangelogModal()
{
	querySelector<HTMLDivElement>('#changelog-modal').style.display = 'none'
}
