import React from 'react';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';

const ProjectList = ({projects}) => {
  return (
    <div>
    {/* Checking to make sure that there are projects and then mapping*/}
      { projects && projects.map(project => {
        return (
          <ProjectSummary project={project} key={project.id}/>
        )
      })}

    </div>
  )
}

export default ProjectList;