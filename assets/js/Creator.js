document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('create-card').addEventListener('click', createCard);
    document.getElementById('card-image').addEventListener('change', uploadImage);
}

function createCard() {
    const kingdom = document.getElementById('card-kingdom').value;
    const type = document.getElementById('card-type').value;
    const rarity = document.getElementById('card-rarity').value;
    const cardName = document.getElementById('card-name').value;
    const atk = document.getElementById('card-attack').value;
    const def = document.getElementById('card-defense').value;
    const mana = document.getElementById('card-mana').value;
    const description = document.getElementById('card-description').value;
    const preview = document.getElementById('preview');

    // Clear previous card template
    preview.innerHTML = '<div id="user-img"></div><p id="card-name-display"></p><div id="atk" class="stat">0</div><div id="def" class="stat">0</div><div id="mana" class="stat">0</div>';

    // Create card template based on selected options
    const cardTemplate = document.createElement('img');
    cardTemplate.src = `../assets/img/card art/${kingdom}/${type}/${kingdom}-${type}Card-${rarity}.png`;
    cardTemplate.className = 'card-template';
    preview.appendChild(cardTemplate);

    // Display card name
    const cardNameDisplay = document.getElementById('card-name-display');
    cardNameDisplay.textContent = cardName;
    cardNameDisplay.className = 'card-name';

    // Display card stats
    const atkDisplay = document.getElementById('atk');
    const defDisplay = document.getElementById('def');
    const manaDisplay = document.getElementById('mana');
    atkDisplay.textContent = atk;
    atkDisplay.className = 'stat';
    defDisplay.textContent = def;
    defDisplay.className = 'stat';
    manaDisplay.textContent = mana;
    manaDisplay.className = 'stat';

    // Display card description
    const descriptionDisplay = document.createElement('p');
    descriptionDisplay.textContent = description;
    descriptionDisplay.className = 'card-description';
    preview.appendChild(descriptionDisplay);


}

function uploadImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const userImg = document.getElementById('user-img');
        userImg.style.backgroundImage = `url(${e.target.result})`;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}