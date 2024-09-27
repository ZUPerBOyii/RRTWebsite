let cardsData = [];
let tempDeck = [];
let currentPage = 1;
const cardsPerPage = 10;
let currentFilter = 'All';
let userDeck = {};
let isTempDeckInitialized = false;

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

function initializeTempDeck() {
    // Initialize the tempDeck with the full deck or filtered deck
    tempDeck = [];
    for (const [cardName, cardData] of Object.entries(userDeck)) {
        for (let i = 0; i < cardData.quantity; i++) {
            tempDeck.push({ name: cardName, ...cardData });
        }
    }
    shuffleDeck(tempDeck);
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}


function drawRandomCardFromDeck() {
    if (!isTempDeckInitialized) {
        initializeTempDeck();
        isTempDeckInitialized = true;
    }

    if (tempDeck.length === 0) {
        console.log('No more cards in the deck');
        displayNoMoreCardsMessage();
        return;
    }

    const randomIndex = Math.floor(Math.random() * tempDeck.length);
    const drawnCard = tempDeck[randomIndex];

    // Reduce the quantity of the drawn card by 1
    if (drawnCard.quantity > 1) {
        drawnCard.quantity--;
    } else {
        tempDeck.splice(randomIndex, 1); // Remove the card if quantity is 1
    }

    displayDrawnCard(drawnCard.name, drawnCard);
}

function displayDrawnCard(cardName, card) {

    const drawContainer = document.getElementById('draw-container');
    if (!drawContainer) {
        console.error('draw-container element not found');
        return;
    }

    drawContainer.innerHTML = ''; // Clear previous card

    const cardElement = document.createElement('div');
    cardElement.className = 'drawn-card';

    const imgElement = document.createElement('img');
    imgElement.src = card.imageSrc;
    imgElement.className = 'drawn-card-image'; // Add class for styling
    cardElement.appendChild(imgElement);

    const titleElement = document.createElement('h3');
    titleElement.className = 'drawn-card-title';
    titleElement.textContent = cardName;
    cardElement.appendChild(titleElement);

    const quantityElement = document.createElement('p');
    quantityElement.className = 'drawn-card-quantity';
    quantityElement.textContent = `Quantity: ${card.quantity}`;
    cardElement.appendChild(quantityElement);

    drawContainer.appendChild(cardElement);

    // Add Next Card button if there are more cards in the deck
    if (tempDeck.length > 0) {
        const nextCardButton = document.createElement('button');
        nextCardButton.textContent = 'Next Card';
        nextCardButton.onclick = drawRandomCardFromDeck;
        drawContainer.appendChild(nextCardButton);
    } else {
        const noMoreCardsMessage = document.createElement('p');
        noMoreCardsMessage.textContent = 'No more cards in the deck';
        drawContainer.appendChild(noMoreCardsMessage);

        const redrawButton = document.createElement('button');
        redrawButton.textContent = 'Redraw';
        redrawButton.onclick = () => {
            initializeTempDeck();
            drawRandomCardFromDeck();
        };
        drawContainer.appendChild(redrawButton);
    }
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.addEventListener('click', () => {
        initializeTempDeck();
        drawRandomCardFromDeck();
    });
    drawContainer.appendChild(restartButton);
}



