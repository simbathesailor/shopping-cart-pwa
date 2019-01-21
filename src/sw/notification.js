/**
 * Helper function to ask notification subscription
 */

export const askNotificationPermission = () => {
  return new Promise((resolve, reject) => {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications!");
      resolve("failed");
    }
    Notification.requestPermission(status => {
      console.log("Notification permission status:", status);
    })
      .then(status => {
        resolve(status);
      })
      .catch(() => {
        resolve("failed");
      });
  });
};

export const displayNotification = () => {
  // TODO 2.3 - display a Notification
  if (Notification.permission === "granted") {
    navigator.serviceWorker.getRegistration().then(reg => {
      // TODO 2.4 - Add 'options' object to configure the notification
      const options = {
        body: "Added to cart",
        icon: "logo.svg",
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },

        // TODO 2.5 - add actions to the notification
        actions: [
          {
            action: "explore",
            title: "Go to the site",
            icon: "logo.svg"
          },
          {
            action: "close",
            title: "Close the notification",
            icon: "logo.svg"
          }
        ]

        // TODO 5.1 - add a tag to the notification
      };
      reg.showNotification("Hello world!", options);
    });
  }
};
