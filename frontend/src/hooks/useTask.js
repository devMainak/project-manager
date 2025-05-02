import { useDispatch, useSelector } from "react-redux";
import {
  createTaskAsync,
  deleteTaskAsync,
  fetchTasksAsync,
  updateTaskAsync,
} from "../features/tasks/tasksSlice";

const useTask = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const handleFetchTask = (projectId) => {
    dispatch(fetchTasksAsync(projectId));
  };

  const handleCreateTask = (task) => {
    dispatch(createTaskAsync(task));
  };

  const handleUpdateTask = (task) => {
    dispatch(updateTaskAsync(task));
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTaskAsync(taskId));
  };

  return {
    tasks,
    handleFetchTask,
    handleCreateTask,
    handleUpdateTask,
    handleDeleteTask,
  };
};

export default useTask;
