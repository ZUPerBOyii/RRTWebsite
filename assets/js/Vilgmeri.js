document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector('#back').addEventListener('click', backToMainPage);
    document.querySelector('.Mountains').addEventListener('click', toMountains);
    document.querySelector('.Grace').addEventListener('click', toGrace);
    document.querySelector('.Dead').addEventListener('click', toDead);
    document.querySelector('.Oldamor').addEventListener('click', toOldamor);
    document.querySelector('.Forests').addEventListener('click', toForests);
    document.querySelector('.Four').addEventListener('click', toFour);
    document.querySelector('.Haven').addEventListener('click', toHaven);
    document.querySelector('.FarLost').addEventListener('click', toFarLost);
}

function backToMainPage() {
    window.location.href = 'index.html';
}

function toMountains() {
    window.location.href = "sub-Vilgmeri/Mountains of R'Oth.html";
}

function toGrace() {
    window.location.href = "sub-Vilgmeri/Grace of Ami.html";
}

function toDead() {
    window.location.href = "sub-Vilgmeri/Dead Pass.html";
}

function toOldamor() {
    window.location.href = "sub-Vilgmeri/Nur Oldamor.html";
}

function toForests() {
    window.location.href = "sub-Vilgmeri/White Forests.html";
}

function toFour() {
    window.location.href = "sub-Vilgmeri/The Four.html";
}

function toHaven() {
    window.location.href = "sub-Vilgmeri/Forgotten Haven.html";
}

function toFarLost() {
    window.location.href = "sub-Vilgmeri/Far Lost.html";
}