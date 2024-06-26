import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import getAllActivities from "../reducers/getAllActivities";
import getAllLocations from "../reducers/getAllLocations";
import loginUserReducer from "../reducers/loginUser";
import updateActivity from "../reducers/updateSingleActivity";
import persistStore from "redux-persist/es/persistStore";
import updateLocationReducer from "../reducers/updateSingleLocation";
import deleteSingleActivityReducer from "../reducers/deleteSingleActivity";
import deleteSingleLocationReducer from "../reducers/deleteSingleLocation";
import createNewActivityReducer from "../reducers/createNewActivity";
import createNewLocationReducer from "../reducers/createNewLocation";
import getTheBestPosts from "../reducers/getTheBestPosts";
import registerUserReducer from "../reducers/registerUser";
import uploadImageReducer from "../reducers/uploadImage";
import uploadActivityPictureReducer from "../reducers/uploadActivityPicture";
import uploadLocationPictureReducer from "../reducers/uploadLocationPicture";
import getFavouriteActivitiesReducer from "../reducers/favouriteActivities";
import getFavouriteLocationReducer from "../reducers/favouriteLocations";

const rootReducer = combineReducers({
  getAllActivities: getAllActivities,
  getAllLocations: getAllLocations,
  loginUserReducer: loginUserReducer,
  updateActivity: updateActivity,
  updateLocation: updateLocationReducer,
  deleteActivity: deleteSingleActivityReducer,
  deleteLocation: deleteSingleLocationReducer,
  createNewActivity: createNewActivityReducer,
  createNewLocation: createNewLocationReducer,
  getTheBestPosts: getTheBestPosts,
  registerUser: registerUserReducer,
  uploadImage: uploadImageReducer,
  uploadActivityPicture: uploadActivityPictureReducer,
  uploadLocationPicture: uploadLocationPictureReducer,
  getFavouriteActivities: getFavouriteActivitiesReducer,
  getFavouriteLocations: getFavouriteLocationReducer,
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