function displayNoMoreCardsMessage() {
    const drawContainer = document.getElementById('draw-container');
    if (!drawContainer) {
        console.error('draw-container element not found');
        return;
    }

    drawContainer.innerHTML = ''; // Clear previous card

    const noMoreCardsMessage = document.createElement('p');
    noMoreCardsMessage.textContent = 'No more cards in the deck';
    drawContainer.appendChild(noMoreCardsMessage);

    const redrawButton = document.createElement('button');
    redrawButton.textContent = 'Redraw';
    redrawButton.onclick = () => {
        initializeTempDeck();
        drawRandomCardFromDeck();
    };
    drawContainer.appendChild(redrawButton);

    // Add Restart button to shuffle and draw again
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.addEventListener('click', () => {
        initializeTempDeck();
        drawRandomCardFromDeck();
    });
    drawContainer.appendChild(restartButton);
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
            imgElement.className = 'card-image'; // Add class for styling
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

            // Add click event listener to the card
            cardElement.addEventListener('click', () => {
                showModal(card['Image Link'], cardName, card.Rarity, kingdom);
            });
        });
    });

    lazyLoadImages();
    updatePaginationButtons(filteredCards.length);
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

    // Clear previous 'Add to Deck' button
    const existingButton = document.getElementById('add-to-deck-button');
    if (existingButton) {
        existingButton.remove();
    }

    // Add card to deck button
    const addToDeckButton = document.createElement('button');
    addToDeckButton.id = 'add-to-deck-button';
    addToDeckButton.textContent = 'Add to Deck';
    addToDeckButton.onclick = () => {
        if (!userDeck[cardName]) {
            userDeck[cardName] = { imageSrc, quantity: 1 };
        } else if (userDeck[cardName].quantity < 2) {
            userDeck[cardName].quantity += 1;
        }
        updateDeckCount();
        modal.style.display = 'none';
    };
    modal.appendChild(addToDeckButton);

    // Close the modal when the user clicks on <span> (x)
    const span = document.getElementsByClassName('close')[0];
    span.onclick = function () {
        modal.style.display = 'none';
    };

    // Close the modal when the user clicks anywhere outside of the modal
    window.onclick = function (event) {
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

function displayDeck() {
    const deckList = document.getElementById('deck-list');
    deckList.innerHTML = ''; // Clear previous deck

    Object.entries(userDeck).forEach(([cardName, card]) => {
        const listItem = document.createElement('li');
        listItem.className = 'deck-card';

        const imgElement = document.createElement('img');
        imgElement.src = card.imageSrc;
        imgElement.className = 'deck-card-image'; // Add class for styling
        listItem.appendChild(imgElement);

        const titleElement = document.createElement('h3');
        titleElement.className = 'deck-card-title';
        titleElement.textContent = cardName;
        listItem.appendChild(titleElement);

        const quantityElement = document.createElement('p');
        quantityElement.className = 'deck-card-quantity';
        quantityElement.textContent = `Quantity: ${card.quantity}`;
        listItem.appendChild(quantityElement);

        deckList.appendChild(listItem);
    });
}

function updateDeckCount() {
    const deckCount = document.getElementById('deck-count');
    const totalCards = Object.values(userDeck).reduce((sum, card) => sum + card.quantity, 0);
    deckCount.textContent = `${totalCards} cards`;
}

function backToPreviousPage() {
    window.history.back();
}

function toCardCreation() {
    window.location.href = 'Card Creation.html';
}


document.addEventListener('DOMContentLoaded', () => {
    fetchCardsData();

    // Add event listeners for filter buttons
    document.getElementById('filter-all').addEventListener('click', () => filterCards('All'));
    document.getElementById('filter-kingdom1').addEventListener('click', () => filterCards('R\'Oth Vilgmeri'));
    document.getElementById('filter-kingdom2').addEventListener('click', () => filterCards('Gilded Juval'));
    document.getElementById('filter-kingdom3').addEventListener('click', () => filterCards('High Valomor'));
    document.getElementById('filter-kingdom4').addEventListener('click', () => filterCards('Ervenia'));
    document.getElementById('filter-kingdom5').addEventListener('click', () => filterCards('Farlands'));
    document.getElementById('back').addEventListener('click', backToPreviousPage);
    document.getElementById('draw-button').addEventListener('click', drawRandomCardFromDeck);
    document.querySelector('.create').addEventListener('click', toCardCreation);

    const deckButton = document.getElementById('deck-button');
    const deckModal = document.getElementById('deck-modal');
    const closeModal = document.querySelector('#deck-modal .close');

    deckButton.addEventListener('click', () => {
        deckModal.style.display = 'block';
        displayDeck(); // Display the deck when the modal is opened
    });

    closeModal.addEventListener('click', () => {
        deckModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === deckModal) {
            deckModal.style.display = 'none';
        }
    });
    initializeTempDeck();
});