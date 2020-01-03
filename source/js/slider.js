let buttonForward = document.querySelector(".slider__arrow-forward");
let  buttonBack = document.querySelector(".slider__arrow-back");
let slider = document.querySelector(".slider__inner");
let arr = ["translate-0", "translate-25", "translate-50", "translate-75"];
let i = 0;

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
