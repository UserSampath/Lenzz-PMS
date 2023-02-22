const ProjectDetails = ({ project }) => {
  return (
    <div className="project-details">
      <p>{project.projectname}</p>
      <p>
        <strong>Description:</strong>
        {project.description}
      </p>
    </div>
  );
};

export default ProjectDetails;
