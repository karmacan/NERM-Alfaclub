import React from 'react';

import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

function Welcome(props) {
  if (props.isAuthed) return <Redirect to="/dashboard" />

  return (
    <div className="dev-landing">
      <div className="overlay-dark">
        <div className="dev-landing-inner">
          <h1 className="txt-l">Connect Proggrammers</h1>
          <p className="txt-m">Website for developers to create personal profiles, shere posts and communicate with other developers</p>
          {/* Button Panel */}
          <div className="case">
            <Link 
              to="/signup" 
              className="btn btn-round btn-primary">
              Register
            </Link>
            <Link 
              to="/login" 
              className="btn btn-round">
              Enter
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = rootState => {
  return {
    isAuthed: rootState.authReducer.isAuthed
  };
}

export default connect(mapStateToProps, null)(Welcome);
