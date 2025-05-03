import axios from "axios";
import store from "../app/store";
import { logout } from "../features/auth/authSilce";

const apiClient = axios.create({
  baseURL: "https://project-manager-phi-gilt.vercel.app",
  withCredentials: true,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      error.response.status === 403
    ) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default apiClient;
