import React, { Component } from 'react'
import { connect } from 'react-redux';
import { createProject } from './../../store/actions/projectActions';
import { Redirect } from 'react-router-dom';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class CreateProject extends Component {

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

  validateInput = () => {
    if(this.state.title !== '' && this.state.content !== '' && this.state.category !== '' && this.state.contactEmail !== ''){
      return true;
    }else {
      this.setState({ validInput: false })
      return false;
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    }); 
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    if(this.validateInput()){
      let project = {
        title: this.state.title,
        content: this.state.content,
        category: this.state.category,
        contactEmail: this.state.contactEmail
      }
      this.props.createProject(project);
      this.props.history.push('/projects');   //redirect the user to projects page. History is given on the router by default
    }
  }

  // TODO: Validation when click one and then the other
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
     <Container>
       <Form onSubmit={this.handleSubmit}>
        <h3>Post New Project</h3>
        <hr />

        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Project Title" id="title" onChange={this.handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Contact Email</Form.Label>
          <Form.Control type="email" placeholder="Contact Email" id="contactEmail" onChange={this.handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" as="textarea" placeholder="Description" id="content" onChange={this.handleChange} />
        </Form.Group>

        <Form.Group>
          <Form.Check label="Simple Website" id="Simple Website" onChange={this.handleRadioButtons} />
          <Form.Check label="Web App" id="Web App" onChange={this.handleRadioButtons} />
          <Form.Check label="Mobile App" id="Mobile App" onChange={this.handleRadioButtons} />
          <Form.Check label="Other" id="Other" onChange={this.handleRadioButtons} />

        </Form.Group>


        <Button variant="primary" type="submit">
            Post!
        </Button>

        { this.state.validInput == null ? null : <Alert variant="danger"><p>Please Enter All Information</p></Alert> }
       </Form>
        
      </Container>
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
