import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { userLogout } from '../../storage/auth/authDispetcher';

function Navbar(props) {
  ////////////////////////////////////////
  // DYNAMIC MARKUP

  const ifElseIsAuthed = () => {
    if (props.isAuthed) return (
      <Fragment>
        <h1>
          <Link to="/dashboard">
            <i className="fas fa-code"></i>
            <span>&nbsp;Dashboard</span>
          </Link>
        </h1>
        <ul>
          <li><Link to="/profiles">Profiles</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li>
            <Link to="/" onClick={props.userLogout}>
              <i className="fa fa-sign-out"></i>
              <span className="hidden-s">&nbsp;Logout</span>
            </Link>
          </li>
        </ul>
      </Fragment>
    );
    else return (
      <Fragment>
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i>
            <span>&nbsp;Welcome</span>
          </Link>
        </h1>
        <ul>
          <li><Link to="/profiles">Profiles</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </Fragment>
    );
  }

  ////////////////////////////////////////
  // RETURN JSX

  return (
    <nav className="dev-nav bg-dark">
    { ifElseIsAuthed() }
  </nav>
  );
}

////////////////////////////////////////
// CONNECT REDUX

const mapStateToProps = rootState => {
  return {
    isAuthed: rootState.authReducer.isAuthed,
  };
};

const mapDispatcherToProps = {
  userLogout
};

export default connect(mapStateToProps, mapDispatcherToProps)(Navbar);
