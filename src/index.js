import React from 'react';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk"
import { createLogger } from "redux-logger"
import './index.css';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createBrowserHistory from "history/createBrowserHistory"
import { Router } from "react-router-dom"
import app from './store';
import App from "./App"
import ScrollToTop from "shared/ScrollToTop"

const middlewares = [thunk]
//import registerServiceWorker from './registerServiceWorker';
let reduxDevTools = false
if (process.env.NODE_ENV === "development") {
  reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ //eslint-disable-line no-underscore-dangle
  middlewares.push(createLogger({
    level: "info",
    collapsed: true,
  }))
}
const composeEnhancers = reduxDevTools || compose
const enhancer = applyMiddleware(...middlewares)
let stateFromSession = {}
try {
	stateFromSession = JSON.parse(sessionStorage.getItem("appState")) || {}
} catch(e) {
	console.log("error")
}
const store = createStore(app, stateFromSession, composeEnhancers(enhancer));

window.addEventListener("unload", () => {
	console.log("now saving")
	sessionStorage.setItem("appState", JSON.stringify(store.getState()))
})


ReactDOM.render(
	<Provider store={store}>
		<Router history={createBrowserHistory()}>
			<ScrollToTop>
				<App />
			</ScrollToTop>
		</Router>
	</Provider>,
	document.getElementById('root')
);
//registerServiceWorker();
