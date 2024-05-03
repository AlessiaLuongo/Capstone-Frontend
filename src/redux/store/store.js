import { configureStore, combineReducers } from "@reduxjs/toolkit";
import getAllActivities from "../reducers/getAllActivities";

const mainReducer = combineReducers({
  getAllActivities: getAllActivities,
});
const store = configureStore({ reducer: mainReducer });

export default store;
