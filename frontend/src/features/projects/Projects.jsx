import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import ProjectList from "./ProjectList";
import { useDispatch, useSelector } from "react-redux";
import { addNewProjectAsync, fetchProjectsAsync } from "./projectsSlice";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const { user } = useSelector((state) => state.auth);
  const { projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectsAsync(user?._id));
  }, [dispatch, user]);

  const handleCreateProject = async () => {
    setError(""); // Reset error
    if (!title) {
      setError("Please provide both title and description.");
      return;
    }

    try {
      const resultAction = await dispatch(
        addNewProjectAsync({ title, description, owner: user._id })
      );

      if (addNewProjectAsync.fulfilled.match(resultAction)) {
        setShowModal(false);
        setTitle("");
        setDescription("");
      } else {
        setError(resultAction.payload?.message || "Failed to create project.");
      }
    } catch (err) {
      console.log(err);
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Projects</h1>
        <button className="btn btn-danger" onClick={() => setShowModal(true)}>
          + Create Project
        </button>
      </div>

      <section>
        <ProjectList projects={projects} />
      </section>

      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setError("");
        }}
        title="Create New Project"
        footer={
          <>
            <button
              className="btn bg-danger-subtle text-danger"
              onClick={() => {
                setShowModal(false);
                setError("");
              }}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleCreateProject}>
              Create
            </button>
          </>
        }
      >
        {error && <div className="alert alert-danger py-2 px-3">{error}</div>}

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Project name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-100 form-control"
          placeholder="Description"
          rows={4}
          maxLength={50}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Projects;
