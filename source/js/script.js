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
    translate = 0,
    delayTimerSlider = 5000,
    changeSlide = 4000,
    delaySlide, intervalSlider, timer;

  let hideArrow = function () {
    if (translate === 0) {
      buttonBack.hidden = true;
    } else if (translate === amountSlides - 1) {
      buttonForward.hidden = true;
    } else {
      buttonBack.hidden = buttonForward.hidden = false;
    }
  };

  for (let i = 0; i < amountSlides; i++) {
    indicatorContainer.insertAdjacentHTML("beforeend", `<span class="slider__ind">`)
  }

  buttonBack.hidden = true;
  slider.classList.remove("slider__no-js");

  let onClickSlider = function () {
    clearTimeout(timer);

      clearTimeout(delaySlide);
      clearInterval(intervalSlider);
      slideContainer.classList.add('click-duration');
    slideContainer.classList.remove('auto-duration');
    let forward = this === buttonForward;
    indicatorContainer.children[translate].style.backgroundColor = '';
    if (forward) {
      buttonBack.hidden = false;
      translate += 1;
    } else if (translate > 0) {
      buttonForward.hidden = false;
      translate -= 1;
    }
    slideContainer.style.transform = `translate(-${translate * 100}%)`;
    indicatorContainer.children[translate].style.backgroundColor = '#f8cd60';
    hideArrow();
    startAutoScroll();
  };

  buttonForward.addEventListener("click", onClickSlider);
  buttonBack.addEventListener("click", onClickSlider);

  function scrollAuto() {
    indicatorContainer.children[translate].style.backgroundColor = '';
    translate === amountSlides - 1 ? translate = 2 : translate += 1;
    slideContainer.classList.remove('click-duration');
    slideContainer.classList.add('auto-duration');
    slideContainer.style.transform = `translateX(-${translate * 100}%)`;
    hideArrow();
    translate -= 1;
    delaySlide = setTimeout(function () {
      slideContainer.classList.remove('auto-duration');
      slideContainer.style.transform = `translateX(-${translate * 100}%)`;
      slideContainer.append(slideContainer.firstElementChild);
    }, 2100)
  }

  let startAutoScroll = function () {
    timer = setTimeout(function () {
      intervalSlider = setInterval(function () {
        scrollAuto();
      }, changeSlide);
    }, delayTimerSlider)
  };

  startAutoScroll()

})();
//=================validation form======================================
(function () {

  let checkValidity = function () {
    if(this.validity.patternMismatch || this.value === '') {
      this.style.borderColor = '#ba0b11';
      this.parentElement.classList.remove('valid')
    } else {
      this.style.borderColor = '';
      this.parentElement.classList.add('valid')
    }
  };

  let phone = document.getElementById('phone');
  phone.addEventListener('input', function (e) {
    let result = '+1 (';
    let arrStr = Array.from(this.value);
    for (let i = 4; i < arrStr.length; i++) {
      if (i === 18) break;

      if (arrStr[i]) {
        let item = arrStr[i].match(/\d+/);
        if (item) {
          switch (result.length) {
            case 6:
              (!e.data && arrStr.length < 9) ? result += item : result += item + ') ';
              break;
            case 8: result += ' ' + item;
              break;
            case 12:
            case 15: result += '-' + item;
              break;
            default : result += item;
          }
        }
      }
    }
    this.value = result.trim();

    checkValidity.call(this)
  });

  let name = document.getElementById('name');
  name.addEventListener('input', checkValidity);

  let email = document.getElementById('email');
  email.addEventListener('input', checkValidity);

})();
//=====================send===========================================
(function () {

  let form = document.getElementById('form');
  // let btnSubmit = form.querySelector('.contact__btn');
  let successSend = document.querySelector('.success-send');
  let btnText = form.querySelector('.contact__btn-name');
  let preloader = form.querySelector('.sk-three-bounce');

  let showPreload = function () {
    btnText.textContent = 'SENDING';
    btnText.classList.add('sending');
    preloader.classList.remove('display-none')
  };

  let closePopup = function (evt) {
    if (evt.code === "Escape") {
    successSend.classList.add("display-none");
    document.removeEventListener("keydown", closePopup);
    }
  };

  let sendSuccess = function () {

    successSend.classList.remove("display-none");
    btnText.textContent = 'SEND';
    btnText.classList.remove('sending');
    preloader.classList.add('display-none');

    document.addEventListener("keydown", closePopup);
    successSend.addEventListener("click", function () {
      successSend.classList.add("display-none");
    }, {once: true});

    let inputsWraps = form.querySelectorAll('label:not(:last-of-type)');
    inputsWraps.forEach((item) => item.classList.remove('valid'));
  };

  form.addEventListener('submit', function (e) {
    showPreload();
    fetch('mail.php', {
      method: 'post',
      body: new FormData(form)
    }).then(() => {
      sendSuccess();
      form.reset()
    }).catch(() => alert('There are network problems. Send the application again'));
    e.preventDefault()
  })

})();
