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
- [X] Add buying health functionality
  - [X] For now just use health, maxHealth is a potential future improvement
  - [X] Make sure you handle errors such as not having enough gold.
- [X] Build updateUI function to display stats from player object and call when buying health to display updated gold and health
- [X] Add buying items functionality
  - [X] Make sure to include error handling for outliers such as buying weapons you already own.
- [X] Add check when generating store buttons to exclude any items you already own
- [X] Combat
  - [X] New combat location? Button generation for the fighting screen
  - [X] Attack function
  - [X] Monster attack function
  - [X] Run away function
  - [X] XP and gold gain functions
  - [X] New location for end of battle
- [X] Dragon bossfight

### TODO Later

- [ ] Levels instead of just XP
- [ ] Rework health system to be health and max health
- [ ] Inventory and shop improvements
  - [ ] View full inventory
  - [ ] Choose weapon
  - [ ] View weapon stats
  - [ ] Sell weapons? Not sure this is needed really
  - [ ] Add custom purchase messages for special weapons

## Notes

Use event delegation for the dynamic buttons. Use data-attributes on html elements to define button behaivour. <- instead of doing this I created the event handlers when I generate the button in the JS to avoid the issue of having the HTML markup affect the JS.

I think XP can correspond to level and display level in item bar.

Certain monsters could be locked behind certain levels to allow for progression.
Killing a certain amount of monsters with a weapon could grant a buff to that weapon.
Potentially add weapon durability system.

## Game functionality

Players can:
- Visit the store
- Fight monsters in the cave
- Fight the dragon

Core gameplay loop is fight monsters to gain XP and Gold and return to store to improve health and weapons. Eventually build up enough strength to slay dragon.