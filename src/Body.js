import React, { Component } from 'react'
import "./Components.css";
import "./Body.css";
import Profile from "./Profile/Profile";
import List from "./List/List";
import Search from "./Search/Search";

export default class Body extends Component {
  constructor(props){
    super(props);
    this.state = {
      page: 1
    }
  }
  componentWillMount(){
    const ctx = this;
  }
  componentDidMount(){

  }
  componentWillUnmount(){

  }
	render () {
    let view = null;
    if(this.state.page == 1) view = <div><List /><Search /></div>
    else view = <Profile />;
		return (
			<div className="container Body">
        {view}
			</div>
		)
	}
}
