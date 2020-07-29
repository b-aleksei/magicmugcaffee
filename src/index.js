import './scss/style.scss';
import './js/script';
import './js/sw.register';


/* if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js')
			.then(() => {
				console.log('ServiceWorker registration successful');
			}).catch(err => {
				console.log('ServiceWorker registration failed: ', err);
			});
	});
}*/
