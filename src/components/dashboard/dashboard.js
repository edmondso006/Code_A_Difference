import React, { Component } from 'react';
import Notifications from './notifications';
import ProjectList from './../projects/projectList';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { stat } from 'fs';

class Dashboard extends Component {
  render(){
    //console.log(this.props);
    const { projects } = this.props;
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <ProjectList projects={projects}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
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
    { collection: 'projects' }
  ])
)(Dashboard);