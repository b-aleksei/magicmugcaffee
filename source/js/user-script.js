"use strict";

let navButton = document.querySelector(".nav__menu-opener"),
navMain = document.querySelector(".nav");

navButton.classList.remove("hide");
navMain.classList.remove("header__nav--no-js");
navButton.addEventListener("click", function () {
  navMain.classList.toggle("header__nav--menu-open");
  navButton.classList.toggle("header__nav--menu-open");
});

//=====================scroll===========================================
function trackScroll() {
  let scrolled = window.pageYOffset;
  let coords = document.documentElement.clientHeight;
  if (scrolled > coords) {
    goToTop.classList.add("to_top-show");
  }
  if (scrolled < coords) {
    goToTop.classList.remove("to_top-show");
  }
}

function backToTop() {
  if (window.pageYOffset > 0) {
    window.scrollBy(0, -80);
    setTimeout(backToTop, 0);
  }
}

let goToTop = document.querySelector(".to_top");
window.addEventListener("scroll", trackScroll);
goToTop.addEventListener("click", backToTop);

let anchors = document.querySelectorAll(".scroll-to");

for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    let getId = anchor.getAttribute("href");

    document.querySelector(getId).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  })
}

//=====================price===========================================
let select = document.querySelector(".price__select"),
  col2 = document.querySelectorAll(".price__cell--2"),
  col3 = document.querySelectorAll(".price__cell--3"),
  col4 = document.querySelectorAll(".price__cell--4"),
  noJs = document.querySelector(".price__no-js");

noJs.classList.remove("price__no-js");
select.onchange = function () {
  let indexSelected = select.selectedIndex,
    option = select.querySelectorAll("option")[indexSelected],
    selectedId = option.getAttribute("id");
  if (selectedId === "col-2") {
    for (let i = 0; i < col2.length; i++) {
      col2[i].classList.remove("hide");
    }
  } else {
    for (let i = 0; i < col2.length; i++) {
      col2[i].classList.add("hide");
    }
  }
  if (selectedId === "col-3") {
    for (let i = 0; i < col2.length; i++) {
      col2[i].classList.add("hide");
      col3[i].classList.remove("hide");
    }
  } else {
    for (let i = 0; i < col2.length; i++) {
      col3[i].classList.add("hide");
    }
  }
  if (selectedId === "col-4") {
    for (let i = 0; i < col2.length; i++) {
      col2[i].classList.add("hide");
      col4[i].classList.remove("hide");
    }
  } else {
    for (let i = 0; i < col2.length; i++) {
      col4[i].classList.add("hide");
    }
  }
};

//=====================slider===========================================
let buttonForward = document.querySelector(".slider__arrow-forward"),
  buttonBack = document.querySelector(".slider__arrow-back"),
  slider = document.querySelector(".slider__inner"),
  arr = ["translate-0", "translate-25", "translate-50"],
  noJScript = document.querySelector(".slider__no-js"),
  i = 0;

noJScript.classList.remove("slider__no-js");

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

//=====================send===========================================
let successSend = document.querySelector('.success-send');
let successSendButton = document.querySelector('.success-send__button');
successSendButton.addEventListener("click", function () {
  successSend.classList.add("hide")
});

$(document).ready(function() {
  let form = $("#form");
  form.submit(function() {
    $.ajax({
      type: "POST",
      url: "mail.php",
      data: $(this).serialize()
    }).done(function() {
      $(this).find("input").val("");
      // alert("Your application is accepted! Thanks.");
      successSend.classList.remove("hide");
      form.trigger("reset");
    });
    return false;
  });
});

