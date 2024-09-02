document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector('.vilgmeri').addEventListener('click', redirectToVilgmeri);
    document.querySelector('.valomor').addEventListener('click', redirectToValomor);
    document.querySelector('.juval').addEventListener('click', redirectToJuval);
    document.querySelector('.ervenia').addEventListener('click', redirectToErvenia);
}

function redirectToVilgmeri() {
    window.location.href = "R'Oth Vilgmeri.html";
}
function redirectToValomor() {
    window.location.href = "High Valomor.html";
}
function redirectToJuval() {
    window.location.href = "Gilded Juval.html";
}
function redirectToErvenia() {
    window.location.href = "Ervenia.html";
}