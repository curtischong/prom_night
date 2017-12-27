import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import './App.css';
import logo from './logo.svg';
import * as firebase from "firebase";
import Login from "./Login";
import Logout from "./Logout";
import Header from "./Header";

class App extends Component {
  constructor(props){
    super(props);
    firebase.initializeApp({
      apiKey: "AIzaSyBCYWQZ-ktLbx3yb5fBAKGV83unD4DMJGc",
      authDomain: "prom-night-47dd1.firebaseapp.com",
      databaseURL: "https://prom-night-47dd1.firebaseio.com"
    });
    this.state = {
      signedIn: firebase.auth().currentUser,
      session: null
    }

  }
  componentDidMount(){
    const ctx = this;
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        ctx.setState({signedIn: true});
      } else {
        ctx.setState({signedIn: false});
      }
    });
  }
  load(key) {
    this.setState({ session: key });
  }
  exit() {
    this.setState({ session: null });
  }
  render() {

    let view = null;
    switch(this.state.signedIn){
      case false:
      view = <Login />;
      break;
      view = null;
      case true:
      break;
    }
    return <div className="App"><div className="header"><Header /></div><div className="body">{view}</div></div>;
  }
}

export default App;
