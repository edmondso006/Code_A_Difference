import React from 'react';
import { connect } from 'react-redux';
import { Link, NavLink }  from 'react-router-dom';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';

const NavBar = (props) => {
  const { profile, auth } = props;
  //console.log(auth);
  const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;


  return (
    
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">CodeADifference</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            { links }
          </ul>
        </div>
      </nav>
  )

}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(NavBar);