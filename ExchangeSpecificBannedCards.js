// Sample array of player-owned cards
var playerOwnedCards = [
  { id: 511001135, name: "Advanced Crystal Beast Amber Mammoth (Anime)", quantity: 1 },
  { id: 511001115, name: "Advanced Crystal Beast Amethyst Cat (Anime)", quantity: 1 },
  { id: 83965310, name: "Destiny HERO - Plasma", quantity: 1 },
  { id: 511001111, name: "Advanced Crystal Beast Cobalt Eagle (Anime)", quantity: 1 }
];

var exchangeableCards = {
  511001135: { name: "Advanced Crystal Beast Amber Mammoth (Anime)", exchangeVersionId: 18847598, exchangeVersionName: "Advanced Crystal Beast Amber Mammoth" },
  511001115: { name: "Advanced Crystal Beast Amethyst Cat (Anime)", exchangeVersionId: 19963185, exchangeVersionName: "Advanced Crystal Beast Amethyst Cat" },
  511001111: { name: "Advanced Crystal Beast Cobalt Eagle (Anime)", exchangeVersionId: 45236142, exchangeVersionName: "Advanced Crystal Beast Cobalt Eagle" },
  511001134: { name: "Advanced Crystal Beast Emerald Tortoise (Anime)", exchangeVersionId: 46358784, exchangeVersionName: "Advanced Crystal Beast Emerald Tortoise" },
  511001114: { name: "Advanced Crystal Beast Ruby Carbuncle (Anime)", exchangeVersionId: 83575471, exchangeVersionName: "Advanced Crystal Beast Ruby Carbuncle" },
  511001101: { name: "Advanced Crystal Beast Sapphire Pegasus (Anime)", exchangeVersionId: 71620241, exchangeVersionName: "Advanced Crystal Beast Sapphire Pegasus" },
  511001148: { name: "Advanced Crystal Beast Topaz Tiger (Anime)", exchangeVersionId: 72843899, exchangeVersionName: "Advanced Crystal Beast Topaz Tiger" },
  44968687: { name: "The Legendary Fisherman III", exchangeVersionId: 511001489, exchangeVersionName: "The Legendary Fisherman III (Anime)" },
  511000993: { name: "ZS - Ouroboros Sage (Anime)", exchangeVersionId: 32281491, exchangeVersionName: "ZS - Ouroboros Sage" },
  511001149: { name: "Card of Demise (Anime)", exchangeVersionId: 59750328, exchangeVersionName: "Card of Demise" },
  511002601: { name: "Hand Destruction (Anime)", exchangeVersionId: 74519184, exchangeVersionName: "Hand Destruction" },
  500000147: { name: "Ecole de Zone (VG)", exchangeVersionId: 60514625, exchangeVersionName: "Ecole de Zone" },
  40450317: { name: "Ties of the Brethren", exchangeVersionId: 100000478, exchangeVersionName: "Ties of the Brethren (Anime)" },
  511002050: { name: "Lord of the Red (Anime)", exchangeVersionId: 19025379, exchangeVersionName: "Lord of the Red" },
  83965310: { name: "Destiny HERO - Plasma", exchangeVersionId: 511000614, exchangeVersionName: "Destiny HERO - Bloo-D (Anime)" },
  511000218: { name: "Dragged Down into the Grave (Anime)", exchangeVersionId: 16435215, exchangeVersionName: "Dragged Down Into the Grave" },
  511013015: { name: "Photon Veil (Anime)", exchangeVersionId: 9354555, exchangeVersionName: "Photon Veil" },
  833396948: { name: "Exodia the Forbidden One (DMVR)", exchangeVersionId: 33396948, exchangeVersionName: "Exodia the Forbidden One" },
  811001508: { name: "Majestic Radiant Dragon", exchangeVersionId: 291414, exchangeVersionName: "Converging Wills Dragon" },
  825833572: { name: "Gate Guardian (Ritual)", exchangeVersionId: 25833572, exchangeVersionName: "Gate Guardian" },
  66516793: { name: "Serpent Night Dragon (Ritual)", exchangeVersionId: 66516792, exchangeVersionName: "Serpent Night Dragon" },
  100000270: { name: "D - Force (Anime)", exchangeVersionId: 6186304, exchangeVersionName: "D - Force" }
};

// Function to display exchangeable cards
function displayExchangeableCards() {
  const output = document.getElementById("output");
  output.innerHTML = "";

  // Filter the playerOwnedCards to find exchangeable cards and sort them alphabetically
  const exchangeable = playerOwnedCards
    .filter(card => exchangeableCards[card.id])
    .sort((a, b) => a.name.localeCompare(b.name));

  if (exchangeable.length === 0) {
    output.innerHTML = "No exchangeable cards available.";
    return;
  }

  // Display the exchangeable cards with buttons to exchange each card
  exchangeable.forEach(card => {
    const exchangeInfo = exchangeableCards[card.id];
    const exchangeVersionId = exchangeInfo.exchangeVersionId;
    const exchangeVersionName = exchangeInfo.exchangeVersionName;

    const cardElement = document.createElement('div');
    cardElement.classList.add('card-item', 'd-flex', 'justify-content-between', 'align-items-center');
    cardElement.innerHTML = `
      <span>${card.name}</span>
      <button class="btn btn-sm exchange-btn" onclick="exchangeSpecificCard(${card.id}, ${exchangeVersionId}, '${exchangeVersionName.replace(/'/g, "\\'")}')">
        Exchange
      </button>
    `;
    output.appendChild(cardElement);
  });
}

// Function to exchange a specific card
function exchangeSpecificCard(cardId, exchangeVersionId, exchangeVersionName) {
  // Remove one quantity of the card being exchanged
  const cardIndex = playerOwnedCards.findIndex(card => card.id === cardId);
  if (cardIndex !== -1) {
    if (playerOwnedCards[cardIndex].quantity > 1) {
      playerOwnedCards[cardIndex].quantity -= 1;
    } else {
      playerOwnedCards.splice(cardIndex, 1); // Remove the card if quantity is 1
    }
  }

  // Add the new card to the player's collection
  const existingCardIndex = playerOwnedCards.findIndex(card => card.id === exchangeVersionId);
  if (existingCardIndex !== -1) {
    playerOwnedCards[existingCardIndex].quantity += 1;
  } else {
    playerOwnedCards.push({ id: exchangeVersionId, name: exchangeVersionName, quantity: 1 });
  }

  alert(`Exchanged "${exchangeableCards[cardId].name}" for "${exchangeVersionName}".`);
  displayExchangeableCards();
}

// Initial function call to display exchangeable cards when the page loads
displayExchangeableCards();
