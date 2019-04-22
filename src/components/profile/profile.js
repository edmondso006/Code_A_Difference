import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersProjects } from '../../store/actions/projectActions';
import { updateProfile } from './../../store/actions/authActions';
import ProfileProject from './../profile/profileProject';
import { Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      updatedName: '',
      show: false
    }
  }

  componentDidMount(){
    const { auth } = this.props;
    if(auth.uid){
      this.props.getProjects();
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.props.profile);
    let updatedProfile = this.props.profile;
    updatedProfile.organizationName = this.state.updatedName;
    console.log(this.props.auth);
    this.props.updateProfile(this.props.auth.uid, updatedProfile);
    this.handleClose();
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render(){
    const { auth, profile, projects, authReducer} = this.props;
    console.log(authReducer);
    if(!auth.uid) return <Redirect to="/signin" />

    return (
      <Container style={{marginTop: '3rem'}}>
        <Card>
          <Card.Header as="h5" >Organization Profile Information</Card.Header>
          <Card.Body>
            <Card.Text>
              <span className="">Organization Name: {profile.organizationName}</span>
              <br />
              <span className="">Email: {auth.email}</span>
            </Card.Text>

            <Button onClick={this.handleShow}>Edit</Button>
          </Card.Body>
        </Card>
        { authReducer.updateError ? <Alert variant="danger">Error Updating Profile. Please try again later.</Alert> : null }

        <br />
        <h5>Your Organizations Projects:</h5>

        <div className="row">
          { projects && projects.map(project => {
            return (
              <div className="col s6" key={project.id}>
                <ProfileProject className="col s6" project={project} key={project.id} />
              </div>
              )
            })
          }
        </div>


        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Organization Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.handleSubmit} style={{marginTop: '0'}}>
              <Form.Group>
                <Form.Label>Organization Name</Form.Label>
                <Form.Control type="text" placeholder="Updated Organization Name" id="updatedName" onChange={this.handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projects: state.project.projects,
    authReducer: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => dispatch(getUsersProjects()),
    updateProfile: (profile, newInformation) => dispatch(updateProfile(profile, newInformation))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

