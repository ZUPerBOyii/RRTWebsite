let deck = [];
let totalCardsInDeck = 0;
let cardsData = [];
let currentPage = 1;
const cardsPerPage = 10;
let currentFilter = 'All';

async function fetchCardsData() {
    try {
        const response = await fetch('assets/json/cards.json'); // Adjust the path to your JSON file
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        cardsData = await response.json();
        displayCards();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

function displayCards() {
    const container = document.getElementById('cards-container');
    if (!container) {
        console.error('cards-container element not found');
        return;
    }
    container.innerHTML = ''; // Clear previous cards

    const filteredCards = filterCardsData();
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    const cardsToDisplay = filteredCards.slice(startIndex, endIndex);

    cardsToDisplay.forEach(([kingdom, cards]) => {
        Object.entries(cards).forEach(([cardName, card]) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.kingdom = kingdom;
            cardElement.dataset.rarity = card.Rarity;
            cardElement.dataset.cardName = cardName;

            const imgElement = document.createElement('img');
            imgElement.src = card['Image Link'];
            cardElement.appendChild(imgElement);

            const plusIcon = document.createElement('i');
            plusIcon.className = 'fas fa-plus plus-icon';
            plusIcon.addEventListener('click', () => addToDeck(cardName, card));
            cardElement.appendChild(plusIcon);

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

            // Add click event listener to the card
            cardElement.addEventListener('click', () => {
                showModal(card['Image Link'], cardName, card.Rarity, kingdom);
            });
        });
    });

    lazyLoadImages();
    updatePaginationButtons(filteredCards.length);
}

function addToDeck(cardName, card) {
    if (deck.length >= 50) {
        alert('Deck cannot have more than 50 cards.');
        return;
    }
    const existingCard = deck.find(item => item.name === cardName);
    if (existingCard) {
        existingCard.count++;
    } else {
        deck.push({ name: cardName, ...card, count: 1 });
    }
    totalCardsInDeck++;
    updateDeckUI();
}

function updateDeckUI() {
    const deckCountElement = document.getElementById('deck-count');
    deckCountElement.textContent = `${totalCardsInDeck} cards`;

    const deckList = document.getElementById('deck-list');
    deckList.innerHTML = '';
    deck.forEach(card => {
        const listItem = document.createElement('li');
        listItem.textContent = `${card.name} (x${card.count})`;
        deckList.appendChild(listItem);
    });
}

function downloadDeck() {
    const deckData = JSON.stringify(deck, null, 2);
    const blob = new Blob([deckData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deck.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function filterCardsData() {
    if (currentFilter === 'All') {
        return Object.entries(cardsData);
    }
    return Object.entries(cardsData).filter(([kingdom]) => kingdom === currentFilter);
}

function filterCards(kingdom) {
    currentFilter = kingdom;
    currentPage = 1; // Reset to the first page
    displayCards();
    updateActiveButton(kingdom);
}

function updateActiveButton(kingdom) {
    const buttons = document.querySelectorAll('#filter-buttons button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = document.querySelector(`#filter-buttons button[data-kingdom="${kingdom}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function showModal(imageSrc, cardName, rarity, kingdom) {
    const modal = document.getElementById('card-modal');
    const modalImg = document.getElementById('modal-card-image');
    const modalTitle = document.getElementById('modal-card-title');
    const modalRarity = document.getElementById('modal-card-rarity');
    const modalKingdom = document.getElementById('modal-card-kingdom');

    modalImg.src = imageSrc;
    modalTitle.textContent = cardName;
    modalRarity.textContent = `Rarity: ${rarity}`;
    modalKingdom.textContent = `Kingdom: ${kingdom}`;

    modal.style.display = 'block';

    // Close the modal when the user clicks on <span> (x)
    const span = document.getElementsByClassName('close')[0];
    span.onclick = function() {
        modal.style.display = 'none';
    };

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
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

function updatePaginationButtons(totalCards) {
    const totalPages = Math.ceil(totalCards / cardsPerPage);
    const paginationContainer = document.getElementById('pagination-container');
    paginationContainer.innerHTML = '';

    if (currentPage > 1) {
        const prevButton = document.createElement('button');
        prevButton.textContent = 'Previous';
        prevButton.onclick = () => {
            currentPage--;
            displayCards();
        };
        paginationContainer.appendChild(prevButton);
    }

    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = 'Next';
        nextButton.onclick = () => {
            currentPage++;
            displayCards();
        };
        paginationContainer.appendChild(nextButton);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchCardsData();
    document.getElementById('download-deck').addEventListener('click', downloadDeck);

    // Add event listeners for filter buttons
    document.getElementById('filter-all').addEventListener('click', () => filterCards('All'));
    document.getElementById('filter-kingdom1').addEventListener('click', () => filterCards('R\'Oth Vilgmeri'));
    document.getElementById('filter-kingdom2').addEventListener('click', () => filterCards('Gilded Juval'));
    document.getElementById('filter-kingdom3').addEventListener('click', () => filterCards('High Valomor'));
    document.getElementById('filter-kingdom4').addEventListener('click', () => filterCards('Ervenia'));
    document.getElementById('filter-kingdom5').addEventListener('click', () => filterCards('Farlands'));

    const deckButton = document.getElementById('deck-button');
    const deckModal = document.getElementById('deck-modal');
    const closeModal = document.querySelector('#deck-modal .close');

    deckButton.addEventListener('click', () => {
        deckModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        deckModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === deckModal) {
            deckModal.style.display = 'none';
        }
    });
});