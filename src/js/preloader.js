export function preloader() {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}
window.onload = preloader();

//  для іншого прелоадера(на всякий випадок)

// function preloader() {
//   setTimeout(function () {
//     const preloader = document.getElementsByClassName('.preloader');
//     if (!preloader.classList.contains('js-hidden')) {
//       preloader.classList.add('js-hidden');
//     }
//   }, 1000);
// }
