import React from 'react';
import { Fragment } from 'react';
import './App.css';

import { Provider } from 'react-redux';
import store from '../storage/store';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';

import Navbar from './_layouts/Navbar';
import Alerts from './_layouts/Alerts';
import Landing from './auth/Landing';
import Login from './auth/Login';
import Signup from './auth/Signup';

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
