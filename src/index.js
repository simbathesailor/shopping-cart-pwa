import React from "react";
import ReactDOM from "react-dom";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createBrowserHistory from "history/createBrowserHistory";
import { Router } from "react-router-dom";
import app from "./store";
import App from "./App";
import ScrollToTop from "shared/ScrollToTop";
import { REACT_APP_PUSH_SUBSCRIPTION_PUBLIC_KEY, REACT_APP_PUSH_SUBSCRIPTION_URL } from "processenv";
import { askNotificationPermission } from "sw/notification";
import {
  subscribeUser,
  isSubscribedToPushNotification
} from "sw/pushNotificationsHelpers";

const middlewares = [thunk];
let reduxDevTools = false;

if (process.env.NODE_ENV === "development") {
  reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; //eslint-disable-line no-underscore-dangle
  middlewares.push(
    createLogger({
      level: "info",
      collapsed: true
    })
  );
}
const composeEnhancers = reduxDevTools || compose;
const enhancer = applyMiddleware(...middlewares);
let stateFromSession = {};
try {
  stateFromSession = JSON.parse(sessionStorage.getItem("appState")) || {};
} catch (e) {
  console.log("error");
}
const store = createStore(app, stateFromSession, composeEnhancers(enhancer));

window.addEventListener("unload", () => {
  sessionStorage.setItem("appState", JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <ScrollToTop>
        <button className="js-notify-btn">NotifyBtn</button>
        <button className="js-push-btn">Enable Push Messaging</button>
        {/* <section
          className="js-sub-endpoint"
          style={{
            display: "none",
            width: "80%"
          }}
        >
          <h3>Subscription Object:</h3>
          <code className="js-subscription-json" />
          <br />
          <br />
          <br />
          <h3>Endpoint URL:</h3>
          <code className="js-endpoint-url" />
        </section> */}
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById("root")
);

/**
 * pwa relate code below
 */
let isSubscribed = false;
// function urlB64ToUint8Array(base64String) {
//   const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
//   const base64 = (base64String + padding)
//     .replace(/\-/g, "+")
//     .replace(/_/g, "/");

//   const rawData = window.atob(base64);
//   const outputArray = new Uint8Array(rawData.length);

//   for (let i = 0; i < rawData.length; ++i) {
//     outputArray[i] = rawData.charCodeAt(i);
//   }
//   return outputArray;
// }
//vapid change 1
const applicationServerPublicKey = REACT_APP_PUSH_SUBSCRIPTION_PUBLIC_KEY;

// function updateBtn() {
//   if (Notification.permission === "denied") {
//     pushButton.textContent = "Push Messaging Blocked";
//     pushButton.disabled = true;
//     updateSubscriptionOnServer(null);
//     return;
//   }

//   if (isSubscribed) {
//     pushButton.textContent = "Disable Push Messaging";
//   } else {
//     pushButton.textContent = "Enable Push Messaging";
//   }

//   pushButton.disabled = false;
// }
// function subscribeUser() {
//   // TODO 3.4 - subscribe to the push service
//   //vapid change 2
//   const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
//   window.swRegistration.pushManager
//     .subscribe({
//       userVisibleOnly: true,
//       applicationServerKey: applicationServerKey //vapid change 3
//     })
//     .then(subscription => {
//       //backend api call to send subscription object
//       console.log("User is subscribed:", subscription);
//       updateSubscriptionOnServer(subscription);
//       isSubscribed = true;
//       updateBtn();
//     })
//     .catch(err => {
//       if (Notification.permission === "denied") {
//         console.warn("Permission for notifications was denied");
//       } else {
//         console.error("Failed to subscribe the user: ", err);
//       }
//       updateBtn();
//     });
// }

// function unsubscribeUser() {
//   // TODO 3.5 - unsubscribe from the push service
//   window.swRegistration.pushManager
//     .getSubscription()
//     .then(subscription => {
//       if (subscription) {
//         return subscription.unsubscribe();
//       }
//     })
//     .catch(err => {
//       console.log("Error unsubscribing", err);
//     })
//     .then(() => {
//       updateSubscriptionOnServer(null);
//       console.log("User is unsubscribed");
//       isSubscribed = false;
//       updateBtn();
//     });
// }

// function updateSubscriptionOnServer(subscription) {
//   // Here's where you would send the subscription to the application server

//   const subscriptionJson = document.querySelector(".js-subscription-json");
//   const endpointURL = document.querySelector(".js-endpoint-url");
//   const subAndEndpoint = document.querySelector(".js-sub-endpoint");

//   if (subscription) {
//     subscriptionJson.textContent = JSON.stringify(subscription);
//     endpointURL.textContent = subscription.endpoint;
//     console.log("subscription", JSON.stringify(subscription));
//     console.log("endpointURL", subscription.endpoint);
//     //subAndEndpoint.style.display = "block"; //can be used for testing
//   } else {
//     subAndEndpoint.style.display = "none";
//   }
// }
let notifyButton = document.querySelector(".js-notify-btn");
let pushButton = document.querySelector(".js-push-btn");
function initializeUI() {
  // TODO 3.3b - add a click event listener to the "Enable Push" button
  // and get the subscription object
  // pushButton.addEventListener("click", () => {
  //   pushButton.disabled = true;
  //   if (isSubscribed) {
  //     unsubscribeUser();
  //   } else {
  //     subscribeUser();
  //   }
  // });
  // window.swRegistration.pushManager.getSubscription().then(subscription => {
  //   isSubscribed = subscription !== null;
  //   updateSubscriptionOnServer(subscription);
  //   if (isSubscribed) {
  //     console.log("User IS subscribed.");
  //   } else {
  //     console.log("User is NOT subscribed.");
  //   }
  //   updateBtn();
  // });
}

if (("serviceWorker" in navigator) && window) {
  window.addEventListener("load", () => {
    console.log("Service Worker and Push is supported");

    navigator.serviceWorker
      .register("service.worker.js")
      .then(swReg => {
        console.log("Service Worker is registered", swReg);

        window.swRegistration = swReg;
        //need to find correct way of doing it as if now, no idea how would
        // i share the swRegistration object across different file implementing
        //feature like notification and push

        // TODO 3.3a - call the initializeUI() function
        initializeUI();
        askNotificationPermission().then(async status => {
          console.log("status", status);
          if (status === "granted") {
            //console.log(":isSubscribedToPushNotification(window.swRegistration)", isSubscribedToPushNotification(window.swRegistration))
            if (isSubscribedToPushNotification(window.swRegistration)) {
              const subscriptionObject = await subscribeUser({
                applicationServerPublicKey
              }).catch(e => {
                return null;
              });
              console.log("subscriptionObject  ===>", subscriptionObject);
              if (subscriptionObject) {
                fetch(`${REACT_APP_PUSH_SUBSCRIPTION_URL}/subscribe-web-push`, {
                  method: "POST",
                  body: JSON.stringify({
                    email: "test@test.com",
                    subscription: subscriptionObject
                  }),
                  headers: {
                    "Content-Type": "application/json"
                  }
                });
              }
            }
          }
        });
      })
      .catch(err => {
        console.error("Service Worker Error", err);
      });
  });
} else {
  console.warn("Service worker not supported!!");
  // pushButton.textContent = 'Push Not Supported';
}
