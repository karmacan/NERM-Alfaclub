import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
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

export default Landing;
