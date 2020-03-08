if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Регистрация успешна
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }).catch(function(err) {
            // Регистрация не успешна
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

/*
if ('serviceWorker' in navigator) {
  // Весь код регистрации у нас асинхронный.
  navigator.serviceWorker.register('./sw.js')
    .then(() => navigator.serviceWorker.ready.then((worker) => {
      worker.sync.register('syncdata');
    }))
    .catch((err) => console.log(err));
}
*/
