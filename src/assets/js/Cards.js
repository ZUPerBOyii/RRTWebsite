async function fetchCardsData() {
    try {
        const response = await fetch('assets/json/cards.json'); // Adjust the path to your JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const cardsData = await response.json();
        displayCards(cardsData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayCards(cardsData) {
    const container = document.getElementById('cards-container');

    for (const kingdom in cardsData) {
        for (const cardName in cardsData[kingdom]) {
            const card = cardsData[kingdom][cardName];
            const cardElement = document.createElement('div');
            cardElement.className = 'card';

            const imgElement = document.createElement('img');
            imgElement.src = card['Image Link'];
            cardElement.appendChild(imgElement);

            const contentElement = document.createElement('div');
            contentElement.className = 'card-content';

            const titleElement = document.createElement('h3');
            titleElement.className = 'card-title';
            titleElement.textContent = cardName;
            contentElement.appendChild(titleElement);

            const rarityElement = document.createElement('p');
            rarityElement.className = 'card-rarity';
            rarityElement.textContent = `Rarity: ${card.Rarity}`;
            contentElement.appendChild(rarityElement);

            cardElement.appendChild(contentElement);
            container.appendChild(cardElement);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCardsData();
});