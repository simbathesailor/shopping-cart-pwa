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
    isAdaptive: window && window.innerWidth <= 450
  };
  componentDidMount() {
    //React-helmet
    // const isAdaptive = window.innerWidth <= 450;
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
  }
  changeFilterShowStatus = status => {
    this.setState({
      shouldShowFilter: !this.state.shouldShowFilter
    });
  };
  render() {
    const { shouldShowFilter, isAdaptive } = this.state;
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
      </div>
    );
  }
}

export default App;
