import { urlB64ToUint8Array } from "sw/helper";

/**
 *
 * Check whether the page is subscribed for push notification
 */

 export const isSubscribedToPushNotification = async (registration) => {
  if (!registration) return false;
  console.log("registration in isSubscribedToPushNotification", registration)
  const isRegistered = await registration
    .pushManager.getSubscription()
    .then(sub => !!sub)
    .catch(e => false);
  console.log("isRegistered", isRegistered)
  return isRegistered;
};

/**
 * subscribe for push notifications form server
 * VAPID APPROACH
 */

export const subscribeUser = ({ applicationServerPublicKey }) =>
  new Promise((resolve, reject) => {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    window.swRegistration.pushManager
      .subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
      })
      .then(subscription => {
        //in then block backend api call to be done to send subscription object
        console.log("User is subscribed:", subscription);
        if (subscription) {
          resolve(subscription);
        } else {
          reject(null);
        }
      })
      .catch(err => {
        if (Notification.permission === "denied") {
          console.warn("Permission for notifications was denied");
        } else {
          console.error("Failed to subscribe the user: ", err);
        }
        reject(null);
      });
  });

/**
 *
 * Unsubscribe the user
 */
export const unsubscribeUser = ({ registration }) =>
  new Promise((resolve, reject) => {
    registration.pushManager
      .getSubscription()
      .then(subscription => {
        if (subscription) {
          subscription.unsubscribe();
          resolve(true);
        } else {
          reject(false);
        }
      })
      .catch(err => {
        console.log("Error unsubscribing", err);
        reject(false);
      });
  });
