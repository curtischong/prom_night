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
      searchVal: '',
      foundPpl: []
    };
    this.changeQuery = this.changeQuery.bind(this);
    firebase.database().ref('/people').once('value').then(function(snapshot) {
      ctx.calledFirebase = true;
      let thePpl = snapshot.val();
      let newArr = [];
      for(let element in thePpl){
        let temp = thePpl[element];
        temp.id = element
        newArr.push(temp);
      }
      newArr.sort(function(a,b){
        if(a.name >= b.name) return 1;
        return -1;
      });
      ctx.setState({ people: newArr});
      ctx.setState({foundPpl: newArr});
    });
  }


  componentDidMount(){
    const ctx = this;
  }

  lower_bound(lo, hi, target){
    while(lo < hi){
      let mid = parseInt(lo + (hi-lo)/2,10); // could replace with (lo+hi)/2 if too slow
      //console.log(this.state.people[mid].name.substring(0, target.length).toLowerCase() +" " + target.toLowerCase());
      //console.log(this.state.people[mid].name.substring(0, target.length).toLowerCase() >= target.toLowerCase());
      if (this.state.people[mid].name.substring(0, target.length).toLowerCase() >= target.toLowerCase()){ // this could be replaces with an array instead of a fucntion
        hi = mid;
      }else{
        lo = mid+1;
      }
    }
    return lo;
  }

  changeQuery(event){
    this.setState({searchVal: event.target.value});
    let start = this.lower_bound(0,this.state.people.length-1,event.target.value);
    let cur = start;
    let theQuery = [];
    while(this.state.people[cur].name.substring(0, event.target.value.length).toLowerCase() <= event.target.value.toLowerCase()){
      theQuery.push(this.state.people[cur]);
      cur++;
      if(cur == this.state.people.length) break;
    }
    this.setState({foundPpl:theQuery});
  }

  getUserData(theList){
    //I can't binary search for it because the names are sorted but not the ids
    //console.log(theId + "foundit");
    console.log(theList);
    let newList = [];
    for(var a = 0; a <theList.length;a++){
      let theId = theList[a];
      console.log("hi");
      for(var i = 0; i < this.state.foundPpl.length; i++){
        if(theId == this.state.foundPpl[i].id){
          newList.push(this.state.foundPpl[i]);
        }
      }
    }
    this.props.renderPerson(newList);
  }

  renderProfiles(cur){
    return(
      <div key={cur.id} className="profileItem" onClick={i => this.props.addPerson(cur.id)}>
      <img className="profileItemP" src={cur.photo}/>
      <div className="profileItemT">{cur.name}</div>
      </div>
    )
  }

  render () {
    const ctx = this;
    var profileElements = [];
    //this happens before the async call is finished
    //if(ctx.calledFirebase){
    var yourProfiles = ctx.state.foundPpl;
    for(var i = 0; i < yourProfiles.length; i++){
      //console.log(yourProfiles[i]);
      profileElements.push(ctx.renderProfiles(yourProfiles[i]));
      if(i < yourProfiles.length-1){
        profileElements.push(<hr key={yourProfiles[i].id + "1"} className="splitHr2"></hr>);
      }
    }
    //}
    return (
      <div className="theSearch">
      <input type="text" value={this.state.searchVal} onChange={this.changeQuery}/>
      <div className="resultsContainer">
      {profileElements}
      </div>
      </div>
    )
  }
}
