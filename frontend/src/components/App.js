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
import ProfileDashboard from './profile/ProfileDashboard';
import ProfileForm from './profile/ProfileForm';

import { useEffect } from 'react'; // lifecycle hook

import { userLoad } from '../storage/auth/authDispetcher';

function App() {
  ////////////////////////////////////////
  // COMPONENT DID HOOK

  useEffect(() => {
    //console.log('Component Did Mount/Updated!');
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
            <_PrivateRoute exact path="/profile/dashboard" component={ProfileDashboard} />
            <_PrivateRoute exact path="/profile/create" component={ProfileForm} />
            <_PrivateRoute exact path="/profile/update" component={ProfileForm} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
