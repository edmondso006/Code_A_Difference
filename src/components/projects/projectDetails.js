import React from 'react';
import { connect } from 'react-redux';
import {  firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import './projectDetails.css';


const ProjectDetails = (props) => {
  const { project } = props;
  
  if(project){
    return(
      <div className="container section project-details">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{project.title}</span>
            <p className="projectContent">{project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Category: {project.category}</div>
            <div>Posted by: {project.organizationName}</div>
            <div>{project.createdAt.slice(0, 15)}</div>
          </div>
        </div>
      </div>
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