import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut }from './../../store/actions/authActions';


const SignedInLinks = (props) => {
  return(
    <ul className="navbar-nav">
      <li>
      <NavLink to="/projects" className="nav-link">Projects</NavLink>
      </li>
      <li>
        <NavLink to="/create" className="nav-link">New Project</NavLink>
      </li>
      <li>
        <a onClick={props.signOut} className="nav-link">Logout</a>
      </li>
      <li>
        <NavLink to="/profile" profile={props.profile} className="nav-link">Profile</NavLink>
      </li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks);