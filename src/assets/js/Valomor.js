document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector('#back').addEventListener('click', backToMainPage);
}

function backToMainPage() {
    window.location.href = 'index.html';
}