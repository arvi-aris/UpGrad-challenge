import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router'

class Login extends Component {
  constructor(props) {
  	super(props);
  	this.state = {
      user: '',
      Redirect: null
  	};
  }

  switchUser = (changedDom) => {
    let user = changedDom.target.value;
    this.setState({
      user: user
    });
  }

  cancelLogin = () => {
    var radioBtns = document.getElementsByName("user");
    for(var i=0;i<radioBtns.length;i++)
      radioBtns[i].checked = false;
    this.setState({
      user: ""
    });
  }

  Login = () => {
    let selectedUser = this.state.user;
    this.setState({
      redirect: selectedUser
    });
  }

  render() {
    if (this.state.redirect) {
     return <Redirect to={'/'+this.state.redirect} />;
    }
    return (
     <Paper className="login" elevation={4}>
        <div className="login-box">
          <div className="login-header"> Please Select Login </div>
          <div>
            <div className="login-desc"> I am a.. </div>
            <div className="login-area">
              <table>
                <tr>
                  <td>
                    <input type="radio" name="user" id="male" value="author" onChange={this.switchUser}/>
                  </td>
                  <td className="align-left">
                    <label for="male">Author</label> <br/>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="radio" name="user" id="female" value="student" onChange={this.switchUser}/>
                  </td>
                  <td className="align-left">
                    <label for="female">Student</label> <br/>
                  </td>
                </tr>
              </table>
            </div>
            <div>
              <div className="login-text"> 
                Please login to continue
              </div>
              <div className="login-button-group">
                  <Button variant="contained" color="lightgray" onClick={this.cancelLogin} className="login-button">
                    Cancel
                  </Button>
                  <Button variant="contained" color="secondary" onClick={this.Login} disabled={!this.state.user} className="login-button">
                    Login
                  </Button>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default Login;