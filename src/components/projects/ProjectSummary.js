import React from 'react';
import Card  from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ProjectSummary = ({project}) => {
  return (
 
    <Card style={{ width: '36rem', marginTop: '1rem' }}>
      <Card.Body>
        <Card.Title>{project.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{project.organizationName}</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the bulk of
          the card's content.
        </Card.Text>
        <Link to={'/project/' + project.id}  key={project.id} >
          <Button variant="primary">View Project!</Button>
        </Link>
      </Card.Body>
    </Card>

    // <div className="card project-summary">
    //   <div className="card-content grey-text text-darken-3">
    //     <span className="card-title">{project.title}</span>
    //     <p>Posted By: {project.organizationName}</p>
    //     <p className="grey-text">{project.createdAt.slice(0, 15)}</p>
    //   </div>
    // </div>
  )
}

export default ProjectSummary;