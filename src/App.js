import React, { Component } from 'react';
import './App.css';
import logo from './logo.svg';
import * as firebase from "firebase";
import Login from "./Auth/Login";
import Logout from "./Auth/Logout";
import Header from "./Header";
import Body from "./Body";

class App extends Component {
  constructor(props){
    super(props);
    firebase.initializeApp({
      apiKey: "AIzaSyBCYWQZ-ktLbx3yb5fBAKGV83unD4DMJGc",
      authDomain: "prom-night-47dd1.firebaseapp.com",
      databaseURL: "https://prom-night-47dd1.firebaseio.com",
      projectId: "prom-night-47dd1",
      storageBucket: "prom-night-47dd1.appspot.com",
      messagingSenderId: "370395440055"
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
        /*ctx.setState({
          email: user.email,
          displayName : user.displayName,
          photoURL: user.photoURL,
        })*/
        ctx.uid = firebase.auth().currentUser.uid;
        var theEmail;
        firebase.database().ref("users/"+ctx.uid + "/email").once('value').then(function(snapshot){
          theEmail = snapshot.val();
          if(theEmail == null){
            firebase.database().ref("users/"+ctx.uid).set({
              email: user.email,
              displayName : user.displayName,
              photoURL: user.photoURL
            });
          }
        });

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
      case true:
      view = <div><Logout /><Body /></div>;
      break;
    }
    return <div className="App"><div className="header"><Header /></div><div className="body">{view}</div></div>;
  }
}

export default App;
