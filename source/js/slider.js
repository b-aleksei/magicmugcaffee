"use strict";
(function () {

let buttonForward = document.querySelector(".slider__arrow-forward"),
 buttonBack = document.querySelector(".slider__arrow-back"),
 slider = document.querySelector(".slider__inner"),
 arr = ["translate-0", "translate-25", "translate-50", "translate-75"],
 noJs = document.querySelector(".slider__no-js"),
 i = 0;

noJs.classList.remove("slider__no-js");

buttonForward.addEventListener("click", function () {
if(i < arr.length - 1) {
  slider.classList.remove(arr[i]);
  i += 1;
  slider.classList.add(arr[i]);
}
});

buttonBack.addEventListener("click", function () {
if(i > 0) {
  slider.classList.remove(arr[i]);
  i -= 1;
  slider.classList.add(arr[i]);
}
});
})();
