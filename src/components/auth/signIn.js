import React, { Component } from 'react'
import { connect } from 'react-redux';
import { signIn } from './../../store/actions/authActions';
import { Redirect } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class SignIn extends Component {

  state = {
    email: '',
    password: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  render() {
    const { authError, auth } = this.props;

    if(auth.uid) return <Redirect to="/" />

    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h3>Sign In</h3>
          <hr />

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Email" id="email" onChange={this.handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id="password" onChange={this.handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>

        </Form>
        { authError ?<Alert variant="danger"><p> { authError }</p></Alert> : null}
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
