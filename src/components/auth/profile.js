import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersProjects } from './../../store/actions/projectActions';
import ProfileProject from './../projects/profileProject';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';


class Profile extends Component {

  componentDidMount(){
    const { auth } = this.props;
    if(auth.uid){
      this.props.getProjects();
    }
  }

  render(){
    const { auth, profile, projects} = this.props;
    console.log(projects);
    // console.log(auth);
    // console.log(profile);
    
    if(!auth.uid) return <Redirect to="/signin" />


    return (
      <div>
        <div className="container section">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Orgnaization Profile Information</span>
              <span className="">Orgnaization Name: {profile.organizationName}</span>
              <br />
              <span className="">Email: {auth.email}</span>
              
            </div>
            <div className="card-action grey lighten-4 grey-text">
              <a href="#">Edit Information</a>
            </div>
          </div>

          <br />
          <h5>Your Projects:</h5>

            

          <div className="row">
            { projects && projects.map(project => {
                return (
                  <ProfileProject className="col s6" project={project} />
                )
              })
            }
          </div>
            
        </div>

        
      </div>

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

