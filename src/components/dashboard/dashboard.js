import React, { Component } from 'react';
import ProjectList from './../projects/projectList';
import GuideLines from './guideLines';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Dashboard extends Component {
  render(){
    const { projects } = this.props;
    return (
      <div className="bg-light">
        <Container className="bg-light">
          <Row>
            <Col sm={8}>
              <ProjectList projects={projects} />
            </Col>
            <Col sm={4}>
              <GuideLines />
            </Col>
          </Row>
        </Container>
      </div>
      
    )
  }
}
//Map state from store to the props
const mapStateToProps = (state) => {
  //Return what the props are going to be
  return {
    projects: state.firestore.ordered.projects,
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    //causes the firestore reducer to sync to projects collection
    { 
      collection: 'projects',
      orderBy: ['createdAt', 'desc']
    }
  ])
)(Dashboard);