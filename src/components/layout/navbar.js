import React from 'react';
import { connect } from 'react-redux';
import { Link }  from 'react-router-dom';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import { Navbar, Nav } from 'react-bootstrap';

const NavBar = (props) => {
  const { profile, auth } = props;
  //console.log(auth);
  const links = auth.uid ? <SignedInLinks profile={profile}/> : <SignedOutLinks />;


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>CodeADifference</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <Nav>{ links }</Nav>
      </Nav> 
      </Navbar.Collapse>
    </Navbar>

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