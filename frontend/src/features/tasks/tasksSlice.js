import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";

// Thunk functions for client-side auth
export const fetchTasksAsync = createAsyncThunk(
  "fetch/tasks",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/tasks/${projectId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTaskAsync = createAsyncThunk(
  "create/task",
  async (task, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/tasks", task);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTaskAsync = createAsyncThunk(
  "update/task",
  async (task, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(`/tasks/${task._id}`, task);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTaskAsync = createAsyncThunk(
  "delete/task",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for authSlice
const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasksAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchTasksAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.tasks = action.payload.tasks;
    });

    builder.addCase(fetchTasksAsync.rejected, (state) => {
      state.status = "error";
      state.error = "Failed to fetch tasks";
      state.tasks = [];
    });

    builder.addCase(createTaskAsync.fulfilled, (state, action) => {
      state.tasks = [...state.tasks, action.payload.savedTask];
    });

    builder.addCase(updateTaskAsync.fulfilled, (state, action) => {
      const { updatedTask } = action.payload;
      state.tasks = state.tasks.map((task) => {
        if (task._id === updatedTask._id) {
          return updatedTask;
        }
        return task;
      });
    });

    builder.addCase(deleteTaskAsync.fulfilled, (state, action) => {
      const { deletedTask } = action.payload;
      state.tasks = state.tasks.filter((task) => task._id !== deletedTask._id);
    });
  },
});

export default tasksSlice.reducer;
