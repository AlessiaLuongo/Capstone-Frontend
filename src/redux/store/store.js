import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default: localStorage for web
import getAllActivities from "../reducers/getAllActivities";
import getAllLocations from "../reducers/getAllLocations";
import loginUserReducer from "../reducers/loginUser";
import updateActivity from "../reducers/updateSingleActivity";

const rootReducer = combineReducers({
  getAllActivities,
  getAllLocations,
  loginUserReducer,
  updateActivity,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
