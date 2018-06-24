import React, { Component } from 'react';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Home from './components/home.js';

const theme = createMuiTheme({
  palette: {
    primary: {
     'main': '#fff'
    },
    secondary: {
      'main': '#040461'
    },
    lightgray: {
      'main': '#dad7d7'
    }
  },
});
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Home />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
