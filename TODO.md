# TODO list

<!--- Resuable snippets 
- [ ] XXX
---> 

- [x] Create project files
- [x] Create inital TODO List 
- [x] First Git Commit
- [x] Create basic styles and markup
  - [x] Centered responsive container
  - [x] XP, Health and Gold indicators
  - [x] Interaction buttons, would like a variable number
  - [x] Text area for exposition and instructions
- [x] Commit to Git
- [x] Plan JS functionality and expand TODO list
- [x] Create initial player object
- [x] Create initial monsters object
- [x] Create initial locations object
- [x] Plan next steps
- [x] Commit to Git
- [X] Build changeLocation function
  - [X] Clear buttons and text
  - [X] Generate buttons and populate text from object 
- [X] Hook up the ability to go from the town square to the store and back
- [X] Build generateButtons functions
- [ ] Add buying health functionality
  - [ ] For now just use health, maxHealth is a potential future improvement
  - [ ] Make sure you handle errors such as not having enough gold.
  - [ ] Practice writing user tests
- [ ] Build updateUI function to display stats from player object and call when buying health to display updated gold and health
- [ ] Add buying items functionality
  - [ ] Make sure to include error handling for outliers such as buying weapons you already own.
  - [ ] Practice writing user tests
- [ ] Add check when generating store buttons to exclude any items you already own

### TODO Later

- [ ] Combat
- [ ] XP gain and levels
- [ ] Dragon bossfight
- [ ] Rework health system to be health and max health
- [ ] Inventory and shop improvements
  - [ ] View full inventory
  - [ ] Choose weapon
  - [ ] View weapon stats
  - [ ] Sell weapons? Not sure this is needed really
  - [ ] Add custom purchase messages for special weapons

## Notes

Use event delegation for the dynamic buttons. Use data-attributes on html elements to define button behaivour.

I think XP can correspond to level and display level in item bar

I'd like the store to give the option to buy specific weapons rather than just incrementing the weapons.
Certain monsters could be locked behind certain levels to allow for progression.
Killing a certain amount of monsters with a weapon could grant a buff to that weapon.
Potentially add weapon durability system.

## Game functionality

Players can:
- Visit the store
- Fight monsters in the cave
- Fight the dragon

Core gameplay loop is fight monsters to gain XP and Gold and return to store to improve health and weapons. Eventually build up enough strength to slay dragon.