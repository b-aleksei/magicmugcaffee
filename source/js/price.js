"use strict";
(function () {

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
})();
