
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('lamia-cache').then((cache) => {
            return cache.addAll([
                './',
                './nndex.html',
                './css.css',
                './script.js',
                './manifest.json',
                './ima.png',  // أضف صورة الخلفية هنا
                './icons/icon-192x192.png'         // تأكد من إضافة الأيقونة هنا
            ]);
        })
    );
});
