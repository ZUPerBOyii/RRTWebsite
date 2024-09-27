document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('create-card').addEventListener('click', createCard);
    document.getElementById('upload-image').addEventListener('change', uploadImage);
}

function createCard(){
    const kingdom = document.getElementById('card-kingdom').value;
    const type = document.getElementById('card-type').value;
    const rarity = document.getElementById('card-rarity').value;
    const preview = document.getElementById('preview');

    // Clear previous card template
    preview.innerHTML = '<div id="user-img"></div>';

    // Create card template based on selected options
    const cardTemplate = document.createElement('img');
    cardTemplate.src = `../assets/img/card art/${kingdom}/${type}/${kingdom}-${type}Card-${rarity}.png`;
    cardTemplate.className = 'card-template';
    preview.appendChild(cardTemplate);
}

function uploadImage(e){
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const userImg = document.getElementById('user-img');
        userImg.style.backgroundImage = `url(${e.target.result})`;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
}