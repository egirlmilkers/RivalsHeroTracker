# Changelog

### Jul 14th 2026 v29
#### ✏️ Tweaks
- You can now close modals by clicking outside of them
#### 🧼 Fixes
- Fixed pop-up loop for new update display system
- Made update numbers more clear
- Fixed the display of modal closing buttons

### Jul 13th 2026 v28
#### 🩷 Features
- Added the ability to pin heroes to the top of the list
- Added this exact changelog
- A pop-up will come up if an update happened since your last visit

### Jul 11th 2026 v27.1
#### 🧼 Fixes
- Fixed a bug that never showed itself when I was testing the previous update

### Jul 11th 2026 v27
#### 🩷 Features
- Added metadata to all heroes to allow for proper positioning of Champion icons inside the display boxes
> <small>Champion icons have vastly different focus points, some might be in the upper right of the sprite while others could be anywhere else. So, I had to manually set offset parameters for each hero for when the site needs to display their Champion icons.</small>

### Jul 11th 2026 v26
#### ✏️ Tweaks
- All Champion icons have changed to generated animations from the official spritesheets ripped from the game
#### 🧼 Fixes
- More minor roulette metadata fixes

### Jul 9th 2026 v25
#### 🩷 Features
- Added Jubilee

### Jul 5th 2026 v24
#### ✏️ Tweaks
- Moved all roulette code to a separate file
#### 🧼 Fixes
- Added and fixed metadata to generated roulette wheels (i think they changed how the site reads wheel files)
- Now compresses hero icons even more--when generating a roulette wheel--to fit WheelofNames' standards

### Jul 5th 2026 v23
#### 🩷 Features
- Added image generation
> <small>Allows you to generate an image of the proficiency of your top 5 heroes, similar to the display on the site.</small>
#### ✏️ Tweaks
- Changed how site may re-render the list

### Jul 5th 2026 v22.1
#### 🧼 Fixes
- Added 'GotG' group tag to Adam Warlock

### Jul 5th 2026 v22
#### ✏️ Tweaks
- All hero colors changed to official colors from marvelrivals.com/heroes
- All tags updated to include heroes' alternate names, site color, and some groups like 'F4', 'GotG', and 'mutants'.

### Jul 4th 2026 v21
#### ✏️ Tweaks
- More styling updates (mainly for the settings button)

### Jul 4th 2026 v20
#### 🩷 Features
- Added Lady Loki icons
- Added setting `Lady Loki instead of Loki`
#### ✏️ Tweaks
- Renamed `Show Hulk instead of Banner` to `Hulk instead of Banner`
- Updated wheel to spin over the course of 5 seconds rather than 10
#### 🧼 Fixes
- Allowed sort button to be toggled back and fourth

### Jul 4th 2026 v19
#### 🩷 Features
- Added Cyclops' Champion icon
- Added Hulk's Champion icon
- Added a settings dialog that allows personalizing the site (`Show Hulk instead of Banner` and `Always Sort By Proficiency`)
- Added a tag system that allows searching for pre-defined tags

### Jun 12th 2026 v18
#### 🩷 Features
- Added Cyclops (no Champion icon)
- Added Devil Dinosaur's Champion icon

### May 16th 2026 v17
#### ✏️ Tweaks
- Scaled up the display of Champion icons
#### 🧼 Fixes
- Fixed the names in my character database to be actually accurate

### May 16th 2026 v16
#### ✏️ Tweaks
- Wheel generation now compresses all icon images so WheelofNames doesn't complain about large file sizes
#### 🧼 Fixes
- Added hero icon fallbacks. If an icon doesn't exist for the site to grab, it will fallback to previous ones

### May 16th 2026 v15
#### 🩷 Features
- Added Devil Dinosaur
- Added Champion icons for everyone (other than Devil Dinosaur)
- Added Champion icon rendering if a character is level 50+
#### ✏️ Tweaks
- Renamed credits

### Apr 17th 2026 v14
#### 🩷 Features
- Added Black Cat

### Mar 21st 2026 v13
#### 🩷 Features
- Updated mobile styling to actually be good

### Mar 21st 2026 v12
#### 🩷 Features
- Added White Fox

### Feb 24th 2026 v11.1
#### 🧼 Fixes
- Fixed leveling data being defined in a way that messes up the sites system

### Feb 24th 2026 v11
#### 🩷 Features
- Added data migration & backup loading pop-up so you can review what is going to change

### Feb 19th 2026 v10.1
#### 🧼 Fixes
- Changed from rank dropdown to manual level input because it didn't make any sense at all with the new system

### Feb 19th 2026 v10
#### 🩷 Features
- Added a page at rivals.ladyofpa.in/wheel that just embeds my WheelofNames wheel
#### 🧼 Fixes
- Fixed wheel generation to reverse the order of the list so it displays correctly

### Feb 19th 2026 v9.1
#### 🧼 Fixes
- Added extra data to the generated wheel to allow updating my existing wheel

### Feb 19th 2026 v9
#### 🩷 Features
- Added a hidden function for me to generate a roulette wheel to update my Rivals wheel on WheelofNames.com. This is so I don't have to update two different things separately and manually calculate weights

### Feb 18th 2026 v8
#### 🩷 Features
- Overhauled entire proficiency system to reflect the updated Rivals system
- Added Deadpool
- Added Elsa Bloodstone
- Changed all badge icons to reflect update
- Added colors for all the new proficiencies

### Dec 15th 2025 v7.2
#### 🧼 Fixes
- Updated the other Jeff avatar filename as well.

### Dec 15th 2025 v7.1
#### 🧼 Fixes
- `JefftheLandShark` file renamed to `JeffTheLandShark`

### Dec 15th 2025 v7
#### 🩷 Features
- Added the ability to search and filter by role

### Dec 15th 2025 v6
#### ✏️ Tweaks
- Polished the number-input boxes both logically and stylistically

### Dec 15th 2025 v5
#### ✏️ Tweaks
- Another style update
- Colors changed to swatches from the official mastery badges

### Dec 15th 2025 v4
#### 🩷 Features
- Added bar for how close you are to achieving Lord
> Basically I had a manual map to the file names but now it just cleans up a hero's name like `Cloak and Dagger` -> `CloakandDagger` or `Spider-Man` -> `SpiderMan`
- Re-added separate Hulk images
- Added Rogue Lord icon
#### ✏️ Tweaks
- Fixed how the site grabbed avatar images
- Split logic and styles into separate files
- Style update
#### Renames
- `Cloak&Dagger` -> `CloakandDagger`
- `Spider-Man` -> `SpiderMan`
- `Star-Lord` -> `StarLord`

### Dec 15th 2025 v3
#### 🩷 Features
- Added bar for how close you are to achieving Lord
#### ✏️ Tweaks
- Renamed `Hulk` files to `BruceBanner`

### Dec 15th 2025 v2
- Added total proficiency progress bars

### Dec 15th 2025 v1
- Initial release