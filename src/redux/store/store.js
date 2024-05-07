import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import getAllActivities from "../reducers/getAllActivities";
import getAllLocations from "../reducers/getAllLocations";
import loginUserReducer from "../reducers/loginUser";
import updateActivity from "../reducers/updateSingleActivity";
import persistStore from "redux-persist/es/persistStore";

const rootReducer = combineReducers({
  getAllActivities: getAllActivities,
  getAllLocations: getAllLocations,
  loginUserReducer: loginUserReducer,
  updateActivity: updateActivity,
});

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;
