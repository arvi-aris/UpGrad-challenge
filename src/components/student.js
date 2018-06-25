import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router'
import axios from 'axios';

class Student extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      student: '',
      studentList: [],
      redirect: ''
  	};
  }

  componentDidMount () {
    let studentList = localStorage.getItem('studentList');
    if (studentList) {
      try {
        studentList = JSON.parse(studentList);
      }
      catch(e) {
        studentList = [];
        console.log(e);
      }
    } else {
      //Hard-coding student list
      studentList = [{
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
      localStorage.setItem('studentList', JSON.stringify(studentList));
    }
    this.setState({
      studentList: studentList
    });
  }

  switchStudent = (changedDom) => {
    let student = changedDom.target.value;
    this.setState({
      student: student
    });
  }

  answerQuestions = () => {
    let student = this.state.student;
    this.setState({
      redirect: student
    })
  }

  render() {
    if (this.state.redirect) {
     return <Redirect to={'/student/'+this.state.redirect} />;
    }
    return (
     <div>  
    <Paper className="login" elevation={4}>
        <div className="login-box student-box">
          <div className="login-header"> Please Select student </div>
          <div>
            <div className="login-area">
              <table>
                <tbody>
                {this.state.studentList.map((student,index) => {
                  return (<tr key={index}>
                  <td>
                    <input type="radio" name="student" id={index} value={student.name} onChange={this.switchStudent}/>
                  </td>
                  <td className="align-left">
                    <label for={index}>{student.name}</label> <br/>
                  </td>
                </tr>)})}
                </tbody>
              </table>
            </div>
            <div>
              <div className="login-button-group">
                  <Button variant="contained" color="lightgray" onClick={this.cancelLogin} className="login-button">
                    Cancel
                  </Button>
                  <Button variant="contained" color="secondary" onClick={this.answerQuestions} disabled={!this.state.student} className="login-button">
                    Answer Questions
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </Paper>     
      </div>
    );
  }
}

export default Student;