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


//page loader code//

window.addEventListener('load', function() {
    const loader = document.querySelector('.page_loader');

    // Delay the animation by 2 seconds
    setTimeout(function() {
        loader.classList.add('slide-up');

        // Optional: Remove the loader from the DOM after animation ends
        loader.addEventListener('transitionend', function() {
            loader.style.display = 'none';
        });
    }, 2000); // 2000 milliseconds = 2 seconds
});
