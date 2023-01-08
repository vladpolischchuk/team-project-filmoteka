const btnOpenModalWindowTeam = document.querySelector('.open-mdl-win');
const backdropIsHidden = document.querySelector('.backdrop-team');
const modalWindowTeam = document.querySelector('.mdl-win-team')
const btnCloseModalWindowTeam = document.querySelector('.close-btn-mdl');


const openModal = e => {
    e.preventDefault();
    backdropIsHidden.classList.remove('is-hidden');
};

btnOpenModalWindowTeam.addEventListener('click', openModal);

const closeModal = e => {
    e.preventDefault();
    backdropIsHidden.classList.add('is-hidden');
};

btnCloseModalWindowTeam.addEventListener('click', closeModal);