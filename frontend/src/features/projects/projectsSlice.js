import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../utils/apiClient";

// Thunk functions for client-side auth
export const fetchProjectsAsync = createAsyncThunk(
  "fetch/projects",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/projects/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewProjectAsync = createAsyncThunk(
  "create/project",
  async (project, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/projects", project);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProjectAsync = createAsyncThunk(
  "update/project",
  async (project, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(
        `/projects/${project._id}`,
        project
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProjectAsync = createAsyncThunk(
  "delete/project",
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/projects/${projectId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for authSlice
const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjectsAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchProjectsAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.projects = action.payload.projects;
    });

    builder.addCase(fetchProjectsAsync.rejected, (state) => {
      state.status = "error";
      state.projects = [];
      state.error = "Failed to fetch projects";
    });

    builder.addCase(addNewProjectAsync.fulfilled, (state, action) => {
      state.projects = [...state.projects, action.payload.savedProject];
    });

    builder.addCase(updateProjectAsync.fulfilled, (state, action) => {
      const { updatedProject } = action.payload;
      state.projects = state.projects.map((project) => {
        if (project._id === updatedProject._id) {
          return updatedProject;
        }
        return project;
      });
    });

    builder.addCase(deleteProjectAsync.fulfilled, (state, action) => {
      const { deletedProject } = action.payload;
      state.projects = state.projects.filter(
        (project) => project._id !== deletedProject._id
      );
    });
  },
});

export default projectsSlice.reducer;
