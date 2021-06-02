let registrBut = document.querySelector('.button-registr');
let butClose = document.querySelector('.close');
let popup = document.querySelector('.popup');

registrBut.addEventListener('click', () => {
    popup.style.visibility = 'visible';
});

butClose.addEventListener('click', () => {
    popup.style.visibility = 'hidden';
})