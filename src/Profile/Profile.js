import React, { Component } from 'react';
import * as firebase from "firebase";
import "./../Components.css";
import "./Profile.css";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

export default class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      schoolName: ""
    };
    this.uid = firebase.auth().currentUser.uid;
		let ctx = this;
    firebase.database().ref('/users/' + this.uid).once('value').then(function(snapshot) {
      ctx.setState({ userInfo: snapshot.val() });
    });

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({schoolName: event});
  }

  handleSubmit(event) {
    const ctx = this;
    var fireBaseRef = this.database.ref("users/"+ctx.uid).push();
      fireBaseRef.set({
        email:  ctx.state.userInfo.email,
        displayName: ctx.state.userInfo.displayName,
        photoURL: ctx.state.userInfo.photoURL,
        school: ctx.state.schoolName
      });
      console.log("submited form");
    event.preventDefault();
  }

  //<input type="text" className="schoolField" value={this.state.schoolName} onChange={this.handleChange} />
  /*<Select
  name="schoolName"
  value={value}
  onChange={this.handleChange}
  options={[
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two' },
]}
/>*/
  render () {
    return (
      <div className="container profile">
        <form onSubmit={this.handleSubmit}>
          <label>
          Which school do you go to?:
          </label>
          <input type="submit" value="Save" className="button buttonSave"/>
        </form>
      </div>
    )
  }
}
