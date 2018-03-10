import React, { Component } from 'react'
import * as firebase from "firebase";
import "./../Components.css";
import "./Login.css";
import Facebook from "react-icons/lib/fa/facebook";

export default class Login extends Component {

	handleClick() {
		var provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider)
			.then()
			.catch(function(error) {
			console.log(error.code);
			console.log(error.message);
		});
	}

	render () {
		return (
			<div className="container login">
				<button type="submit" onClick={() => this.handleClick()} className="button fbButton"><Facebook /><span> LOGIN WITH FACEBOOK</span></button>
			</div>
		)
	}
}
