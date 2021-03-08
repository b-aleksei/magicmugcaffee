const START_INDEX = 4;
const CLOSE_BRACE = 6;
const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
let startSelection = 0;
let endSelection = 0;
// eslint-disable-next-line max-len
const pastePattern = ['+', '9', ' ', '(', '9', '9', '9', ')', ' ', '9', '9', '9', '-', '9', '9', '-', '9', '9'];
// eslint-disable-next-line max-len
const pattern = ['+', '1', ' ', '(', '_', '_', '_', ')', ' ', '_', '_', '_', '-', '_', '_', '-', '_', '_'];
let result = pattern.slice();
let focus;
let initialValue = pattern.join('');
const successSend = document.querySelector('.success-send');
const btnText = form.querySelector('.contact__btn-name');
const preloader = form.querySelector('.sk-three-bounce');

const checkValidity = function() {
	this.value = this.value.trim();
	if (this.validity.patternMismatch || this.value === '') {
		this.style.borderColor = '#ba0b11';
		this.parentElement.classList.remove('valid');
	} else {
		this.style.borderColor = '';
		this.parentElement.classList.add('valid');
	}
};

const pasteValue = function() {
	setTimeout(() => {
		const value = Array.from(this.value).filter(item => /\d/.test(item));
		value.reverse();
		const pattern = pastePattern.slice();
		for (let i = 0; i < pattern.length; i++) {
			if (pattern[i] !== '9') continue;
			pattern[i] = value.pop() || '_';
		}
		pattern[1] = '1';
		result = pattern;
		this.value = pattern.join('');
		startSelection = endSelection = 0;
		checkValidity.call(this);
	});
};

const selectValue = function() {
	startSelection = this.selectionStart;
	endSelection = this.selectionEnd;
};

const enterValue = function(e) {
	const IsSelectionTrue = startSelection !== endSelection;
	if (!e.ctrlKey) {
		focus = this.selectionStart < START_INDEX ?
			this.selectionStart = START_INDEX :
			this.selectionStart;
	}

	if (e.key !== 'Tab' && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' &&
			e.key !== 'ArrowDown' && e.key !== 'ArrowUp' && !e.ctrlKey) {
		e.preventDefault();
		if (IsSelectionTrue && this.selectionStart !== this.selectionEnd) {
			const clearData = pattern.slice(startSelection, endSelection);
			result.splice(startSelection, endSelection - startSelection, ...clearData);
		}

		if (/\d/.test(e.key) && focus < result.length) {
			let index = result.indexOf('_');
			const separator = result.indexOf('-', this.selectionStart);

			if (index === -1) {
				for (let i = this.selectionStart; i < result.length; i++) {
					index = i;
					if (/\d/.test(result[i])) break;
				}
			}
			result[index] = e.key;
			focus = ( index === CLOSE_BRACE ) ?
				CLOSE_BRACE + 2 :
				( separator - index === 1 ) ?
					index + 1 :
					index;
		} else {
			if (e.key === 'Backspace') {
				if (!IsSelectionTrue && result[focus - 1] !== '(') {
					let insert;
					switch (result[this.selectionStart - 1]) {
					case '-':
						insert = '-';
						break;
					case ' ':
						insert = ' ';
						break;
					case ')':
						insert = ')';
						break;
					default:
						insert = '_';
					}

					result.splice(this.selectionStart - 1, 1, insert);
					focus -= 1;
				}
			}

			if (e.key === 'Delete' && !IsSelectionTrue) {
				const index = result.slice(focus).findIndex(item => {
					return /\d/.test(item);
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
const showPreload = function() {
	btnText.textContent = 'SENDING';
	btnText.classList.add('sending');
	preloader.classList.remove('display-none');
};

const closePopup = function(evt) {
	if (evt.code === 'Escape') {
		successSend.classList.add('display-none');
		document.removeEventListener('keydown', closePopup);
	}
};

const sendSuccess = function() {
	successSend.classList.remove('display-none');
	btnText.textContent = 'SEND';
	btnText.classList.remove('sending');
	preloader.classList.add('display-none');

	document.addEventListener('keydown', closePopup);
	successSend.addEventListener('click', function() {
		successSend.classList.add('display-none');
	}, {once: true});

	const inputsWraps = form.querySelectorAll('label:not(:last-of-type)');
	inputsWraps.forEach(item => item.classList.remove('valid'));
};

const onSubmit = function(e) {
	showPreload();
	fetch('mail.php', {
		method: 'post',
		body: new FormData(form),
	}).then(() => {
		sendSuccess();
		form.reset();
	}).catch(() => alert('There are network problems. Send the application again'));
	e.preventDefault();
};

form.addEventListener('focusin', function(e) {
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

form.addEventListener('focusout', function(e) {
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
