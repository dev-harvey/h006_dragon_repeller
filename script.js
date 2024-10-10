const healthPurchasePrice = 10;

const changeLocation = () => {

}

const generateStoreButtons = () => {

}

const generateCaveButtons = () => {

}

const fightMonster = () => {

}

const player = {
  xp: 10,
  maxHealth: 100,
  currentHealth: 100,
  inventory: [
    {
      itemId: 0,
      modifiers: {}
    }
  ],
}


// I have made this an array of objects so that it can be easily iterated over and filtered to allow for displaying in the shop view dynamically
const items = [
  {
    id: 0,
    name: "Stick",
    power: 5,
    price: 10
  },
  {
    id: 1,
    name: "Dagger",
    power: 30,
    price: 30
  },
  {
    id: 2,
    name: "Hatchet",
    power: 50,
    price: 50
  },
  {
    id: 3,
    name: "Sword",
    power: 100,
    price: 100
  }
]

// This is staying as an object because I want to use named identifiers and it's unlikely that I will need to iterate over it
const locations = {
  townSquare: {
    id: 0,
    name: "Town Square",
    buttons: [
      {
        text: "Go to store",
        onClick: changeLocation,
        onClickParameters: ["store"]
      },
      {
        text: "Go to cave",
        onClick: changeLocation,
        onClickParameters: ["cave"]
      },
      {
        text: "Fight dragon",
        onClick: changeLocation,
        onClickParameters: ["dragon"]
      },
    ],
    text: "You are in the town square. Use the buttons above to choose what to do next."
  },
  store: {
    id: 1,
    name: "Store",
    buttons: [
      {
        text: `Buy health (${healthPurchasePrice} gold)`,
        onClick: changeLocation,
        onClickParameters: ["townSquare"]
      },
      generateStoreButtons,
      {
        text: "Return to town",
        onClick: changeLocation,
        onClickParameters: ["townSquare"]
      }
    ],
    text: "Welcome to my store adventurer! Feel free to browse my wares, then purchase items using the buttons above."
  },
  cave: {
    id: 2,
    name: "Cave",
    buttons: [
      generateCaveButtons,
      {
        text: "Return to town",
        onClick: changeLocation,
        onClickParameters: ["townSquare"]
      }
    ],
    text: "You enter the cave. You see some monsters."
  },
  dragon: {
    id: 3,
    name: "Dragon's Lair",
    buttons: [
      {
        text: "I'm ready, let's fight!",
        onClick: fightMonster,
        onClickParameters: ["dragon"]
      },
      {
        text: "I'm not ready!",
        onClick: changeLocation,
        onClickParameters: ["townSquare"]
      }
    ],
    text: "A mighty dragon stands before you. Are you ready to slay it and save the town?"
  }
}