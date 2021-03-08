import onFocusPhoneInput from './utils/phoneMask';
const config = {
	regEmail: /^\s*[\w.-]+@[\w-]+\.(?:[\w-]+\.)?[A-Za-z]{2,8}\s*$/,
};

let errorMessages = {
	required: 'The field should not be empty',
	phone: 'the number isn\'t correct',
	email: 'the email isn\'t correct',
};

let statusMessages = {
	success: 'Your application is accepted. Thanks! We will contact you soon.',
	bad: 'The remote server not found.',
	error: 'There are network problems. Check your internet connection.',
};

const urlDataError = 'data/errorMes.json';
const urlDataStatus = 'data/errorMes.json';
const urlServer = 'mail.php';

fetch(urlDataError).then((res) => res.json()).then((res) => errorMessages = res).catch(() => {});
fetch(urlDataStatus).then((res) => res.json()).then((res) => statusMessages = res).catch(() => {});

export class Validate {
	constructor(form, conf) {
		this.form = form;
		this.defaultConfig = {
			url: urlServer,
			classError: 'form-invalid',
			statusMessages,
		};

		this.config = Object.assign(this.defaultConfig, conf);
		this.init();
	}

	init() {
		this.form.addEventListener('focusin', this);
		this.form.addEventListener('focusout', this);
		this.form.addEventListener('click', this);
		this.form.addEventListener('submit', this);
	}

	handleEvent(e) {
		switch (e.type) {
		case 'focusin':
			if (e.target.hasAttribute('data-validate')) {
				e.target.setCustomValidity('');
				if (e.target.dataset.validate === 'phone') {
					onFocusPhoneInput(e.target);
				}
			}
			break;
		case 'focusout':
			if (e.target.hasAttribute('data-validate')) {
				this.checkValue(e.target);
			}
			break;
		case 'click':
			if (e.target.closest('[type="submit"]')) {
				const inputs = e.currentTarget.querySelectorAll('[data-validate]:not([disabled])');
				inputs.forEach((input) => {
					input.parentElement.classList.add('validate');
					this.checkValue(input);
				});
				if (!this.form.checkValidity()) { // если форма не валидна
					this.form.addEventListener('animationend', this);
					this.form.classList.add(this.config.classError);
				}
			}
			break;
		case 'submit':
			e.preventDefault();
			this.sendData(this.form);
			break;
		case 'animationend':
			this.form.classList.remove(this.config.classError);
			this.form.removeEventListener('animationend', this);
		}
	}

	setErrorMes(target, message) {
		const errorEl = target.parentElement.querySelector('[data-error]');
		if (errorEl) {
			errorEl.dataset.error = message;
		}
		target.setCustomValidity(message);
	}

	checkValue(target) {
		target.parentElement.classList.remove('valid');
		target.parentElement.classList.add('validate');
		if (!target.value && target.required) {
			this.setErrorMes(target, errorMessages.required);
			return;
		}

		if (target.dataset.validate === 'email') {
			target.value = target.value.trim();
			if (target.value && !config.regEmail.test(target.value)) {
				this.setErrorMes(target, errorMessages.email);
				return;
			}
		}

		if (target.dataset.validate === 'phone') {
			// setTimeout(() => {
			const phoneLength = target.value.replace(/\D/g, '').length;
			if (target.value && phoneLength < 11) {
				this.setErrorMes(target, errorMessages.phone);
				return;
			}
			// });
		}
		target.parentElement.classList.add('valid');
	}

	beforeSending() {
	}

	afterSending() {
	}

	transferAction(status) {
	}

	sendData(form) {
		this.beforeSending();
	    fetch(this.config.url, {
			method: 'post',
			body: new FormData(form),
		}).then((res) => {
			if (res.ok) {
				this.transferAction('success');
				form.reset();
				const inputs = form.querySelectorAll('[data-validate]:not(:disabled)');
				inputs.forEach((input) => {
					input.parentElement.classList.remove('validate');
				});
			} else {
				this.transferAction('bad');
			}
		}).catch(() => {
			this.transferAction('error');
		}).finally(() => {
			this.afterSending();
		});
	}
}
