const CACHE_NAME = 'only-cash-v1';
const urlsToCache = [
	'/index.html',
	// '/favicon.ico',
	'/mail.php',
	'/manifest.json',
];

self.addEventListener('install', function(event) {
	console.log('install ServiceWorker');
	event.waitUntil(self.skipWaiting()); // Чтобы обновлять сразу не закрывая вкладку
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(cache => cache.addAll(urlsToCache))
	);
});

self.addEventListener('activate', function(event) {
	console.log('activate ServiceWorker');
	event.waitUntil(self.clients.claim()); // Чтобы обновлять сразу не закрывая вкладку
	/*	event.waitUntil(async function() { // Предзагрузка запроса навигации
		if (self.registration.navigationPreload) {
			await self.registration.navigationPreload.enable();
		}
	}());*/
	event.waitUntil(
		caches.keys().then(cacheNames => Promise.all( // Получить все наименования кешей
			cacheNames.filter(cacheName => cacheName !== CACHE_NAME)
				.map(cacheName => caches.delete(cacheName)) // Очистить весь кеш кроме текущего
		))
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request) // ищет кэшированные результаты для этого запроса в кеше
			.then(resp => { // если в кэше найдено то, что нужно, мы можем тут же вернуть ответ.
				return resp || fetch(event.request).then(response => {
					return caches.open(CACHE_NAME) // Добавляем ответ в кэш на будущее.
						.then(cache => {
							cache.put(event.request, response.clone());
							return response;
						});
				});
			})
	);
});


/*
self.addEventListener('fetch', function(event) {
	event.respondWith(async function() {
		const cachedResponse = await caches.match(event.request); // Отвечаем из кеша
		if (cachedResponse) return cachedResponse;

		const response = await event.preloadResponse; // Отвечаем результатом предзагрузки
		if (response) return response;

		return fetch(event.request); // Идем в сеть
	}());
});
*/
