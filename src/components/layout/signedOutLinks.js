import React from 'react';
import { NavLink }  from 'react-router-dom';


const SignedOutLinks = () => {
  return(
    <ul className="navbar-nav">
      <li>
        <NavLink to="/signup" className="nav-link">Sign Up</NavLink>
      </li>

      <li>
        <NavLink to="/signin" className="nav-link">Sign In</NavLink>
      </li>
    </ul>
  )
}

export default SignedOutLinks;