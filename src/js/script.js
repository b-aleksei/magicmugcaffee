'use strict';
// ====================menu-opener=================================
( function() {
	const navButton = document.querySelector('.nav__menu-opener');
	const navMain = document.querySelector('.nav');

	navButton.classList.remove('hide');
	navMain.classList.remove('header__nav--no-js');
	navButton.addEventListener('click', function() {
		const invert = navButton.getAttribute('aria-expanded') === 'false' ? 'true' : 'false';
		navButton.setAttribute('aria-expanded', invert);
		navMain.classList.toggle('header__nav--menu-open');
		navButton.classList.toggle('header__nav--menu-open');
	});
} )();

// =====================scroll===========================================
( function() {
	function showToTopBtn() {
		const scrolled = window.pageYOffset;
		const viewportHeight = document.documentElement.clientHeight;
		if (scrolled > viewportHeight) {
			goToTop.classList.add('to_top-show');
		} else {
			goToTop.classList.remove('to_top-show');
		}
	}
	const goToTop = document.querySelector('.to_top');
	window.addEventListener('scroll', showToTopBtn);
} )();

// =====================price===========================================
( function() {
	const table = document.querySelector('.price');
	const select = table.querySelector('.price__select');
	const noJs = table.querySelector('.price__no-js');
	noJs.classList.remove('price__no-js');

	select.addEventListener('change', function() {
		const dictionary = {
			2: ['.price__cell--3', '.price__cell--4'],
			3: ['.price__cell--2', '.price__cell--4'],
			4: ['.price__cell--2', '.price__cell--3'],
		};
		const showColumns = table.querySelectorAll('.price__cell--' + this.value);
		const hideColumns1 = table.querySelectorAll(dictionary[this.value][0]);
		const hideColumns2 = table.querySelectorAll(dictionary[this.value][1]);

		for (let i = 0; i < showColumns.length; i++) {
			showColumns[i].classList.remove('hide');
			hideColumns1[i].classList.add('hide');
			hideColumns2[i].classList.add('hide');
		}
	});
} )();

// =====================slider===========================================
( function() {
	const slider = document.querySelector('.slider');
	const buttonForward = slider.querySelector('.slider__arrow-forward');
	const buttonBack = slider.querySelector('.slider__arrow-back');
	const slideContainer = slider.querySelector('.slider__slides');
	const amountSlides = slider.querySelectorAll('.slider__item').length;
	const indicatorContainer = slider.querySelector('.slider__indicators');
	let translate = 0;
	const delayTimerSlider = 5000;
	const changeSlide = 4000;
	let delaySlide; let intervalSlider; let timer;

	if (amountSlides > 1) {
		const hideArrow = function() {
			if (translate === 0) {
				buttonBack.hidden = true;
			} else if (translate === amountSlides - 1) {
				buttonForward.hidden = true;
			} else {
				buttonBack.hidden = buttonForward.hidden = false;
			}
		};

		for (let i = 0; i < amountSlides; i++) {
			indicatorContainer.insertAdjacentHTML('beforeend', `<span class="slider__ind">`);
		}

		buttonBack.hidden = true;
		slider.classList.remove('slider__no-js');

		const onClickSlider = function() {
			clearTimeout(timer);
			clearTimeout(delaySlide);
			clearInterval(intervalSlider);
			slideContainer.classList.add('click-duration');
			slideContainer.classList.remove('auto-duration');
			const forward = this === buttonForward;
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

		buttonForward.addEventListener('click', onClickSlider);
		buttonBack.addEventListener('click', onClickSlider);

		const scrollAuto = function() {
			indicatorContainer.children[translate].style.backgroundColor = '';
			if (translate !== amountSlides - 1) {
				translate += 1;
			}
			slideContainer.classList.remove('click-duration');
			slideContainer.classList.add('auto-duration');
			slideContainer.style.transform = `translateX(-${translate * 100}%)`;
			hideArrow();
			translate -= 1;
			delaySlide = setTimeout(function() {
				slideContainer.classList.remove('auto-duration');
				slideContainer.style.transform = `translateX(-${translate * 100}%)`;
				slideContainer.append(slideContainer.firstElementChild);
			}, 2100);
		};

		const startAutoScroll = function() {
			timer = setTimeout(function() {
				intervalSlider = setInterval(function() {
					scrollAuto();
				}, changeSlide);
			}, delayTimerSlider);
		};

		startAutoScroll();
	}
} )();
