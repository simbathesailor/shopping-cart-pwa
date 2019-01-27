const cacheName = "cache-v1";
const precacheResources = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/assets/images/placeholder-img.jpg",
  ...self.__precacheManifest.reduce((acc, elem) => {
    acc.push(elem.url);
    return acc;
  }, [])
];
/**
 * Install phase is good for caching static assets
 * Activate Phase is good for updating cache
 * fetch event is good place for deciding whether to send from cache or
 */
self.addEventListener("install", event => {
  console.log("Service worker install event!");
  self.skipWaiting(); //need to see if it is right to add skipwaiting or it will make
  // the benifits of service worker go away
  console.log("***event request in install***", event);
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      const finalPrecache = precacheResources.reduce((acc, elem) => {
        if (elem.indexOf("hot-update.json") === -1) {
          acc.push(elem);
        }
        return acc;
      }, []);
      return cache.addAll(finalPrecache);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Service worker activate event!");
  /**
   * remove the outdatedCache
   */
  console.log("precacheResources", precacheResources);
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== cacheName) return caches.delete(key);
        })
      );
    })
  );
  return self.clients.claim();
});
/**
 * CACHING STRATEGY START
 */
//Keep static assets in cache
//keep dynamic assets in indexDB
self.addEventListener("fetch", event => {
  console.log("Fetch intercepted for:", event.request.url, precacheResources);
  event.respondWith(
    fetch(event.request)
      .then(res => {
        const finalPrecache = precacheResources.reduce((acc, elem) => {
          if (elem.indexOf("hot-update.json") === -1) {
            acc.push(elem);
          }
          return acc;
        }, []);
        if (
          finalPrecache.includes(event.request.url) ||
          event.request.url.match(/\.(png|jpg|jpeg|gif|webp)/) ||
          event.request.url.includes("https://images.unsplash.com")
        ) {
          return caches.open(cacheName).then(cache => {
            cache.put(event.request.url, res.clone());
            return res;
          });
        }
        return res;
      })
      .catch(function() {
        return caches.match(event.request, {
          cacheName
        });
      })
  );
});

/**
 * CACHING STRATEGY END
 */
/**
 * Event to do something on notification close
 */
self.addEventListener("notificationclose", event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log("Closed notification: " + primaryKey);
});

/**
 * handle the notificatgion click
 */
self.addEventListener("notificationclick", event => {
  // TODO 2.8 - change the code to open a custom page
  console.log("notification click", event, event.data);
  clients.openWindow("https://licious.in");
  // event.currentTarget.close() //progmatically close the notification
  self.registration.getNotifications().then(notifications => {
    notifications.forEach(notification => {
      notification.close();
    });
  });
});
// /**
//  * add to home screen code
//  */

/**
 * Push notifications for service worker
 */
// self.addEventListener('push', event => {
//   const options = {
//     body: 'This notification was generated from a push!',
//     icon: '',
//     vibrate: [100, 50, 100],
//     data: {
//       dateOfArrival: Date.now(),
//       primaryKey: 1
//     },
//     actions: [
//       {action: 'explore', title: 'Go to the site',
//         icon: ''},
//       {action: 'close', title: 'Close the notification',
//         icon: ''},
//     ]
//   };

//   event.waitUntil(
//     self.registration.showNotification('Push Notification', options)
//   );
// });

/**
 * Get data from the push message
 */
self.addEventListener("push", event => {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = "Default body";
  }

  const options = {
    body: body,
    icon: "images/notification-flat.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: "explore",
        title: "Go to the site",
        icon: "images/checkmark.png"
      },
      {
        action: "close",
        title: "Close the notification",
        icon: "images/xmark.png"
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
  //below code can replace the plain simple event.waitUntil when you dont want to show
  //push notification when web app is open.

  // event.waitUntil(
  //   clients.matchAll().then(c => {
  //     console.log(c);
  //     if (c.length === 0) {
  //       // Show notification
  //       self.registration.showNotification('Push Notification', options);
  //     } else {
  //       // Send a message to the page to update the UI
  //       console.log('Application is already open!');
  //     }
  //   })
  // );

  //Below code can be used to handle the cases when tab is already in opne state and
  // It would be a good idea to navigate to certain page instead of opening new tab altogether
  // event.waitUntil(
  //   clients.matchAll().then(clis => {
  //     const client = clis.find(c => {
  //       return c.visibilityState === 'visible';
  //     });
  //     if (client !== undefined) {
  //       client.navigate('samples/page' + primaryKey + '.html'); //you can use any of your route. not tested but looks like so
  //       client.focus(); //can be used to focus the app
  //     } else {
  //       // there are no visible windows. Open one.
  //       clients.openWindow('samples/page' + primaryKey + '.html');
  //       notification.close();
  //     }
  //   })
  // );
});
