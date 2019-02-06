import React from 'react';


const ProjectSummary = ({project}) => {
  return (
    <div className="card project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{project.title}</span>
        <p>Posted By: {project.organizationName}</p>
        <p className="grey-text">{project.createdAt.slice(0, 15)}</p>
      </div>
    </div>
  )
}

export default ProjectSummary;