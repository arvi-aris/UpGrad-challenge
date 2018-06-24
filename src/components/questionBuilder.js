import React, { Component } from 'react';
import BuildElements from './buildElements.js';

class QuestionBuilder extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      type: ''
  	};
  }

  buildQuestion = (changedDom) => {
    let selectedType = changedDom.target.value;
    this.setState({ 
      type: selectedType
    });
  };

  render() {
    return (
     <div className="margin-25"> 
      <div className="align-left bold margin-20"> Question Builder </div>
      <div className="question-builder-desc align-left bold margin-20"> What type of question you want to create ? </div>
          <div className="question-builder-area">
            <table>
              <tr>
                <td>
                  <input type="radio" name="questionType" id="mcq" value="mcq" onChange={this.buildQuestion}/>
                </td>
                <td className="align-left">
                  <label for="mcq">Multiple choice question</label> <br/>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="questionType" id="submission" value="submission" onChange={this.buildQuestion}/>
                </td>
                <td className="align-left">
                  <label for="submission">Submission type questions</label> <br/>
                </td>
              </tr>
              <tr>
                <td>
                  <input type="radio" name="questionType" id="passage" value="passage" onChange={this.buildQuestion}/>
                </td>
                <td className="align-left">
                  <label for="passage">Passage (text) type questions</label> <br/>
                </td>
              </tr>
            </table>
        </div>
        <div className="build-block">
            <BuildElements type={this.state.type} getQuestion={this.props.getQuestion}/>
        </div>
     </div>
    );
  }
}

export default QuestionBuilder;