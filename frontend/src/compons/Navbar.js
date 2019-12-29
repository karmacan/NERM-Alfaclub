import React from 'react';

function Navbar() {
  return (
    <nav className="dev-nav bg-dark">
    <h1>
      <a href="dashboard.html">
        <i className="fas fa-code"></i>
        <span>&nbsp;Dashboard</span>
      </a>
    </h1>
    {/* <h1>
      <a href="index.html">
        <i className="fas fa-code"></i>
        <span>&nbsp;Welcome</span>
      </a>
    </h1> */}
    <ul>
      <li><a href="profiles.html">Profiles</a></li>
      <li><a href="signup.html">Signup</a></li>
      <li><a href="login.html">Login</a></li>
    </ul>
  </nav>
  );
}

export default Navbar;
