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
import "worker-loader?name=./service-worker.js!./service-worker.js";

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
        <App />
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator && "PushManager" in window) {
  console.log("service Worker and push ios supported");

  navigator.serviceWorker
    .register("service-worker.js")
    .then(swReg => {
      console.log("servicve worker is regfistered", swReg);
      // swRegistration = swReg
      // initializeUI();
    })
    .catch(error => {
      console.log("service worker error", error);
    });
} else {
  console.warn("push notifications not supported");
  // pushButton.textContent = "Push Not Supported"
}

let deferredPrompt;
window.addEventListener("beforeinstallprompt", event => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  console.log("event in beforeinstalprompt", event)
  // Stash the event so it can be triggered later.
  deferredPrompt = event;

  // Attach the install prompt to a user gesture
  document.querySelector("#installBtn").addEventListener("click", event => {
    // Show the prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the A2HS prompt");
      } else {
        console.log("User dismissed the A2HS prompt");
      }
      deferredPrompt = null;
    });
  });

  // Update UI notify the user they can add to home screen
  document.querySelector("#installBanner").style.display = "flex";
});
//registerServiceWorker();
