import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AppContext } from './common/AppContext';
import Login from './views/login/Login.jsx';
import AdminLayout from './layouts/admin/AdminLayout.jsx';
import './App.css';

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { themePalette } = this.context;  
    return (
      <MuiThemeProvider theme={createMuiTheme({
        typography: {
            useNextVariants: true,
        },
        palette: {
            primary: purple,
            type: themePalette
        }
      })}>
        <div className="App">
        <Router>
                <Switch>
                    <Route path="/app" render={props => <AdminLayout {...props} />} />                    
                    <Route path="/login" component={Login} />                    
                    <Redirect from="/" to="/app" />
                </Switch>
        </Router>
        </div>
      </MuiThemeProvider>
    );
  }
  
}

App.contextType = AppContext;

export default App;
