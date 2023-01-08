window.addEventListener('load', () => {
  const loader = document.querySelector('.preloader');
  loader.classList.add('loaded_hiding');

  setTimeout(() => {
    document.body.removeChild(document.querySelector('.preloader'));
  }, 500);
});

//  для іншого прелоадера(на всякий випадок)

// function preloader() {
//   setTimeout(function () {
//     const preloader = document.getElementsByClassName('.preloader');
//     if (!preloader.classList.contains('js-hidden')) {
//       preloader.classList.add('js-hidden');
//     }
//   }, 1000);
// }
