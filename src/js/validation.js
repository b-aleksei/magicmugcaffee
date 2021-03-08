import {Validate} from './ValidForm';

const formEl = document.getElementById('form');
const successSend = document.querySelector('.success-send');

if (formEl) {
	const btnSubmit = formEl.querySelector('.contact__btn-name');
	const preloader = formEl.querySelector('.sk-three-bounce');
	const form = new Validate(formEl);

	form.beforeSending = () => {
		btnSubmit.textContent = 'SENDING';
		btnSubmit.classList.add('sending');
		preloader.classList.add('preload-active');
	};

	form.afterSending = () => {
		btnSubmit.textContent = 'SEND';
		btnSubmit.classList.remove('sending');
		preloader.classList.remove('preload-active');
	};

	form.transferAction = (status) => {
		if (!successSend) {
		  return;
		}
		const title = successSend.querySelector('.success-send__title');
		title.innerText = form.config.statusMessages[status];
		successSend.classList.add('success-send--active');

		const closePopup = function(evt) {
			if (evt.code === 'Escape') {
				successSend.classList.remove('success-send--active');
				document.removeEventListener('keydown', closePopup);
			}
		};
		document.addEventListener('click', () => {
			successSend.classList.remove('success-send--active');
			document.removeEventListener('keydown', closePopup);
		}, {once: true});
		document.addEventListener('keydown', closePopup);
	};
}
