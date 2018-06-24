import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from './logo.png'
import { Redirect } from 'react-router'

class Bar extends Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
  }

  logOut = () =>{
    this.props.history.push('/');
  }

  render() {
    return(
      <div className="bar">
        <AppBar position="static" color="primary">
          <Toolbar>
            <img className="logo" src={logo} />
            <span className="right margin-left-70 pointer" onClick={this.logOut}> Logout </span>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default Bar;