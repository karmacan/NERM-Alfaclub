import React from 'react';
import { Fragment } from 'react';
import './App.css';

import { Provider } from 'react-redux';
import store from '../storage/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import Navbar from './_partials/Navbar';
import Alerts from './_partials/Alerts';
import Landing from './auth/Landing';
import Login from './auth/Login';
import Signup from './auth/Signup';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Alerts />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
