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
    this.state = {
      userList: []
    }
		let ctx = this;
    firebase.database().ref('/users/' + this.uid + '/list').once('value').then(function(snapshot) {
      ctx.calledFirebase = true;
      let arr = [];
      for(let theId in snapshot.val()){
        arr.push(snapshot.val()[theId]);
      }
      ctx.setState({ userList: arr});
      ctx.props.getUserData(arr);
    });
  }

  addPerson(theId){
    let flag = true;
    for(let i = 0; i < this.state.userList.length; i++){
      if(this.state.userList[i] == theId) flag = false;
    }
    if(flag){
      firebase.database().ref('/users/' + this.uid + '/list').push().set(theId);
      //let yourList = this.state.userList;
      this.state.userList.push(theId);
      //this.setState({userList: yourList});
      this.props.getUserData(this.state.userList);
    }
  }

  renderPerson(peopleList){
    //this.state.userList.push(cur);
    console.log(peopleList);
  }

  removePerson(cur){

  }

  renderNames(cur){
    return(
      <div className="nameItem">
        <div className="nameItemT">{cur}</div>
        <div className="nameItemX" onClick={i => this.removePerson(cur.id)}>x</div>
      </div>
    )
  }

  render () {
    const ctx = this;
    var nameElements = [];
    /*if(ctx.calledFirebase && ctx.state.userList != null){
      //this happens before the async call is finished
      let yourNames = ctx.state.userList;
      for(let i = 0; i < yourNames.length; i++){
        nameElements.push(ctx.renderNames(yourNames[i]));
        if(i < yourNames.length-1){
          nameElements.push(<hr className="splitHr"></hr>);
        }
      }
    }*/
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
