import './scss/style.scss';
import './js/script';
import './js/validation';
import {smoothScrollPolyfill} from './js/scroll';

document.addEventListener('click', (e) => {
	const menuLink = e.target.closest('.scroll-to');
	if (menuLink) {
		smoothScrollPolyfill(menuLink, e);
	}
});
