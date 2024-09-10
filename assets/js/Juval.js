document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector('#back').addEventListener('click', backToPreviousPage);
    document.querySelector('.JuaLaVa').addEventListener('click', toJuaLaVa);
    document.querySelector('.JuaSai').addEventListener('click', toJuaSai);
    document.querySelector('.City').addEventListener('click', toCity);
    document.querySelector('.Coast').addEventListener('click', toCoast);
    document.querySelector('.Ramsen').addEventListener('click', toRamsen);
}

function backToPreviousPage() {
    window.history.back();
}


function toJuaLaVa() {
    window.location.href = "sub-Juval/Jua La Va.html";
}

function toJuaSai() {
    window.location.href = "sub-Juval/Jua Sai.html";
}

function toCity() {
    window.location.href = "sub-Juval/Unwelcomed City.html";
}

function toCoast() {
    window.location.href = "sub-Juval/Outcast Coast.html";
}

function toRamsen() {
    window.location.href = "sub-Juval/Golden Ramsen.html";
}