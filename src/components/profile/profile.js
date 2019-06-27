import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersProjects } from '../../store/actions/projectActions';
import { updateProfile } from './../../store/actions/authActions';
import ProfileProject from './../profile/profileProject';
import { Redirect } from 'react-router-dom';
//React-strap imports 
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: false,
      name: '',
      about: '',
      profilePictureUrl: '',
    }
  }

  componentDidMount(){
    const { auth } = this.props;
    if(auth.uid){
      this.props.getProjects();
    }
  }

  //Forces the component to render and reset the state when the props are updated
  componentWillReceiveProps = (nextProps) => {
    this.setState({
      name: nextProps.profile.organizationName,
      about: nextProps.profile.about,
      profilePictureUrl: nextProps.profile.profilePictureUrl
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    if(this.state.name){
      e.preventDefault();
      let updatedProfile = this.props.profile;
      updatedProfile.organizationName = this.state.name;
      updatedProfile.about = this.state.about;
      this.props.updateProfile(this.props.auth.uid, updatedProfile);
      this.handleClose();
    }
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render(){
    const { auth, profile, projects, authReducer} = this.props;
    //If a user is not signed in return them to the sign in page
    if(!auth.uid) return <Redirect to="/signin" />

    return (
      <Container style={{marginTop: '3rem'}}>
        <Card>
          <Card.Body>
            
            <Card.Title>
              Organization Profile Information
            </Card.Title>

            <Container>
              <Row>
                <Col xs={4}>
                  <Card.Img src={this.state.profilePictureUrl} alt="ProfilePicture" />
                </Col>
                
                <Col xs={8}>
                  <Card.Text>
                      <span><span style={{fontWeight: '600'}}>Organization Name: </span>{profile.organizationName}</span>
                      <br />
                      <span><span style={{fontWeight: '600'}}>Email:  </span>{auth.email}</span>
                      <br />
                      <span><span style={{fontWeight: '600'}}>About your organization: </span>{profile.about}</span>
                   </Card.Text>

                  <Button onClick={this.handleShow}>Edit</Button>
                </Col>
                <Col xs={2}>

                </Col>
              </Row>
            </Container>
            
           
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
                <Form.Control type="text" placeholder="Updated Organization Name" id="name" value={this.state.name} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>About Organization</Form.Label>
                <Form.Control type="text" as="textarea" placeholder="Updated about organization" id="about" value={this.state.about} onChange={this.handleChange} />
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

