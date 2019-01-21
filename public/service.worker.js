const cacheName = "cache-v1";
const precacheResources = ["/"];

self.addEventListener("install", event => {
  console.log("Service worker install event!");
  self.skipWaiting(); //need to see if it is right to add skipwaiting or it will make
  // the benifits of service worker go away
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(precacheResources);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("Service worker activate event!");
});

self.addEventListener("fetch", event => {
  console.log("Fetch intercepted for:", event.request.url);
  // return fetch(event.request);
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});

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
  clients.openWindow("https://google.com");
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
