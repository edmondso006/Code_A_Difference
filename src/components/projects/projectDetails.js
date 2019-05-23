import React from 'react';
import { connect } from 'react-redux';
import {  firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './projectDetails.css';


const ProjectDetails = (props) => {
  const { project } = props;
  console.log(props);
  if(project){
    return(
      
      <Container style={{marginTop: '1rem'}}>
        <Row>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  About {project.organizationName}
                </Card.Title>
                <Card.Text>
                  { project.about }
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={8}>
            <Card>
              <Card.Body>
                <Card.Title>
                  {project.title}
                </Card.Title>

                <Card.Text>
                  {project.content}
                  <br />
                  Contact Email: {project.contactEmail}
                </Card.Text>
              </Card.Body>

              <Card.Footer className="text-muted">
                  <div>Category: {project.category}</div>
                  <div>Posted by: {project.organizationName}</div>
                  {/* <div>Posted Date: {project.createdAt.slice(0, 15)}</div> */}
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      
        
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