import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from './../../store/actions/authActions';

//ReactStrap Imports
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class SignUp extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirm: '',
      organizationName: '',
      about: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  render() {
    const { authError, auth } = this.props;

    if(auth.uid) return <Redirect to="/" />

    return (

      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h3>Sign Up</h3>
          <hr />
          <Form.Text className="text-muted">
            Please use the form below to sign up your organization. Only Non-Profit organizations will be able to sign up.
          </Form.Text>
          <br />
          <Form.Group>
            <Form.Label>Organization Name</Form.Label>
            <Form.Control type="text" placeholder="Organization Name" id="organizationName" onChange={this.handleChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" id="email" onChange={this.handleChange} />  
          </Form.Group>

          <Form.Group >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" id="password" onChange={this.handleChange} />
          </Form.Group>

          <Form.Group >
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" id="passwordConfirm" onChange={this.handleChange} />
          </Form.Group>

          <Form.Group >
            <Form.Label>About Your Organization</Form.Label>
            <Form.Control type="text" as="textarea" placeholder="Tell us, and the developers about your organization (Mission Statement)" id="about" onChange={this.handleChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        {/* BUG: IF invalid login error will show in signup because there is not a difference between
          Login error and Signup error in reducer  */}
        { authError ? <Alert variant="danger"><p> { authError }</p></Alert> : null}
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
