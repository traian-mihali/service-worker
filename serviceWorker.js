importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

workbox ? console.log("workbox is loaded") : console.log("workbox didn't load");

// workbox.setConfig({ debug: false });

workbox.precaching.precacheAndRoute(["/index.html"]);

workbox.routing.registerRoute(
  new RegExp(".*.js"),
  new workbox.strategies.NetworkFirst({
    networkTimeoutSeconds: 3
  })
);

workbox.routing.registerRoute(
  /\.css$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "css-cache"
  })
);

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "image-cache",
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 7
      })
    ]
  })
);
