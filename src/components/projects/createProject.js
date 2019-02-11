import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createProject } from './../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

class CreateProject extends Component {

  state = {
    title: '',
    content: '',
    category: '',
    contactEmail: '',
    validInput: null
  }

  validateInput = () => {
    if(this.state.title !== '' && this.state.content !== '' && this.state.category !== '' && this.state.contactEmail !== ''){
      this.setState({
        validInput: true
      });
    } else {
      this.setState({
        validInput: false
      });
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit');
    this.validateInput();
    console.log(this.state);
    if(this.state.validInput){
      console.log('Valid Input: Creating project');
      let project = {
        title: this.state.title,
        content: this.state.content,
        category: this.state.category,
        contactEmail: this.state.contactEmail
      }
      this.props.createProject(project);
      this.props.history.push('/');   //redirect the user to home page. History is given on the router by default
    }
    
  }

  handleRadioButtons = (e) => {
    this.setState({
      category: e.target.id
    });
  }

  render() {
    const { auth } = this.props;
    if(!auth.uid) return <Redirect to="/signin" />
    console.log(this.state);

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Post New Project</h5>
          <div className="input-field">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" onChange={this.handleChange}/>
          </div>

          <div className="input-field">
            <label htmlFor="content">Project Details</label>
            <textarea className="materialize-textarea" id="content" onChange={this.handleChange}></textarea>
          </div>

          <div className="input-field">
            <label htmlFor="content">Contact Email</label>
            <input type="email" id="contactEmail" onChange={this.handleChange}/>
          </div>
          
          <p>
            <label>
              <input className="with-gap" id="Simple Website" name="group1" type="radio" onChange={this.handleRadioButtons}  />
              <span>Simple Website</span>
            </label>
          </p>

          <p>
            <label>
              <input className="with-gap" id="Web App" name="group1" type="radio" onChange={this.handleRadioButtons}  />
              <span>Web App</span>
            </label>
          </p>
 
          <p>
            <label>
              <input className="with-gap" id="Mobile App" name="group1" type="radio" onChange={this.handleRadioButtons} />
              <span>Mobile App</span>
            </label>
          </p>

          <div className="input-field">
            <button className="btn pink lighten-1 z-depth-0">Create</button>
          </div>

          <div className="red-text center">
            { this.state.validInput ? null : <p>Please Enter All Information</p> }
          </div>

        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return  {
    auth: state.firebase.auth
  }
}

const mapDispatchToProp = (dispatch) => {
  return {
    createProject: (project) => dispatch(createProject(project))  //Last part is the action creator
  }
}
                      //First param is mapStateToProps
export default connect(mapStateToProps, mapDispatchToProp)(CreateProject);
