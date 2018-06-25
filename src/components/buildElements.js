import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import axios from 'axios';

class BuildElements extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
  	};
  }

  authorNewQuestion = () => {
    let type = this.props.type;
    let questionDetails = {};
    let title = document.getElementById('q-title').value;
    let description = document.getElementById('q-desc').value;
    let instructions = document.getElementById('q-inst').value; 
    switch (type) {
      case "mcq" : {
        let options = Array.prototype.slice.call(document.getElementsByClassName('option')).map((input) => input.value);
        let rightAnswer = Array.prototype.slice.call(document.getElementsByName('rightAnswer')).filter(input => input.checked).map(input => {
          let id = input.getAttribute('boxFor');
          return document.getElementById(id).value;
        });
        questionDetails = {type, title, description, instructions, options, rightAnswer};
        break;
      }
      case "passage" : {
        let idealAnswer = document.getElementById('q-ideal').value;
        questionDetails = {type, title, description, instructions, idealAnswer};
        break;
      }
      case "submission" : {
        questionDetails = {type, title, description, instructions};
        break;
      }
    }
    this.props.getQuestion(questionDetails);
    this.reset();
    axios.post('/buildQuestion', questionDetails)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  reset = () => {
    document.getElementById("quesionBuilder").reset();
  };

  render() {
    return (
     <div>
      <form id="quesionBuilder">
        <div className="q-block">
        { this.props.type && <div>
          <div><label for="q-title" className="question-label">Question Title:</label> </div>
          <div className="question-div"><input type="text" className="question-input" placeholder="Type your question title here .." id="q-title"/> </div>
        </div> }
        { this.props.type && <div>
          <div><label for="q-desc" className="question-label">Question Description:</label> </div>
          <div className="question-div"><input type="text" className="question-input" placeholder="Type your question description here .." id="q-desc"/> </div>
        </div> }
        { this.props.type === 'passage' && <div>
          <div><label for="q-ideal" className="question-label">Ideal Answer:</label> </div>
          <div className="question-div"><input type="text" className="question-input" placeholder="Type your answer here .." id="q-ideal"/> </div>
        </div> }
        { this.props.type === 'mcq' && <div>
          <table>
            <tbody>
              <tr> 
                <td className="option-area">
                  <label for="q-options" className="question-label">Answer Options:</label>
                </td>
                <td>
                  <label for="q-options" className="question-label">Right Answers:</label> 
                </td>
              </tr>
              <tr> 
                <td className="option-area">
                  <div className="question-div"><input type="text" className="question-input option-input option" placeholder="Type option A here .." id="q-optionA"/> </div>
                </td>
                <td>
                  <input type="checkbox" name="rightAnswer" boxFor='q-optionA' className="question-input"/>
                </td>
              </tr>
              <tr> 
                <td className="option-area">
                  <div className="question-div"><input type="text" className="question-input option option-input" placeholder="Type option B here .." id="q-optionB"/> </div>
                </td>
                <td>
                  <input type="checkbox" name="rightAnswer" boxFor='q-optionB' className="question-input"/>
                </td>
              </tr>
              <tr> 
                <td className="option-area">
                  <div className="question-div"><input type="text" className="question-input option option-input" placeholder="Type option C here .." id="q-optionC"/> </div>
                </td>
                <td>
                  <input type="checkbox" name="rightAnswer" boxFor='q-optionC' className="question-input"/>
                </td>
              </tr>
              <tr> 
                <td className="option-area">
                  <div className="question-div"><input type="text" className="question-input option option-input" placeholder="Type option D here .." id="q-optionD"/> </div>
                </td>
                <td>
                  <input type="checkbox" name="rightAnswer" boxFor='q-optionD' className="question-input"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div> }
        { this.props.type && <div>
          <div><label for="q-inst" className="question-label">Instructions:</label> </div>
          <div className="question-div"><input type="text" className="question-input" placeholder="Type instructions here ..(e.g. file size, file format, do's and dont's etc.)" id="q-inst"/> </div>
        </div> }  </div>
        <div className="q-btns">
          <div className="login-text"> 
            Click author to create a new question and will be automatically added to the question list
          </div>
          <div className="login-button-group">
              <Button variant="contained" color="lightgray" onClick={this.cancel} className="login-button">
                Cancel
              </Button>
              <Button variant="contained" color="secondary" onClick={this.authorNewQuestion} disabled={!this.props.type} className="login-button">
                Author
              </Button>
          </div>
          </div>
       </form>
     </div>
    );
  }
}

export default BuildElements;