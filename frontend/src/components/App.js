import React from 'react';
import { Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import PrivateRoute from './_routing/PrivateRoute';

import Navbar from './_layouts/Navbar';
import Alerts from './_layouts/Alerts';
import Welcome from './_landing/Welcome';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ProfileDashboard from './profile/ProfileDashboard';
import ProfileForm from './profile/ProfileForm';
import ProfileEduAdd from './profile/ProfileEduAdd';
import ProfileExpAdd from './profile/ProfileExpAdd';
import ProfileList from './profile/ProfileList';
import ProfileView from './profile/ProfileView';
import PostList from './post/PostList';

import { useEffect } from 'react'; // lifecycle hook

import { Provider } from 'react-redux';
import store from '../storage/store';
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
            {/*dev*/}<PrivateRoute exact path="/profile/dashboard" component={ProfileDashboard} />
            {/*dev*/}<PrivateRoute exact path="/profile/create" component={ProfileForm} />
            {/*dev*/}<PrivateRoute exact path="/profile/update" component={ProfileForm} />
            {/*dev*/}<PrivateRoute exact path="/profile/edu/add" component={ProfileEduAdd} />
            {/*dev*/}<PrivateRoute exact path="/profile/exp/add" component={ProfileExpAdd} />
            <Route exact path="/profiles" component={ProfileList} />
            <Route exact path="/profile/:user_id" component={ProfileView} />
            {/*dev*/}<PrivateRoute exact path="/posts" component={PostList} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
