import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk functions for client-side auth
export const signupUserAsync = createAsyncThunk(
  "auth/signup",
  async (newUser, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/signup",
        newUser
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state for authSlice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    user: null,
    isAuthenticated: false,
    status: "idle",
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupUserAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(signupUserAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });

    builder.addCase(signupUserAsync.rejected, (state) => {
      state.status = "error";
      state.error = "Failed to signup new user";
    });

    builder.addCase(loginUserAsync.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.status = "success";
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    });

    builder.addCase(loginUserAsync.rejected, (state) => {
      state.status = "error";
      state.error = "Failed to login";
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
