import React from 'react';

function Landing() {
  return (
    <div className="dev-landing">
      <div className="overlay-dark">
        <div className="dev-landing-inner">
          <h1 className="txt-l">Connect Proggrammers</h1>
          <p className="txt-m">Website for developers to create personal profiles, shere posts and communicate with other developers</p>
          {/* Button Panel */}
          <div className="case">
            <a 
              href="register.html" 
              className="btn btn-round btn-primary">
              Register
            </a>
            <a 
              href="login.html" 
              className="btn btn-round">
              Enter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
