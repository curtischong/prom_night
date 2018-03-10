import React, { Component } from 'react'
import * as firebase from "firebase";
import "./../Components.css";
import "./Search.css";
//import ListItem from "./ListItem";
import Row from 'react-bootstrap/lib/Button';


export default class Search extends Component {

  constructor(props){
    super(props);
    this.uid = firebase.auth().currentUser.uid;
    this.calledFirebase = false;
		let ctx = this;
    this.state = {
      searchVal: ''
    };
    this.changeQuery = this.changeQuery.bind(this);
    firebase.database().ref('/people').once('value').then(function(snapshot) {
      ctx.calledFirebase = true;
      ctx.setState({ people: snapshot.val()});
    });
  }


  componentDidMount(){
    const ctx = this;
  }
  changeQuery(event){
    this.setState({searchVal: event.target.value});
  }

  render () {
    return (
      <div className="theSearch">
        <input type="text" value={this.state.searchVal} onChange={this.changeQuery}/>
      </div>
    )
  }
}
