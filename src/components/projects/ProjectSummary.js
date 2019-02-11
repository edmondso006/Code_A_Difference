import React from 'react';
import Card  from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ProjectSummary = ({project}) => {
  return (
 
    <Card style={{ width: '36rem', marginTop: '1rem' }}>
      <Card.Header as="h5">{project.title}</Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">{project.organizationName}</Card.Subtitle>
        <Card.Text>
          {project.content.slice(0, 200).length >= 195 ? project.content.slice(0, 200) + '...' : project.content}
        </Card.Text>
        <Link to={'/project/' + project.id}  key={project.id} >
          <Button variant="primary">View Project!</Button>
        </Link>
      </Card.Body>
    </Card>

  )
}

export default ProjectSummary;