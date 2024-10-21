const healthPurchasePrice = 10;
const interactionContainer = document.querySelector('.interaction-container');
const textArea = document.querySelector(".text-area");

const init = () => {
  changeLocation('welcome');
  setPlayerStats();
  updatePlayerStats();
}

const updateTextArea = (tag, text) => {
  textArea.innerHTML = "";
  const textElement = document.createElement(tag);
  textElement.textContent = text;
  textArea.appendChild(textElement);
}

const changeLocation = (newLocation) => {
  if (newLocation === undefined) {
    newLocation = 'error';
  } else if (locations[newLocation] === undefined) {
    newLocation = 'error';
  }
  updateTextArea("p", locations[newLocation].text);

  interactionContainer.innerHTML = "";

  locations[newLocation].buttons.forEach(button => {
    if (typeof button == 'function') {
      button();
    } else {
      const buttonContainerElement = document.createElement('div');
      buttonContainerElement.classList.add('btn-container');
      interactionContainer.appendChild(buttonContainerElement);

      const buttonElement = document.createElement('button');
      buttonElement.textContent = button.text;
      buttonElement.classList.add('interaction-btn');
      buttonElement.addEventListener('click', (event) => {
        if (button.onClickParameters === undefined) {
          button.onClick(event);
        } else if (Array.isArray(button.onClickParameters))  {
          button.onClick(...button.onClickParameters,event);
        } else {
          button.onClick(button.onClickParameters,event);
        }
      });
      buttonContainerElement.appendChild(buttonElement);
    }
  });
}

const generateStoreButtons = () => {
  items.forEach(item => {
    if (player.inventory.some(inventory_slot => inventory_slot.itemId == item.id)) {
      return;
    }
    const buttonContainerElement = document.createElement('div');
    buttonContainerElement.classList.add('btn-container');
    interactionContainer.appendChild(buttonContainerElement);

    const buttonElement = document.createElement('button');
    buttonElement.textContent = `Buy ${item.name} (${item.price} gold)`;
    buttonElement.classList.add('interaction-btn');
    buttonElement.addEventListener('click', (event) => {
      buyItem(item.id,event);
    });
    buttonContainerElement.appendChild(buttonElement);
  });
}

const generateCaveButtons = () => {
  monsters.forEach(monster => {
    if (monster.id === 2) {
      return;
    }
    const buttonContainerElement = document.createElement('div');
    buttonContainerElement.classList.add('btn-container');
    interactionContainer.appendChild(buttonContainerElement);

    const buttonElement = document.createElement('button');
    buttonElement.textContent = `Fight ${monster.name}`;
    buttonElement.classList.add('interaction-btn');
    buttonElement.addEventListener('click', () => {
      fightMonster(monster.id);
    });

    buttonContainerElement.appendChild(buttonElement);
  });
}

const fightMonster = (monsterId) => {
  battlingMonster = { ...monsters[monsterId]};
  changeLocation('battle');
  updateTextArea("p", `You are facing off against a ${battlingMonster.name}. What would you like to do?`);
}

const randomizeWithinRange = (value) => {
  return Math.round(value * ((Math.random()/2) + 0.75));
}

const playerAttackMonster = () => {
  // This is a workaround for now, it gets the most recently purchased item. In future, with more time, players will be able to select their active weapon
  const playerPower = items[player.inventory.at(-1).itemId].power;
  playerAttackValue = randomizeWithinRange(playerPower);
  battlingMonster.health -= playerAttackValue;
  if (battlingMonster.health <= 0) {
    if (battlingMonster.id == 2) {
      changeLocation("victory");
      return;
    }
    const xpGain = randomizeWithinRange(battlingMonster.xpReward);
    const goldGain = randomizeWithinRange(battlingMonster.goldReward);
    player.xp += xpGain;
    player.gold += goldGain;
    updatePlayerStats();
    changeLocation('battleVictory');
    updateTextArea("p", `You deal ${playerAttackValue} damage, the ${battlingMonster.name} lays dead at your feet. You have won! You gained ${xpGain} xp and ${goldGain} gold. What would you like to do next?`);
    return;
  }
  monsterAttackValue =randomizeWithinRange(battlingMonster.power);
  player.currentHealth -= monsterAttackValue;
  if (player.currentHealth <= 0) {
    player.currentHealth = 0;
    updatePlayerStats();
    changeLocation('defeat');
    return;
  }
  updateTextArea("p", `You deal ${playerAttackValue} damage, the ${battlingMonster.name} has ${battlingMonster.health} health remaining. In return, it hits your for ${monsterAttackValue} damage. What would you like to do next?`);
  updatePlayerStats();
}

