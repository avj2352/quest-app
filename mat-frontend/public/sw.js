if ('serviceWorker' in navigator) {
    // service worker boiler plate
    navigator.serviceWorker.register('/sw.js')
    .then(function (registration) { 
        console.log('ServiceWorker registration succeeded.');       
    }).catch(function (err) { 
        console.log('ServiceWorker registration failed: ', err);  
  });
}