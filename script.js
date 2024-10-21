const healthPurchasePrice = 10;
const interactionContainer = document.querySelector('.interaction-container');
const textArea = document.querySelector(".text-area");

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

const fightMonster = (id) => {
  console.log(`fight ${id}`);
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
  player.gold -= thisItem.price
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
    name: "Slime"
  },
  {
    id: 1,
    name: "Wolf"
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
        onClickParameters: ["dragon"]
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
  }
}

const init = () => {
  changeLocation('welcome');
  updatePlayerStats();
}


document.addEventListener('DOMContentLoaded', (event) => {
  init();
});