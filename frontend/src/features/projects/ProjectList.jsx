import { Link } from "react-router-dom";

const ProjectList = ({ projects }) => {
  return projects.length > 0 ? (
    <div className="row">
      {projects.map((project) => {
        return (
          <div key={project._id} className="col-md-4 mb-3">
            <Link
              to={`${project._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="card bg-danger-subtle">
                <div className="card-body">
                  <h4 className="card-title text-danger">{project.title}</h4>
                  <p className="card-text">{project.description}</p>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  ) : (
    <p className="fs-5 fw-semibold text-center">Add projects to see here.</p>
  );
};

export default ProjectList;
