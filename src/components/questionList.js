import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      enableAssign: false,
      assignModalOpen: false
    };
    this.studentList = [];
  }

  componentDidMount () {
    let studentList = localStorage.getItem('studentList');
    if (studentList) {
      try {
      this.studentList = JSON.parse(studentList);
      }
      catch(e) {
        console.log(e);
      }
    } else {
      //Hard-coding student list
      this.studentList = [{
        name: 'Will byers'
      }, {
        name: 'El strangino'
      }, {
        name: 'Khal drogo'
      }, {
        name: 'Dany Targaryan'
      }, {
        name: 'Robb Stark'
      }, {
        name: 'Sansa Stark'
      }, {
        name: 'Arya Stark'
      }, {
        name: 'Mike Wheeler'
      }, {
        name: 'Steve Harrington'
      }];
      localStorage.setItem('studentList', JSON.stringify(this.studentList));
    }
    this.studentList = Array.isArray(this.studentList) ? this.studentList : [];
  }

  authorNewQuestion = () => {
    this.props.authorNewQuestion();
  }

  assign = () => {
    this.setState({
      assignModalOpen: true
    });
  }

  cancel = () => {
    this.setState({
      assignModalOpen: false
    });
  }

  assignToCandidate = (studentId) => {
    let studentList = this.studentList;
    let student = this.studentList[studentId];
    let allCheckbox = Array.prototype.slice.call(document.getElementsByName('selectQuestion'));
    let assignedQues = allCheckbox.filter(checkbox => checkbox.checked).map(checkbox => checkbox.getAttribute('boxFor'));
    student.assigned = assignedQues;
    localStorage.setItem('studentList', JSON.stringify(studentList));
    this.cancel();
  }

  selectAll = (changedDom) => {
    let isChecked = changedDom.target.checked;
    let allCheckbox = Array.prototype.slice.call(document.getElementsByName('selectQuestion'));
    if (isChecked) {
      allCheckbox.forEach(checkbox => {
        checkbox.checked = true;
      });
    } else {
      allCheckbox.forEach(checkbox => {
        checkbox.checked = false;
      });
    }
    this.isSelected();
  }

  isSelected = () => {
    let allCheckbox = Array.prototype.slice.call(document.getElementsByName('selectQuestion'));
    let enableAssign = allCheckbox.some(checkbox => {
        if(checkbox.checked) {
          return true;
        }
      });
    this.setState({
      enableAssign: enableAssign
    });
  }

  render() {
    return (
     <div className="list-block">
        <div className="align-left bold margin-20"> Question list </div>
        <table>
        <tbody>
        <tr>
          <td>
            <input type="checkbox" name="selectAll" id="selectAll" className="question-select" onChange={this.selectAll}/>
          </td>
          <td className="color-gray">
            <label for="selectAll"> Select all </label>
          </td>
          <td className="q-col width-70">
            <div><span className="color-gray left"> Select questions to Assign </span>
            <Button variant="contained" color="secondary" onClick={this.assign} className="right" disabled={!this.state.enableAssign}>
              Assign
            </Button></div>
          </td>
          <td className="q-col width-20">
              <Button variant="contained" color="secondary" onClick={this.authorNewQuestion} className="login-button">
                Author New Question
              </Button>
          </td>
        </tr>
        {this.props.questionList.map((question, index) => {
          return (
                <tr key={index}>
                  <td>
                    <input type="checkbox" name="selectQuestion" boxFor={index} className="question-select" onChange={this.isSelected}/>
                  </td>
                  <td className="q-col width-10">
                    <div className="ql-title color-gray">S.no </div>
                    <div className="ql-title color-gray">{index+1}</div>
                  </td>
                  <td className="q-col width-60">
                    <div className="ql-title align-left bold"> {question.title} </div>
                    <div className="ql-desc align-left"> {question.description.length < 20 ? question.description : question.description.slice(0, 17)+'...'} </div>
                  </td>
                  <td className="q-col width-20">
                    <div className="ql-title align-left bold color-gray">QUESTION TYPE</div>
                    <div className="ql-title align-left">{question.type}</div>
                  </td>
                </tr>
            )
        })};
        </tbody>
      </table>
       <Dialog open={this.state.assignModalOpen} onClose={this.close} aria-labelledby="simple-dialog-title" >
        <DialogTitle id="simple-dialog-title">Choose student</DialogTitle>
        <div>
          <List>
            {this.studentList.map((student,index) => {
              return (
                <ListItem button onClick={this.assignToCandidate.bind(this, index)} key={index}>
                  {student.name}
                </ListItem>
              )
            })}
            <ListItem className="bg-gray" button onClick={this.cancel} key='cancel'>
                  Cancel
            </ListItem>
          </List>
        </div>
      </Dialog>
     </div>

    );
  }
}

export default QuestionList;