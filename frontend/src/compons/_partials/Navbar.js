import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="dev-nav bg-dark">
    <h1>
      <Link to="/dashboard">
        <i className="fas fa-code"></i>
        <span>&nbsp;Dashboard</span>
      </Link>
    </h1>
    {/* <h1>
      <Link to="/">
        <i className="fas fa-code"></i>
        <span>&nbsp;Welcome</span>
      </Link>
    </h1> */}
    <ul>
      <li><Link to="/profiles">Profiles</Link></li>
      <li><Link to="/signup">Signup</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  </nav>
  );
}

export default Navbar;
