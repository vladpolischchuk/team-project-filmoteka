const watchedBtn = document.querySelector('.button-container__watched');

function activateWatchedBtn() {
    watchedBtn.classList.add('is-active')
};

function deactiveWatchedBtn() {
    watchedBtn.classList.remove('is-active')
};       

function activateQueueBtn() {
    queueBtn.classList.add('is-active')
}

function deactivateQueueBtn() {
    queueBtn.classList.remove('is-active')
}

export { activateWatchedBtn, activateQueueBtn, deactiveWatchedBtn, deactivateQueueBtn };