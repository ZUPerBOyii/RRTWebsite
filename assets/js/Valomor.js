document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector('#back').addEventListener('click', backToMainPage);
    document.querySelector('.Isgard').addEventListener('click', toIsgard);
    document.querySelector('.Lowval').addEventListener('click', toLowval);
    document.querySelector('.Vanguards').addEventListener('click', toVanguards);
    document.querySelector('.Almari').addEventListener('click', toAlmari);
}

function backToMainPage() {
    window.location.href = 'index.html';
}

function toIsgard() {
    window.location.href = "sub-Valomor/Isgard.html";
}

function toLowval() {
    window.location.href = "sub-Valomor/Hidden Lowval.html";
}

function toVanguards() {
    window.location.href = "sub-Valomor/Front Vanguards.html";
}

function toAlmari() {
    window.location.href = "sub-Valomor/Almari.html";
}