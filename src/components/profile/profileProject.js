import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteProject } from '../../store/actions/projectActions';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class ProfileProject extends Component {

  constructor(props){
    super(props);
    this.state = {
      deleteConfirm: false,
      show: false
    }
  }

  handleClose = () =>{
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }


  handleClick = (e) => {          
    {/* TODO: Alert are you sure you want to delete box */}
    e.preventDefault();
    this.props.deleteProject(this.props.project);
    this.setState({ show: false })
  }

  render(){
    return (
      <div>
        <Card style={{ marginTop: '1rem' }}>
          <Card.Header as="h5">{this.props.project.title}</Card.Header>

          <Card.Body>
            <Card.Subtitle className="mb-2 text-muted">{this.props.project.category}</Card.Subtitle>

            <Card.Text>
              Category: {this.props.project.category}
              {this.props.project.createdAt.slice(0, 15)}
            </Card.Text>
          </Card.Body>

          <Card.Body>
            <a onClick={this.handleShow} className="card-link">Delete</a>
            <Link to={'/edit/' + this.props.project.id} className="card-link">Edit</Link>
            <Link to={'/project/' + this.props.project.id} className="card-link">
              View
            </Link>
          </Card.Body>
        </Card>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Warning</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              No
            </Button>
            <Button variant="primary" onClick={this.handleClick}>
              Yes
            </Button>
          </Modal.Footer>
        </Modal>

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