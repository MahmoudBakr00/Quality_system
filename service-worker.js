// =========================================================
// Service Worker - نظام تسجيل ومتابعة العيوب
// الهدف: تخزين "هيكل الموقع" (الصفحات + المكتبات) بشكل موثوق
// عشان يشتغل حتى لو النت اتقطع تمامًا بعد أول زيارة ناجحة.
// ملحوظة: طلبات Supabase (البيانات الحقيقية) بتتجاهل هنا عمدًا
// وبتروح للنت مباشرة - التعامل مع انقطاعها بيتم في shared.js
// (نظام الطابور المحلي)، مش هنا.
// =========================================================

const CACHE_NAME = 'defect-system-cache-v1';

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
  'shared.js',
  'manifest.json',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js',
  'https://cdn.jsdelivr.net/npm/html5-qrcode@2.3.8/html5-qrcode.min.js',
  'https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .catch((err) => {
        console.warn('Service worker: بعض الملفات فشل تخزينها مسبقًا', err);
      })
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

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // طلبات Supabase (بيانات حية) - سيبها تروح للنت مباشرة، منتدخلش فيها خالص
  if (url.includes('supabase.co')) {
    return;
  }

  // باقي الطلبات (صفحات الموقع + المكتبات): جرب الكاش الأول، وحدّثه من النت لو متاح
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkFetch = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => null);

      // لو موجود في الكاش، رجّعه فورًا (سريع + شغال أوفلاين)
      // وفي الخلفية حاول تحدّثه من النت لو متاح (Stale-While-Revalidate)
      return cachedResponse || networkFetch || new Response(
        'عذرًا، هذه الصفحة غير متاحة بدون اتصال بالإنترنت ولم يتم تحميلها من قبل.',
        { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    })
  );
});
