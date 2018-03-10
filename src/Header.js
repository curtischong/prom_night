import React, { Component } from 'react'
import "./Components.css";
import "./Header.css";

export default class Header extends Component {
	render () {
		return (
			<div className="container header">
				<h1>Prom Night</h1>
				<p>How many dates can you go out with?</p>
			</div>
		)
	}
}
