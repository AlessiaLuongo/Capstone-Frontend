import { configureStore, combineReducers } from "@reduxjs/toolkit";
import getAllActivities from "../reducers/getAllActivities";
import getAllLocations from "../reducers/getAllLocations";
import loginUserReducer from "../reducers/loginUser";

const mainReducer = combineReducers({
  getAllActivities: getAllActivities,
  getAllLocations: getAllLocations,
  loginUserReducer: loginUserReducer,
});
const store = configureStore({ reducer: mainReducer });

export default store;
