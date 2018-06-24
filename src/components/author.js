import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import QuestionBuilder from './questionBuilder.js';
import QuestionList from './questionList.js';

class Author extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      selectedTab: 'builder',
      questionList: []
  	};
  }

  handleChange = (event, value) => {
    this.setState({ 
      selectedTab: value 
    });
  };

  authorNewQuestion = () => {
    this.setState({ 
      selectedTab: 'builder' 
    });
  }

  getQuestion = (questionDetails) => {
    let questionList = this.state.questionList;
    questionList.push(questionDetails);
    this.setState({
      questionList: questionList
    })
    console.log(questionList);
    localStorage.setItem('questionList', JSON.stringify(questionList));
  }

  componentDidMount () {
    let questionList = localStorage.getItem('questionList');
    if (questionList) {
      try {
        questionList = JSON.parse(questionList);
        this.setState({
          questionList: questionList
        });
      }
      catch(e) {
        console.log(e);
      }
    }
  }

  render() {
    return (
     <div>
         <AppBar position="static" color="primary">
          <Tabs
            value={this.state.selectedTab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab value="builder" label="Question builder" className="tab"/>
            <Tab value="list" label="Question List" className="tab"/>
          </Tabs>
        </AppBar>
        {this.state.selectedTab === 'builder' && <QuestionBuilder getQuestion={this.getQuestion} />}
        {this.state.selectedTab === 'list' && <QuestionList questionList={this.state.questionList} authorNewQuestion={this.authorNewQuestion}/>}
     </div>
    );
  }
}

export default Author;