import React from 'react';
import { connect } from 'react-redux';
import {  firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import './projectDetails.css';


const ProjectDetails = (props) => {
  const { project } = props;
  
  if(project){
    return(
      <Container style={{marginTop: '1rem'}}>
        <Card>
          <Card.Header>Contact Email: {project.contactEmail}</Card.Header>
          <Card.Body>
            <Card.Title>
              {project.title}
            </Card.Title>

            <Card.Text>
              {project.content}
            </Card.Text>
          </Card.Body>

          <Card.Footer className="text-muted">
              <div>Category: {project.category}</div>
              <div>Posted by: {project.organizationName}</div>
              <div>Posted Date: {project.createdAt.slice(0, 15)}</div>
          </Card.Footer>
          
        </Card>
      </Container>
      
    )
  } else {
    return(
      <div className="container center">
        <p>Loading project...</p>
      </div> 
    )
  }
}

//State is from the store
//ownProps is the props of the component
const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[id] : null;
  return {
    project: project
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects' }
  ])
)(ProjectDetails);