import React from 'react';
import ProjectSummary from './ProjectSummary';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const ProjectList = ({projects}) => {
  return (
    <div>
      { projects && projects.map(project => {
        return (
          <Row key={project.id}>
            <ProjectSummary project={project} />
          </Row>
        )
      })}
    </div>
  )
}

export default ProjectList;