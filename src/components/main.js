import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './login.js';
import Author from './author.js';
import Student from './student.js';
import AssociatedQuestions from './associatedQuestions.js';
import Header from './appBar.js';

class Main extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
	}
	render() {
		return(
			 <div><header>
	            <Route exact path='*' render={({history,location})  => (
	                <Header history={history} location={location} />
	            )}/>
	        </header>
			<main>
		    <Switch>
		      <Route exact path='/' component={Login}/>
		      <Route exact path='/author' component={Author}/>
		      <Route exact path='/student' component={Student}/>
		      <Route exact path='/student/:name' component={AssociatedQuestions}/>
		      <Route path="*" component={Login} />
		    </Switch>
		  </main></div>
		);
	}
}

export default Main;