

if ('serviceWorker' in navigator) {
       window.addEventListener('load', () => {
           navigator.serviceWorker.register('service-worker.js').then(registration => {
               console.log('Service Worker registered with scope:', registration.scope);
           }).catch(error => {
               console.error('Service Worker registration failed:', error);
           });
       });
   }

self.addEventListener('fetch', (event) => {
    event.respondWith(
        

caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});



// مصفوفات لتخزين الأنمي
const watchedAnime = ['Attack on Titan', 'My Hero Academia']; // الأنمي الذي شاهدته
const upcomingAnime = ['Jujutsu Kaisen', 'Demon Slayer']; // الأنمي الذي سأشاهده

// تحديث القوائم في الواجهة
function updateAnimeLists() {
    const watchedList = document.getElementById('watched-anime');
    const upcomingList = document.getElementById('upcoming-anime');

    watchedList.innerHTML = '';
    upcomingList.innerHTML = '';

    watchedAnime.forEach(anime => {
        const li = document.createElement('li');
        li.textContent = anime;

        watchedList.appendChild(li);
    });

    upcomingAnime.forEach(anime => {
        const li = document.createElement('li');
        li.textContent = anime;
        upcomingList.appendChild(li);
    });
}

// تفعيل Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js').then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
        });
    });
}


// إضافة الأنمي إلى قائمة المشاهدة
document.getElementById('add-watched').addEventListener('click', () => {
    const animeName = document.getElementById('anime-input').value;
    if (animeName) {
        watchedAnime.push(animeName);
        updateAnimeLists();
        document.getElementById('anime-input').value = '';
    }
});

// إضافة الأنمي إلى قائمة القادمة
document.getElementById('add-upcoming').addEventListener('click', () => {
    const animeName = document.getElementById('anime-input').value;

    if (animeName) {
        upcomingAnime.push(animeName);
        updateAnimeLists();
        document.getElementById('anime-input').value = '';
    }
});

// إرسال إشعار
document.getElementById('notify-button').addEventListener('click', () => {
    if (Notification.permission === 'granted') {
        new Notification('تذكير: الأنمي الذي ستشاهده الشهر القادم!');
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {

                new Notification('تذكير: الأنمي الذي ستشاهده الشهر القادم!');
            }
        });
    }
});

// تحديث القوائم عند تحميل الصفحة
updateAnimeLists();
