import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Cart from "dumbComponents/Cart";
import Results from "dumbComponents/Results/index";
import Checkout from "dumbComponents/Checkout";
import "./styles/base.css";
import "./App.css";

class App extends Component {
  state = {
    shouldShowFilter: false,
    isAdaptive: window && window.innerWidth <= 450,
    isOffline: false
  };
  componentDidMount() {
    //React-helmet
    // const isAdaptive = window.innerWidth <= 450;
    window.addEventListener("offline", () => {
      // alert("you are offline boy !!")
      this.setState({
        isOffline: true
      })
    })
    
    window.addEventListener("online", () => {
      // alert("Its good to have you back!!")
      this.setState({
        isOffline: false
      })
    })
    window.onresize = event => {
      if (event.target.innerWidth <= 450) {
        this.setState({
          isAdaptive: true
        });
      } else {
        this.setState({
          isAdaptive: false
        });
      }
    };
    /**
     * Work in progress, need to see how to modularize below code
     */
    // if (!('Notification' in window)) {
    //   console.log('This browser does not support notifications!');
    //   return;
    // }
    // Notification.requestPermission(status => {
    //   console.log('Notification permission status:', status);
    // });
    // if (Notification.permission == 'granted') {
    //   navigator.serviceWorker.getRegistration().then(reg => {
    
    //     // TODO 2.4 - Add 'options' object to configure the notification
    //     const options = {
    //       body: 'First notification!',
    //       icon: 'images/notification-flat.png',
    //       vibrate: [100, 50, 100],
    //       //tag: 'id1',  //This tag can be added so that notification will be removed
    //       //once new notification has arrived
    //       tag: "id1",
    //       data: {
    //         dateOfArrival: Date.now(),
    //         primaryKey: 1
    //       },
    //       actions: [
    //         {action: 'explore', title: 'Go to the site',
    //           icon: 'images/checkmark.png'},
    //         {action: 'close', title: 'Close the notification',
    //           icon: 'images/xmark.png'},
    //       ]
    //       // TODO 2.5 - add actions to the notification
        
    //       // TODO 5.1 - add a tag to the notification
        
    //     };
    //    // handling caching of manifest.json. should not happen ideally
    //     reg.showNotification('Hello world!', options);
    //   });
    // }
  }
  changeFilterShowStatus = status => {
    this.setState({
      shouldShowFilter: !this.state.shouldShowFilter
    });
  };
  // updateSubscriptionOnServer = (subscription) => {
  //   // Here's where you would send the subscription to the application server

  //   // const subscriptionJson = document.querySelector('.js-subscription-json');
  //   // const endpointURL = document.querySelector('.js-endpoint-url');
  //   // const subAndEndpoint = document.querySelector('.js-sub-endpoint');

  //   // if (subscription) {
  //   //   subscriptionJson.textContent = JSON.stringify(subscription);
  //   //   endpointURL.textContent = subscription.endpoint;
  //   //   subAndEndpoint.style.display = 'block';
  //   // } else {
  //   //   subAndEndpoint.style.display = 'none';
  //   // }
  //   // if (subscription) {
  //     subscriptionJson = JSON.stringify(subscription);
  //     endpointURL = subscription.endpoint;
  //     subAndEndpoint.style.display = 'block';
  //   // } else {
  //   //   subAndEndpoint.style.display = 'none';
  //   // }
  // }
  render() {
    const { shouldShowFilter, isAdaptive, isOffline } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          {isAdaptive && (
            <i className="fas fa-bars" onClick={this.changeFilterShowStatus} />
          )}
          <Cart />
        </header>
        <Switch>
          <Route
            exact
            path="/"
            render={props => {
              return (
                <Results
                  {...props}
                  shouldShowFilter={shouldShowFilter}
                  isAdaptive={isAdaptive}
                  changeFilterShowStatus={this.changeFilterShowStatus}
                />
              );
            }}
          />
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
        {isOffline && <div className="offline-section">
          You are offline !!
        </div>}
      </div>
    );
  }
}

export default App;
