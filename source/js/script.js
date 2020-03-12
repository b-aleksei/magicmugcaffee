"use strict";
//====================menu-opener=================================
(function () {

  let navButton = document.querySelector(".nav__menu-opener"),
    navMain = document.querySelector(".nav");

  navButton.classList.remove("hide");
  navMain.classList.remove("header__nav--no-js");
  navButton.addEventListener("click", function () {
    navMain.classList.toggle("header__nav--menu-open");
    navButton.classList.toggle("header__nav--menu-open");
  });
})();

//=====================scroll===========================================
(function () {

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
})();
//=====================price===========================================
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

//=====================slider===========================================
(function () {
  let slider = document.querySelector('.slider'),
    buttonForward = slider.querySelector(".slider__arrow-forward"),
    buttonBack = slider.querySelector(".slider__arrow-back"),
    slideContainer = document.querySelector('.slider__slides'),
    amountSlides = slider.querySelectorAll('.slider__item').length,
    indicatorContainer = slider.querySelector('.slider__indicators'),
    translate = 0;

  for (let i = 0; i < amountSlides; i++) {
    indicatorContainer.insertAdjacentHTML("beforeend", `<span class="slider__ind">`)
  }

  indicatorContainer.children[translate].style.backgroundColor = '#f8cd60';

  buttonBack.hidden = true;
  slider.classList.remove("slider__no-js");

  buttonForward.addEventListener("click", function () {
    indicatorContainer.children[translate].style.backgroundColor = '';
    if (translate < amountSlides - 1) {
      buttonBack.hidden = false;
      translate += 1;
      slideContainer.style.transform = `translate(-${translate * 100}%)`;
      indicatorContainer.children[translate].style.backgroundColor = '#f8cd60';
      if (translate === amountSlides - 1) {
        buttonForward.hidden = true;
      }
    }
  });

  buttonBack.addEventListener("click", function () {
    indicatorContainer.children[translate].style.backgroundColor = '';
    if (translate > 0) {
      buttonForward.hidden = false;
      translate -= 1;
      slideContainer.style.transform = `translate(-${translate * 100}%)`;
      indicatorContainer.children[translate].style.backgroundColor = '#f8cd60';
      if (translate === 0) {
        buttonBack.hidden = true;
      }
    }
  });

})();

//=====================send===========================================
(function () {

  let successSend = document.querySelector('.success-send');
  let btnText = document.querySelector('.contact__btn-name');
  let preloader = document.querySelector('.sk-three-bounce');

  let showPreload = function () {
    btnText.textContent = 'SENDING';
    btnText.classList.add('sending');
    preloader.classList.remove('display-none')
  };

  let sendSuccess = function () {
    successSend.classList.remove("display-none");
    btnText.textContent = 'SEND';
    btnText.classList.remove('sending');
    preloader.classList.add('display-none');
  };

  let closePopup = function () {
      successSend.classList.add("display-none");
      document.removeEventListener("keydown", closePopup);
    successSend.removeEventListener("click", closePopup);
  };

  $(document).ready(function () {
    let form = $("#form");
    form.submit(function () {
      showPreload();
      $.ajax({
        type: "POST",
        url: "mail.php",
        data: $(this).serialize()
      }).done(function () {
        sendSuccess();
        document.addEventListener("keydown", function (evt) {
          if (evt.code === "Escape") {
            closePopup()
          }
        });
        successSend.addEventListener("click", closePopup);
        $(this).find("input").val("");
        form.trigger("reset");
      });
      return false;
    });
  });

//  phone mask
  $(document).ready(function () {
    $("#phone").mask("+1 (999) 999-99-99");
  });

})();
