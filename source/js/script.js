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
      setTimeout(backToTop);
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
    let table = document.querySelector('.price');
  let select = table.querySelector(".price__select");
   let noJs = table.querySelector(".price__no-js");

  noJs.classList.remove("price__no-js");

  select.addEventListener('change', function () {
    console.log(this);
    let dictionary = {
      2 : [".price__cell--3", ".price__cell--4"],
      3 : [".price__cell--2", ".price__cell--4"],
      4 : [".price__cell--2", ".price__cell--3"],
    };
    let showColumns = table.querySelectorAll(".price__cell--" + this.value);
    let hideColumns1 = table.querySelectorAll(dictionary[this.value][0]);
    let hideColumns2 = table.querySelectorAll(dictionary[this.value][1]);

    for (let i = 0; i < showColumns.length; i++) {
      showColumns[i].classList.remove("hide");
      hideColumns1[i].classList.add("hide");
      hideColumns2[i].classList.add("hide");
    }
  })

})();

//=====================slider===========================================
(function () {
  let slider = document.querySelector('.slider'),
    buttonForward = slider.querySelector(".slider__arrow-forward"),
    buttonBack = slider.querySelector(".slider__arrow-back"),
    slideContainer = slider.querySelector('.slider__slides'),
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

  const START_INDEX = 4;
  const CLOSE_BRACE = 6;
  let form = document.getElementById('form');
  let name = document.getElementById('name');
  let email = document.getElementById('email');
  let phone = document.getElementById('phone');
  let startSelection = 0;
  let endSelection = 0;
  let pastePattern = ['+', '9', ' ', '(', '9', '9', '9', ')', ' ', '9', '9', '9', '-', '9', '9', '-', '9', '9'];
  let pattern = ['+', '1', ' ', '(', '_', '_', '_', ')', ' ', '_', '_', '_', '-', '_', '_', '-', '_', '_'];
  let result = pattern.slice();
  let focus;
  let initialValue = pattern.join('');
  let successSend = document.querySelector('.success-send');
  let btnText = form.querySelector('.contact__btn-name');
  let preloader = form.querySelector('.sk-three-bounce');

  let checkValidity = function () {
    if (this.validity.patternMismatch || this.value === '') {
      this.style.borderColor = '#ba0b11';
      this.parentElement.classList.remove('valid')
    } else {
      this.style.borderColor = '';
      this.parentElement.classList.add('valid')
    }
  };

  let pasteValue = function () {
    setTimeout(() => {
      let value = Array.from(this.value).filter(item => /\d/.test(item));
      value.reverse();
      let pattern = pastePattern.slice();
      for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] !== '9') continue;
        pattern[i] = value.pop() || '_';
      }
      pattern[1] = '1';
      result = pattern;
      this.value = pattern.join('');
      startSelection = endSelection = 0;
      checkValidity.call(this);
    })
  };

  let selectValue = function () {
    startSelection = this.selectionStart;
    endSelection = this.selectionEnd;
  };

  let enterValue = function (e) {

    let IsSelectionTrue = startSelection !== endSelection;
    if (!e.ctrlKey) {
      focus = this.selectionStart < START_INDEX ? this.selectionStart = START_INDEX : this.selectionStart;
    }

    if (e.key !== 'Tab' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && !e.ctrlKey) {
      e.preventDefault();
      if (IsSelectionTrue) {
        let clearData = pattern.slice(startSelection, endSelection);
        result.splice(startSelection, endSelection - startSelection, ...clearData);
      }

      if (/\d/.test(e.key) && focus < result.length) {
        let index = result.indexOf('_');
        let separator = result.indexOf('-', this.selectionStart);

        if (index === -1) {
          for (let i = this.selectionStart; i < result.length; i++) {
            index = i;
            if (/\d/.test(result[i])) break;
          }
        }
        result[index] = e.key;
        focus = (index === CLOSE_BRACE) ? CLOSE_BRACE + 2 : (separator - index === 1) ? index + 1 : index;

      } else {
        if (e.key === 'Backspace') {
          if (!IsSelectionTrue && result[focus - 1] !== '(') {
            let insert;
            switch (result[this.selectionStart - 1]) {
              case '-' :
                insert = '-';
                break;
              case ' ' :
                insert = ' ';
                break;
              case ')' :
                insert = ')';
                break;
              default :
                insert = '_';
            }

            result.splice(this.selectionStart - 1, 1, insert);
            focus -= 1
          }
        }

        if (e.key === 'Delete' && !IsSelectionTrue) {
          let index = result.slice(focus).findIndex(item => {
            return /\d/.test(item)
          });
          if (~index) {
            result[focus + index] = '_';
          }
        }
      }

      this.value = result.join('');

      this.selectionStart = this.selectionEnd = focus + 1;

      if (!/\d/.test(e.key)) {
        this.selectionStart = this.selectionEnd = focus;
      }
    }
    checkValidity.call(this);
  };
  // ============================== send form================================
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
    inputsWraps.forEach(item => item.classList.remove('valid'));
  };

   let onSubmit = function (e) {
    showPreload();
    fetch('mail.php', {
      method: 'post',
      body: new FormData(form)
    }).then(() => {
      sendSuccess();
      form.reset()
    }).catch(() => alert('There are network problems. Send the application again'));
    e.preventDefault()
  };

  form.addEventListener('focusin', function (e) {
    this.addEventListener('submit', onSubmit);

    if (e.target === phone) {
      phone.value = initialValue || phone.value;
      setTimeout(() => {
        phone.selectionStart = phone.selectionEnd = focus || START_INDEX;
      });
      initialValue = '';
      phone.addEventListener('paste', pasteValue);
      phone.addEventListener('select', selectValue);
      phone.addEventListener('keydown', enterValue);
    }

    if (e.target === name) {
      name.addEventListener('input', checkValidity);
    }

    if (e.target === email) {
      email.addEventListener('input', checkValidity);
    }
  });

  form.addEventListener('focusout', function (e) {
    this.removeEventListener('submit', onSubmit);

    if (e.target === phone) {
    phone.removeEventListener('paste', pasteValue);
    phone.removeEventListener('select', selectValue);
    phone.removeEventListener('keydown', enterValue);
    }

    if (e.target === name) {
      name.removeEventListener('input', checkValidity);
    }

    if (e.target === email) {
      email.removeEventListener('input', checkValidity);
    }
  });

})();
