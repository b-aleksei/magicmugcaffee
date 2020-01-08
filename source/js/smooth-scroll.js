'use strict';

function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    goToTop.classList.add('back_to_top-show');
  }
  if (scrolled < coords) {
    goToTop.classList.remove('back_to_top-show');
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -60);
    setTimeout(backToTop, 0);
  }
}

const goToTop = document.querySelector('.back_to_top');
window.addEventListener('scroll', trackScroll);
goToTop.addEventListener('click', backToTop);

const anchors = document.querySelectorAll('.scroll-to');

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const getId = anchor.getAttribute('href');

    document.querySelector(getId).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}
