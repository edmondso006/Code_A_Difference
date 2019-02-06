import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProject } from './../../store/actions/projectActions';

class ProfileProject extends Component {

  constructor(props){
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.deleteProject(this.props.project)
  }

  render(){
    console.log(this.props.project);
    return (
      <div className="card s12 m6 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title">{this.props.project.title}</span>
          <div>Category: {this.props.project.category}</div>
          <div>{this.props.project.createdAt.slice(0, 15)}</div>
        </div>
  
        <div className="card-action grey lighten-4 grey-text">
          <a href="#" onClick={this.handleClick} className="right-align">Delete</a>
          <a href="#" className="right-align">Edit</a>
        </div>
      </div>
    )
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProject: (project) => dispatch(deleteProject(project))
  }
}

export default connect(null, mapDispatchToProps)(ProfileProject);