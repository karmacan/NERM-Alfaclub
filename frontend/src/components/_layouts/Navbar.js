import React, { Fragment } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { userLogout } from '../../storage/auth/authDispetcher';

function Navbar(props) {
  ////////////////////////////////////////
  /// DYNAMIC MARKUP

  const ifElseIsAuthed = () => {
    if (props.isAuthed) return (
      <Fragment>
        
          <Link to="/profile/dashboard">
            <h1 className='logo'>
              {/* <i className="fas fa-code"></i> */}
              <div className="logo-icon"></div>
              <span>&nbsp;Дашборд</span>
            </h1>
          </Link>
        <ul>
          <li><Link to="/profiles">Профайлы</Link></li>
          <li><Link to="/posts">Посты</Link></li>
          <li>
            <Link to="/" onClick={props.userLogout}>
              <i className="fa fa-sign-out"></i>
              <span className="hidden-s">&nbsp;Выйти</span>
            </Link>
          </li>
        </ul>
      </Fragment>
    );
    else return (
      <Fragment>
          <Link to="/">
            <h1 className='logo'>
              {/* <i className="fas fa-code"></i> */}
              <div className="logo-icon"></div>
              <div className='logo-name'>AlfaClub (Beta)</div>
            </h1>
          </Link>
        <ul>
          <li><Link to="/profiles">Профайлы</Link></li>
          <li><Link to="/signup">Зарегистрироваться</Link></li>
          <li><Link to="/login">Войти</Link></li>
        </ul>
      </Fragment>
    );
  }

  ////////////////////////////////////////
  /// RETURN JSX

  return (
    <nav className="dev-nav bg-dark">
      { ifElseIsAuthed() }
    </nav>
  );
}

////////////////////////////////////////
/// CONNECT REDUX

const mapStateToProps = rootState => {
  return {
    isAuthed: rootState.authReducer.isAuthed,
  };
};

const mapDispatcherToProps = {
  userLogout
};

export default connect(mapStateToProps, mapDispatcherToProps)(Navbar);
