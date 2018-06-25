import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class AssociatedQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList: [],
      noQues: false,
      questionSelected: false,
      questionDetail: {}
    };
  }

  componentDidMount () {
    let questionList = localStorage.getItem('questionList');
    if (questionList) {
      try {
        questionList = JSON.parse(questionList);
      }
      catch(e) {
        console.log(e);
      }
    }
    let studentList = localStorage.getItem('studentList');
    if (studentList) {
      try {
      this.studentList = JSON.parse(studentList);
      }
      catch(e) {
        console.log(e);
      }
    }
    this.questionList= questionList;
    let loggedIntudent = this.props.match.params.name;
    let studentListObj = this.studentList.find(student => {
      if (student.name === loggedIntudent) {
        return true;
      }
    });
    let associatedQues = studentListObj.assigned;
    if (!associatedQues) {
      this.setState({
        noQues: true
      })
      return;
    } else {
      associatedQues = associatedQues.map(Number);
      let assignedQuesList = this.questionList.filter((question, index) => {
        if (associatedQues.indexOf(index) > -1) {
          return true;
        } 
      });
      this.setState({
        questionList: assignedQuesList
      });
    }
  }

  cancel = () => {
    this.setState({
      questionSelected: false
    });
  }

  answer = (index) => {
    let questionDetail = this.state.questionList[index];
    this.setState({
      questionDetail: questionDetail,
      questionSelected: true
    })
  }

  submit = () => {
    let questionDetail = this.state.questionDetail;
    let type = questionDetail.type;
    let answer;
    if (type === 'mcq') {
      answer = document.querySelector('input[name="option"]:checked').value;
    } else if (type === 'passage') {
      answer = document.getElementById('q-answ').value;
    }
    axios.post('/answerQuestion', {
      questionDetail: questionDetail,
      answer: answer
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  render() {
    return (
     <div className="list-block">
        {!this.state.questionSelected && <div className="align-left bold margin-20"> Question list :: {this.props.match.params.name} </div>}
        {!this.state.questionSelected && <table>
        <tbody>
        {this.state.questionList.map((question, index) => {
          return (
                <tr>
                  <td className="q-col width-10">
                    <div className="ql-title color-gray">S.no </div>
                    <div className="ql-title color-gray">{index+1}</div>
                  </td>
                  <td className="q-col width-50">
                    <div className="ql-title align-left bold"> {question.title} </div>
                    <div className="ql-desc align-left"> {question.description.length < 20 ? question.description.length : question.description.slice(0, 17)+'...'} </div>
                  </td>
                  <td className="q-col width-20">
                    <div className="ql-title align-left bold color-gray">QUESTION TYPE</div>
                    <div className="ql-title align-left">{question.type}</div>
                  </td>
                  <td className="q-col width-20">
                    <Button variant="contained" color="secondary" onClick={this.answer.bind(this, index)} className="login-button">
                      Answer
                    </Button>
                  </td>
                </tr>
            )
        })}
        </tbody>
      </table> }
      {this.state.noQues && <div> No questions has been assigned to this user, Please contact your course administrator </div>}
      {this.state.questionSelected && <div className="align-left bold margin-20"> Answer :: {this.props.match.params.name}
        <div className="align-left margin-20"> <div className="align-left color-gray"> Title: </div>{this.state.questionDetail.title} </div>
        <div className="align-left margin-20"> <div className="align-left color-gray"> Description: </div>{this.state.questionDetail.description} </div>
        <div className="align-left margin-20"> <div className="align-left color-gray"> Instructions: </div>{this.state.questionDetail.instructions} </div>
        {this.state.questionDetail.options && <div className="align-left margin-20"><div className="align-left color-gray"> Options: </div><table> {this.state.questionDetail.options.map(option => {
          return (<tr>
            <td>
              <input type="radio" name="option" id={option} value={option} />
            </td>
            <td className="align-left">
              <label for={option}> {option}</label> <br/>
            </td>
          </tr>)
        })}</table></div>}
        {this.state.questionDetail.idealAnswer && <div className="align-left margin-20"><div className="align-left color-gray"> Answer: </div> <input type="text" className="answer-input" placeholder="Type your answer here .." id="q-answ"/></div>}
        {!this.state.questionDetail.options &&!this.state.questionDetail.idealAnswer && <div className="align-left margin-20"><div className="align-left color-gray"> Answer: </div> <input type="file" className="answer-input" placeholder="Type your answer here .." id="q-answ"/></div>}
        <br/><div className="right margin-20 ans-btn">
        <Button variant="contained" color="secondary" onClick={this.submit} className="left answer-btn">
          Submit
        </Button><Button variant="contained" color="primary" onClick={this.cancel} className="left answer-btn">
          Cancel
        </Button>
        </div>
      </div>}
     </div>

    );
  }
}

export default AssociatedQuestions;