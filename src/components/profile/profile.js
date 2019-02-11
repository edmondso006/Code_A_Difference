import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersProjects } from '../../store/actions/projectActions';
import ProfileProject from './../profile/profileProject';
import { Redirect } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

class Profile extends Component {

  componentDidMount(){
    const { auth } = this.props;
    if(auth.uid){
      this.props.getProjects();
    }
  }

  render(){
    const { auth, profile, projects} = this.props;
    // console.log(projects);
    // console.log(auth);
    // console.log(profile);
    
    if(!auth.uid) return <Redirect to="/signin" />


    return (
      <Container style={{marginTop: '1rem'}}>
        <Card>
          <Card.Header as="h5" >Organization Profile Information</Card.Header>
          <Card.Body>
            <Card.Text>
              <span className="">Organization Name: {profile.organizationName}</span>
              <br />
              <span className="">Email: {auth.email}</span>
            </Card.Text>

            <Card.Link href="#">Edit Information</Card.Link>
          </Card.Body>
        </Card>
      
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
      </Container>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projects: state.project.projects
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProjects: () => dispatch(getUsersProjects())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

