import React, { Component } from 'react';
import Header from './appBar.js';
import Main from './main.js';

class Home extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	};
  }

  render() {
    return (
     <div>  
      <Main />
     </div>
    );
  }
}

export default Home;