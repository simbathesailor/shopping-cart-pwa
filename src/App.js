import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom"
import Cart from "dumbComponents/Cart"
import Results from "dumbComponents/Results/index"
import Checkout from "dumbComponents/Checkout"
import "./styles/base.css"
import './App.css';

class App extends Component {
  componentDidMount() {
    //React-helmet
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Cart />
        </header>
        <Switch>
          <Route exact path="/" component={Results}/>
          <Route exact path="/checkout" component={Checkout} />
        </Switch>
      </div>
    );
  }
}

export default App;