const buyItem = (id, event) => {
  const thisItem = items[id];
  if (player.inventory.some(inventory_slot => inventory_slot.itemId == id )) {
    updateTextArea("p", "It seems you already own this item adventurer! I've removed it from the list for you. Would you like to purchase anything else?");
    event.target.parentElement.style.display = "none";
    return;
  }
  if (player.gold < thisItem.price) {
    updateTextArea("p", "It seems you can't afford this item adventurer! Perhaps something else might be to your liking instead?");
    event.target.classList.add('disabled');
    return;
  }
  player.gold -= thisItem.price;
  player.inventory.push({
    itemId: thisItem.id
  });
  updateTextArea("p", `Thank you for purchasing the ${thisItem.name}. Is there anything else I can help you with?`);
  updatePlayerStats();
  event.target.parentElement.style.display = "none";
}

const buyHealth = (event) => {
  if (player.gold >= 10) {
    player.currentHealth += 10;
    player.gold -= 10;
    updatePlayerStats();
  } else {
    updateTextArea("p", "You don't have enough gold to buy health! Go and fight some monsters to get more.");
    event.target.classList.add('disabled');
  }
}

const updatePlayerStats = () => {
  // const levelTextElement = document.querySelector("#level-text");
  const xpTextElement = document.querySelector("#xp-text");
  const healthTextElement = document.querySelector("#health-text");
  const goldTextElement = document.querySelector("#gold-text");

  // levelTextElement.innerHTML = player.level;
  xpTextElement.innerHTML = player.xp;
  healthTextElement.innerHTML = player.currentHealth;
  goldTextElement.innerHTML = player.gold;

}

const setPlayerStats = () => {
  player.xp = 10;
  player.maxHealth = 100;
  player.currentHealth = 100;
  player.gold = 50;
  player.inventory = [{itemId: 0}];
}

const player = {
  xp: 10,
  maxHealth: 100,
  currentHealth: 100,
  gold: 50,
  inventory: [
    {
      itemId: 0
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

const monsters = [
  {
    id: 0,
    name: "Slime",
    health: 10,
    power: 20,
    goldReward: 10,
    xpReward: 10
  },
  {
    id: 1,
    name: "Wolf",
    health: 50,
    power: 50,
    goldReward: 50,
    xpReward: 50
  },
  {
    id: 2,
    name: "Dragon",
    health: 500,
    power: 100,
    goldReward: 1000,
    xpReward: 1000
  }
]

let battlingMonster = {};

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
        onClick: buyHealth
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
        onClickParameters: [2]
      },
      {
        text: "I'm not ready!",
        onClick: changeLocation,
        onClickParameters: ["townSquare"]
      }
    ],
    text: "A mighty dragon stands before you. Are you ready to slay it and save the town?"
  },
  welcome: {
    id: 4,
    name: "Welcome",
    buttons: [
      {
        text: "Begin game",
        onClick: changeLocation,
        onClickParameters: ["townSquare"]
      }
    ],
    text: "Welcome to Dragon Repeller. You must defeat the dragon that is preventing people from leaving the town. You are in the town square. Press the button above to begin."
  },
  error: {
    id: 5,
    name: "Error",
    buttons: [
      {
        text: "Go to town square",
        onClick: changeLocation,
        onClickParameters: ["townSquare"]
      }
    ],
    text: "Something's gone wrong, you shouldn't be here!"
  },
  battle: {
    id: 6,
    name: "Battle",
    buttons: [
      {
        text: "Attack monster",
        onClick: playerAttackMonster
      },
      {
        text: "Run away",
        onClick: changeLocation,
        onClickParameters: ["cave"]
      }
    ]
  },
  battleVictory: {
    id: 7,
    name: "Battle Victory",
    buttons: [
      {
        text: "Go to cave",
        onClick: changeLocation,
        onClickParameters: ["cave"]
      },
      {
        text: "Go to town square",
        onClick: changeLocation,
        onClickParameters: ["townSquare"]
      }
    ]
  },
  defeat: {
    id: 8,
    name: "Defeat",
    buttons: [
      {
        text: "Play again",
        onClick: init
      }
    ],
    text: "You have perished! It was a good try but the townspeople are now surely doomed."
  },
  victory: {
    id: 9,
    name: "Victory",
    buttons: [
      {
        text: "Play again",
        onClick: init
      }
    ],
    text: "You have completed the game and saved the town! The townspeople will be forever grateful!"
  }
}

document.addEventListener('DOMContentLoaded', (event) => {
  init();
});