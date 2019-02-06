import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';

const ProjectList = ({projects}) => {
  return (
    <div className="project-list section">
    {/* Checking to make sure that there are projects and then mapping*/}
      { projects && projects.map(project => {
        return (
          <Link to={'/project/' + project.id}  key={project.id} >
            <ProjectSummary project={project} />
          </Link>
        )
      })}

    </div>
  )
}

export default ProjectList;