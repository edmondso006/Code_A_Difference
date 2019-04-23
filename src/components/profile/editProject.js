import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { updateProject } from './../../store/actions/projectActions';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class EditProject extends Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            content: '',
            category: '',
            contactEmail: '',
            validInput: null
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.id]: e.target.value
        }); 
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //TODO: Validate input
        if(this.validateInput()){
          let updatedProject = {
            title: this.state.title,
            content: this.state.content,
            category: this.state.category,
            contactEmail: this.state.contactEmail
          }
          this.props.updateProject(this.props.match.params.id, updatedProject);
          if(!this.props.projectReducer.updateProjectError){
            this.props.history.push('/profile');   
          }
        }
        
    }

    // TODO: Validation when click one and then the other
    handleRadioButtons = (e) => {
      this.setState({
        category: e.target.id
      });
    }

    validateInput = () => {
      if(this.state.title !== '' && this.state.content !== '' && this.state.category !== '' && this.state.contactEmail !== ''){
        return true;
      }else {
        this.setState({ validInput: false });
        return false;
      }
    }

    render(){
        const { auth, project } = this.props;
        console.log(this.props.match.params.id);
        console.log(this.props);
        if(!auth.uid) return <Redirect to="/signin" />

        if(project){     
            return (
                <Container>
                    <Form onSubmit={this.handleSubmit}>
                    <h3>Edit Project</h3>
                    <hr />

                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" id="title" defaultValue={this.props.project.title} onChange={this.handleChange}  />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Contact Email</Form.Label>
                        <Form.Control type="email"  id="contactEmail"  defaultValue={this.props.project.contactEmail} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" as="textarea" id="content" defaultValue={this.props.project.content}onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Check label="Simple Website" id="Simple Website" onChange={this.handleRadioButtons} />
                        <Form.Check label="Web App" id="Web App" onChange={this.handleRadioButtons} />
                        <Form.Check label="Mobile App" id="Mobile App" onChange={this.handleRadioButtons} />
                        <Form.Check label="Other" id="Other" onChange={this.handleRadioButtons} />
                    </Form.Group>


                    <Button variant="primary" type="submit">
                        Update
                    </Button>
                    { this.props.projectReducer.updateProjectError ? <Alert variant="danger">Error Updating Project. Please try again later.</Alert> : null }
                    { this.state.validInput == null ? null : <Alert variant="danger"><p>Please Enter All Information</p></Alert> }
                </Form>
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
}


const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return {
      auth: state.firebase.auth,
      profile: state.firebase.profile,
      projects: state.project.projects,
      project: project,
      projectReducer: state.project
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        updateProject: (projectID, updatedProject) => dispatch(updateProject(projectID, updatedProject))
    }
  }
  
  export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      { collection: 'projects' }
    ])
  )(EditProject);
  