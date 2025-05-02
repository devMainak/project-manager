import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import useTask from "../../hooks/useTask";
import { useSelector } from "react-redux";

const TaskList = ({ projectId }) => {
  const { user } = useSelector((state) => state.auth);
  const {
    tasks,
    handleFetchTask,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
  } = useTask();

  const [selectedTask, setSelectedTask] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("To Do");
  const [updatedPriority, setUpdatedPriority] = useState("Medium");

  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    project: projectId,
    creator: user._id,
    status: "To Do",
    priority: "Medium",
  });

  useEffect(() => {
    handleFetchTask(projectId);
  }, [projectId]);

  const openEditModal = (task) => {
    setSelectedTask(task);
    setUpdatedName(task.name || "");
    setUpdatedDescription(task.description || "");
    setUpdatedStatus(task.status || "To Do");
    setUpdatedPriority(task.priority || "Medium");
  };

  const handleUpdate = () => {
    if (updatedName.trim()) {
      handleUpdateTask({
        ...selectedTask,
        name: updatedName,
        description: updatedDescription,
        status: updatedStatus,
        priority: updatedPriority,
      });
      setSelectedTask(null);
    }
  };

  const handleCreate = () => {
    if (newTask.name.trim()) {
      console.log(newTask);
      handleCreateTask(newTask);
      setNewTask({
        name: "",
        description: "",
        project: projectId,
        creator: user._id,
        status: "To Do",
        priority: "Medium",
      });
      setShowCreateModal(false);
    }
  };

  const handleDelete = (taskId) => {
    handleDeleteTask(taskId);
  };

  const toggleExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Tasks</h3>
        <button
          className="btn btn-danger"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Task
        </button>
      </div>

      {!tasks || tasks.length === 0 ? (
        <p className="text-center fs-5 fw-semibold">No tasks yet.</p>
      ) : (
        <ul className="list-group">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="list-group-item"
              style={{ cursor: "pointer" }}
              onClick={() => toggleExpand(task._id)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-semibold">{task.name}</span>
                <div>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(task);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(task._id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {expandedTaskId === task._id && (
                <div className="mt-3 ps-3">
                  {task.description && (
                    <p className="mb-1">
                      <strong>Description:</strong> {task.description}
                    </p>
                  )}
                  <p className="mb-1">
                    <strong>Status:</strong> {task.status}
                  </p>
                  <p className="mb-1">
                    <strong>Priority:</strong> {task.priority}
                  </p>
                  <p className="mb-1">
                    <strong>Created At:</strong>{" "}
                    {new Date(task.createdAt).toLocaleString()}
                  </p>
                  {task.status === "Completed" && (
                    <p className="mb-1">
                      <strong>Completed At:</strong>{" "}
                      {new Date(task.updatedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}

      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Task"
        footer={
          <>
            <button
              className="btn bg-danger-subtle text-danger"
              onClick={() => setShowCreateModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-danger" onClick={handleCreate}>
              Create
            </button>
          </>
        }
      >
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Task name"
          value={newTask.name}
          onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
        />
        <textarea
          className="form-control mb-3"
          placeholder="Description"
          rows={3}
          value={newTask.description}
          maxLength={50}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
        />
        <select
          className="form-select mb-3"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Blocked">Blocked</option>
        </select>
        <select
          className="form-select"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </Modal>

      {selectedTask && (
        <Modal
          isOpen={!!selectedTask}
          onClose={() => setSelectedTask(null)}
          title="Update Task"
          footer={
            <>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setSelectedTask(null)}
              >
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleUpdate}>
                Save Changes
              </button>
            </>
          }
        >
          <input
            type="text"
            className="form-control mb-3"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <textarea
            className="form-control mb-3"
            rows={4}
            value={updatedDescription}
            maxLength={50}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />
          <select
            className="form-select mb-3"
            value={updatedStatus}
            onChange={(e) => setUpdatedStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Blocked">Blocked</option>
          </select>
          <select
            className="form-select"
            value={updatedPriority}
            onChange={(e) => setUpdatedPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </Modal>
      )}
    </div>
  );
};

export default TaskList;
