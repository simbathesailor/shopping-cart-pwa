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
//import registerServiceWorker from './registerServiceWorker';
// eslint-disable-next-line import/no-webpack-loader-syntax
//import "./service.worker.js"
//console.log("workerer", Worker)

const middlewares = [thunk];
let reduxDevTools = false;
//registerServiceWorker()
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
  console.log("now saving");
  sessionStorage.setItem("appState", JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={createBrowserHistory()}>
      <ScrollToTop>
        <button className="js-notify-btn">NotifyBtn</button>
        <button className="js-push-btn">Enable Push Messaging</button>
        <section
          class="js-sub-endpoint"
          style={{
            display: "none",
            width: "80%"
          }}
        >
          <h3>Subscription Object:</h3>
          <code class="js-subscription-json" />
          <br />
          <br />
          <br />
          <h3>Endpoint URL:</h3>
          <code class="js-endpoint-url" />
        </section>
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// const workerTasks = (() => {
//   if (!("Notification" in window)) {
//     console.log("This browser does not support notifications!");
//     return;
//   }

//   Notification.requestPermission(status => {
//     console.log("Notification permission status:", status);
//   });
// })();

// window.onload = function() {
// if ("serviceWorker" in navigator && "PushManager" in window) {
//   console.log("service Worker and push ios supported");

//   navigator.serviceWorker
//     .register("service.worker.js")
//     .then(swReg => {
//       console.log("servicve worker is regfistered", swReg);
//       // swRegistration = swReg
//       // initializeUI();
//     })
//     .catch(error => {
//       console.log("service worker error", error);
//     });
// } else {
//   console.warn("push notifications not supported");
//   // pushButton.textContent = "Push Not Supported"
// }
//   let deferredPrompt;
// window.addEventListener("beforeinstallprompt", event => {
//   // Prevent Chrome 67 and earlier from automatically showing the prompt
//   event.preventDefault();
//   console.log("event in beforeinstalprompt", event)
//   // Stash the event so it can be triggered later.
//   deferredPrompt = event;

//   // Attach the install prompt to a user gesture
//   document.querySelector("#installBtn").addEventListener("click", event => {
//     // Show the prompt
//     deferredPrompt.prompt();

//     // Wait for the user to respond to the prompt
//     deferredPrompt.userChoice.then(choiceResult => {
//       if (choiceResult.outcome === "accepted") {
//         console.log("User accepted the A2HS prompt");
//       } else {
//         console.log("User dismissed the A2HS prompt");
//       }
//       deferredPrompt = null;
//     });
//   });

//   // Update UI notify the user they can add to home screen
//   document.querySelector("#installBanner").style.display = "flex";
// });
// }

//registerServiceWorker();
let isSubscribed = false;
function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
function subscribeUser() {
  // TODO 3.4 - subscribe to the push service
  window.swRegistration.pushManager.subscribe({
    userVisibleOnly: true
  })
  .then(subscription => {
    console.log('User is subscribed:', subscription);
    updateSubscriptionOnServer(subscription);
    isSubscribed = true;
    updateBtn();
  })
  .catch(err => {
    if (Notification.permission === 'denied') {
      console.warn('Permission for notifications was denied');
    } else {
      console.error('Failed to subscribe the user: ', err);
    }
    updateBtn();
  });
}

function unsubscribeUser() {
  // TODO 3.5 - unsubscribe from the push service
  window.swRegistration.pushManager.getSubscription()
.then(subscription => {
  if (subscription) {
    return subscription.unsubscribe();
  }
})
.catch(err => {
  console.log('Error unsubscribing', err);
})
.then(() => {
  updateSubscriptionOnServer(null);
  console.log('User is unsubscribed');
  isSubscribed = false;
  updateBtn();
});
}

function updateSubscriptionOnServer(subscription) {
  // Here's where you would send the subscription to the application server

  const subscriptionJson = document.querySelector(".js-subscription-json");
  const endpointURL = document.querySelector(".js-endpoint-url");
  const subAndEndpoint = document.querySelector(".js-sub-endpoint");

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    endpointURL.textContent = subscription.endpoint;
    subAndEndpoint.style.display = "block";
  } else {
    subAndEndpoint.style.display = "none";
  }
}
let notifyButton = document.querySelector(".js-notify-btn");
let pushButton = document.querySelector(".js-push-btn");
function initializeUI() {
  // TODO 3.3b - add a click event listener to the "Enable Push" button
  // and get the subscription object
  pushButton.addEventListener("click", () => {
    pushButton.disabled = true;
    if (isSubscribed) {
      unsubscribeUser();
    } else {
      subscribeUser();
    }
  });

  window.swRegistration.pushManager.getSubscription().then(subscription => {
    isSubscribed = subscription !== null;
    updateSubscriptionOnServer(subscription);
    if (isSubscribed) {
      console.log("User IS subscribed.");
    } else {
      console.log("User is NOT subscribed.");
    }
    updateBtn();
  });
}
if ("serviceWorker" in navigator) {
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
      })
      .catch(err => {
        console.error("Service Worker Error", err);
      });
  });
} else {
  console.warn("Push messaging is not supported");
  // pushButton.textContent = 'Push Not Supported';
}
