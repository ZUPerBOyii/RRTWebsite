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
            imgElement.dataset.src = card['Image Link'];
            imgElement.className = 'lazy';
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
    lazyLoadImages();
}

function lazyLoadImages() {
    const lazyImages = document.querySelectorAll('img.lazy');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        observer.observe(img);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCardsData();
});