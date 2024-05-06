import { configureStore, combineReducers } from "@reduxjs/toolkit";
import getAllActivities from "../reducers/getAllActivities";
import getAllLocations from "../reducers/getAllLocations";

const mainReducer = combineReducers({
  getAllActivities: getAllActivities,
  getAllLocations: getAllLocations,
});
const store = configureStore({ reducer: mainReducer });

export default store;
