import React, { Component } from 'react';
import Notifications from './notifications';
import ProjectList from './../projects/projectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Dashboard extends Component {
  render(){
    const { projects } = this.props;
    return (
      <Container>
        <Row>
          <Col>
            <ProjectList projects={projects} />
          </Col>
          <Col>
            <Notifications />
          </Col>
        </Row>
      </Container>
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
    { collection: 'projects' }
  ])
)(Dashboard);