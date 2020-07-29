if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/service-worker.js', {updateViaCache: 'none'})
			.then(registration => {
				if (registration.waiting) {
				// Показываем приглашение обновить страницу
					console.log('Обновите страницу');
				}
				console.log('ServiceWorker registration successful');
			}).catch(err => {
				console.log('ServiceWorker registration failed: ', err);
			});
	});
}
