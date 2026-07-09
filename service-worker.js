// =========================================================
// Service Worker - نظام تسجيل ومتابعة العيوب (نسخة مصححة v3)
// الاستراتيجية:
// - صفحات HTML و shared.js: Network-First (يفضل ياخد أحدث نسخة أونلاين،
//   ويرجع للكاش بس لو مفيش نت خالص) - عشان أي تحديث بترفعه يظهر فورًا.
// - مكتبات CDN (نادرًا ما تتغير): Cache-First - أسرع، وشغالة أوفلاين.
// - طلبات Supabase (بيانات حية): بتتجاهل تمامًا، بتروح للنت مباشرة.
// =========================================================

const CACHE_NAME = 'defect-system-cache-v4';

const PRECACHE_URLS = [
  './',
  'index.html',
  'home.html',
  'register-defect.html',
  'track-product.html',
  'dashboard.html',
  'admin-users.html',
  'change-password.html',
  'reset-password.html',
  'inspection-check.html',
  'shared.js',
  'manifest.json',
];

const CDN_LIBRARY_URLS = [
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js',
  'https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
  'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll([...PRECACHE_URLS, ...CDN_LIBRARY_URLS]).catch((err) => {
        console.warn('Service worker: بعض الملفات فشل تخزينها مسبقًا', err);
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

function isCdnLibrary(url) {
  return CDN_LIBRARY_URLS.some((u) => url.startsWith(u));
}

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // طلبات Supabase (بيانات حية) - لا تتدخل خالص، سيبها تروح للنت مباشرة
  if (url.includes('supabase.co')) {
    return;
  }

  // مكتبات CDN: Cache-First (نادرًا ما تتغير، والأهم إنها تشتغل أوفلاين)
  if (isCdnLibrary(url)) {
    event.respondWith(
      (async () => {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        try {
          const response = await fetch(event.request);
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        } catch (err) {
          return new Response('', { status: 503, statusText: 'Offline' });
        }
      })()
    );
    return;
  }

  // صفحات الموقع نفسه (HTML/JS): Network-First
  // يحاول ياخد أحدث نسخة من النت الأول، ولو فشل (مفيش نت) يرجع للكاش
  event.respondWith(
    (async () => {
      try {
        const networkResponse = await fetch(event.request);
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      } catch (err) {
        const cached = await caches.match(event.request);
        if (cached) return cached;
        return new Response(
          'عذرًا، هذه الصفحة غير متاحة بدون اتصال بالإنترنت ولم يتم تحميلها من قبل.',
          { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
        );
      }
    })()
  );
});
