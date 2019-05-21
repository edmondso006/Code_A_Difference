import React from 'react';
import Card  from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const ProjectSummary = ({project}) => {
  let shortDescription = project.content.slice(0, 300);
  let date = new Date(project.createdAt);
  return (
    <div style={{width: '96%', marginLeft: '2%', marginRight: '2%'}}>
      <Card style={{marginTop: '1rem'}}>
        <Card.Body>
          <Card.Title>
            { project.title }
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Posted By: { project.organizationName } <br />{ date.toLocaleDateString() }
          </Card.Subtitle>
          <Card.Text>
            { shortDescription.length >= 300 ? shortDescription + '...' : project.content }
          </Card.Text>
          <Link to={'/project/' + project.id}  key={project.id} >
            View Project
          </Link>
        </Card.Body>
      </Card>
    </div>
   

  )
}

export default ProjectSummary;