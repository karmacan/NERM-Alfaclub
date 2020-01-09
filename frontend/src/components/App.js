import React from 'react';
import { Fragment } from 'react';
import './App.css';

import { Provider } from 'react-redux';
import store from '../storage/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import _PrivateRoute from './_routing/PrivateRoute';

import Navbar from './_layouts/Navbar';
import Alerts from './_layouts/Alerts';
import Welcome from './_landing/Welcome';
import Login from './auth/Login';
import Signup from './auth/Signup';
import Dashboard from './dashboard/Dashboard';

import { useEffect } from 'react'; // lifecycle hook
import { userLoad } from '../storage/auth/authDispetcher';

function App() {
  ////////////////////////////////////////
  // LIFECYCLE HOOK

  useEffect(() => {
    //console.log('Component Did Mount (Updated)!');
    /*!!!*/store.dispatch(userLoad());
  }, []);

  ////////////////////////////////////////
  // RETURN JSX

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Welcome} />
          <Alerts />
          <Switch>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <_PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
