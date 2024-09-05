document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector('#back').addEventListener('click', backToMainPage);
    document.querySelector('.Cusomi').addEventListener('click', toCusomi);
    document.querySelector('.FiarmaZan').addEventListener('click', toFiarmaZan);
    document.querySelector('.Deepwoods').addEventListener('click', toDeepwoods);
    document.querySelector('.ErthoKal').addEventListener('click', toErthoKal);
}

function backToMainPage() {
    window.location.href = 'index.html';
}

function toCusomi() {
    window.location.href = "sub-Ervenia/Cusomi.html";
}

function toFiarmaZan() {
    window.location.href = "sub-Ervenia/Fiarma Zan.html";
}

function toDeepwoods() {
    window.location.href = "sub-Ervenia/Deepwoods.html";
}

function toErthoKal() {
    window.location.href = "sub-Ervenia/Ertho Kal.html";
}