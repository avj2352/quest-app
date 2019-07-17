import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { AppProvider } from './common/AppContext.jsx';
import * as serviceWorker from './serviceWorker';
import AdminLayout from './layouts/admin/Admin.jsx';
import Login from './views/auth/Login.jsx';

ReactDOM.render(
        <AppProvider>
            <Router>
                <Switch>
                    <Route path="/dasbhoard" render={props => <AdminLayout {...props} />} />
                    <Route path="/login" component = {Login} />
                    <Redirect from="/" to="/dasbhoard" />
                </Switch>
            </Router> 
        </AppProvider>, 
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
