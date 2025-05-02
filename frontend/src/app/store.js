import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import authReducer from "../features/auth/authSilce";
import projectReducer from "../features/projects/projectsSlice";
import tasksReducer from "../features/tasks/tasksSlice";

// Persist store config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "projects", "tasks"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  projects: projectReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// For making the store fluid
// persistor.purge();

export default store;
