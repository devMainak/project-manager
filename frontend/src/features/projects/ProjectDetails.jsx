import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import TaskList from "../tasks/TaskList";
import Modal from "../../components/Modal"; // Assuming you're reusing your Modal component
import { deleteProjectAsync, updateProjectAsync } from "./projectsSlice";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projects);
  const project = projects.find((curr) => curr._id === projectId);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");

  if (!project) return <div>Loading project...</div>;

  const openModal = () => {
    setEditedTitle(project.title);
    setEditedDescription(project.description);
    setShowUpdateModal(true);
  };

  const handleUpdate = () => {
    dispatch(
      updateProjectAsync({
        ...project,
        title: editedTitle,
        description: editedDescription,
      })
    );
    setShowUpdateModal(false);
  };

  const handleDelete = (projectId) => {
    dispatch(deleteProjectAsync(projectId));
    navigate("/user/projects");
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <h1>{project.title}</h1>
          <p className="fst-italic fs-5">{project.description}</p>
        </div>
        <div className="d-flex gap-2 align-self-start">
          <button
            className="btn text-danger bg-danger-subtle"
            onClick={openModal}
          >
            Update
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(projectId)}
          >
            Delete
          </button>
        </div>
      </div>

      <section>
        <TaskList projectId={projectId} />
      </section>

      {/* Update Project Modal */}
      <Modal
        isOpen={showUpdateModal}
        onClose={() => setShowUpdateModal(false)}
        title="Update Project"
        footer={
          <>
            <button
              className="btn bg-danger-subtle text-danger"
              onClick={() => setShowUpdateModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleUpdate}>
              Save Changes
            </button>
          </>
        }
      >
        <input
          type="text"
          className="form-control mb-3"
          value={editedTitle}
          placeholder="Project Title"
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <textarea
          className="form-control"
          rows={3}
          value={editedDescription}
          placeholder="Project Description"
          onChange={(e) => setEditedDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default ProjectDetails;
