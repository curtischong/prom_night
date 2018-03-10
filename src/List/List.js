import React, { Component } from 'react'
import * as firebase from "firebase";
import "./../Components.css";
import "./List.css";
//import ListItem from "./ListItem";
import Row from 'react-bootstrap/lib/Button';


export default class List extends Component {

  constructor(props){
    super(props);
    this.uid = firebase.auth().currentUser.uid;
    this.calledFirebase = false;
		let ctx = this;
    firebase.database().ref('/users/' + this.uid + '/list').once('value').then(function(snapshot) {
      ctx.calledFirebase = true;
      ctx.setState({ userList: snapshot.val()});
    });
  }

  removePerson(i){

  }

  componentDidMount(){
    const ctx = this;
  }

  renderNames(cur){
    return(
      <div className="nameItem">
        <div className="nameItemT">{cur}</div>
        <div className="nameItemX" onClick={i => this.removePerson(i)}>x</div>
      </div>
    )
  }

  render () {
    const ctx = this;
    var nameElements = [];
    if(ctx.calledFirebase){
      //this happens before the async call is finished
      var yourNames = ctx.state.userList;
      for(var i = 0; i < yourNames.length; i++){
        nameElements.push(ctx.renderNames(yourNames[i]));
        if(i < yourNames.length-1){
          nameElements.push(<hr className="splitHr"></hr>);
        }
      }
    }
    return (
      <div className="theList">
      <div className="listTitle" >Your List</div>
      <div className="yourList">
      {nameElements}
      </div>
      </div>
    )
  }
}
