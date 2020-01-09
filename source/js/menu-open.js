'use strict';
(function () {

  let navButton = document.querySelector(".nav__menu-opener");
  let navMain = document.querySelector(".nav");
  navMain.classList.remove("header__nav--no-js");
  navButton.addEventListener("click", function () {
    navMain.classList.toggle("header__nav--menu-open");
  });
})();
