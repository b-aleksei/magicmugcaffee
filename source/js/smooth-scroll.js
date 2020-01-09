'use strict';
(function () {

function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    goToTop.classList.add('to_top-show');
  }
  if (scrolled < coords) {
    goToTop.classList.remove('to_top-show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -60);
    setTimeout(backToTop, 0);
  }
}

let goToTop = document.querySelector('.to_top');
window.addEventListener('scroll', trackScroll);
goToTop.addEventListener('click', backToTop);

let anchors = document.querySelectorAll('.scroll-to');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    let getId = anchor.getAttribute('href');

    document.querySelector(getId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}
})();
