const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

self.addEventListener('install', (event) => { //new service worker is installed/activated confirm
  console.log('Service Worker installed');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
});


warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', ({ event }) => {
  return pageCache.handle({ event })
});

const assetsCache = new StaleWhileRevalidate({
  cacheName: 'assets-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 7 * 24 * 60 * 60, //7 days expire

    }),
  ],
});

registerRoute(
  /\.(?:js|css|png|jpg|jpeg|svg|gif)$/, //match file extensions
  assetsCache
);


