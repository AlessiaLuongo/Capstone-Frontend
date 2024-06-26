import { API_URL } from "../../utils/api";

export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const GET_ALL_LOCATIONS = "GET_ALL_LOCATIONS";
export const LOGIN = "LOGIN";
export const CURRENT_USER = "CURRENT_USER";
export const UPDATE_SINGLE_ACTIVITY = "UPDATE_SINGLE_ACTIVITY";
export const UPDATE_SINGLE_LOCATION = "UPDATE_SINGLE_LOCATION";
export const DELETE_SINGLE_ACTIVITY = "DELETE_SINGLE_ACTIVITY";
export const DELETE_SINGLE_LOCATION = "DELETE_SINGLE_LOCATION";
export const CREATE_NEW_ACTIVITY = "CREATE_NEW_ACTIVITY";
export const CREATE_NEW_LOCATION = "CREATE_NEW_LOCATION";
export const GET_THE_BEST_POSTS = "GET_THE_BEST_POSTS";
export const REGISTER = "REGISTER";
export const UPLOAD_IMAGE = "UPLOAD_IMAGE";
export const UPDATE_USER_INFOS = "UPDATE_USER_INFOS";
export const UPLOAD_ACTIVITY_PICTURE = "UPLOAD_ACTIVITY_PICTURE";
export const UPLOAD_LOCATION_PICTURE = "UPLOAD_LOCATION_PICTURE";
export const LOGOUT_USER = "LOGOUT_USER";
export const GET_FAVOURITE_ACTIVITIES = "GET_FAVOURITE_ACTIVITIES";
export const ADD_FAVOURITE_ACTIVITIES = "ADD_FAVOURITE_ACTIVITIES";
export const DELETE_FAVOURITE_ACTIVITY = "DELETE_FAVOURITE_ACTIVITY";
export const GET_FAVOURITE_LOCATIONS = "GET_FAVOURITE_LOCATIONS";
export const ADD_FAVOURITE_LOCATION = "ADD_FAVOURITE_LOCATION";
export const DELETE_FAVOURITE_LOCATION = "DELETE_FAVOURITE_LOCATION";
export const START_LOADER = "START_LOADER";
export const STOP_LOADER = "STOP_LOADER";

//-------------------------------------REGISTER----------------------------------------------//

export const registerUser = (newUser) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch({ type: REGISTER, payload: data.id });
    } else {
      throw new Error("Problem with Access Token");
    }
  };
};

//-------------------------------------LOGIN-------------------------------------------------//

export const LoginUser = (user) => {
  return async (dispatch) => {
    const body = JSON.stringify(user);
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: body,
    });
    if (response.ok) {
      const data = await response.json();

      dispatch({ type: LOGIN, payload: data.accessToken });
    } else {
      throw new Error("Problem with Access Token");
    }
  };
};

//-------------------------------------LOGOUT--------------------------------------------//

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};
//-------------------------------------CURRENT USER--------------------------------------------//

export const getCurrentUser = (accessToken) => {
  return async (dispatch) => {
    console.log("ok");
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const userData = await response.json();
      console.log("User data:", userData);
      dispatch({
        type: CURRENT_USER,
        payload: userData,
      });
    } else {
      throw new Error("Problem with Access Token");
    }
  };
};

//-------------------------------------UPDATE USER--------------------------------------------//

export const fetchUpdateUserInfos = (accessToken, updatedUser) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    });
    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: UPDATE_USER_INFOS,
        payload: data,
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//-------------------------------------ACTIVITIES--------------------------------------------//

//-------------------------------------GET ALL ACTIVITIES--------------------------------------------//

export const fetchAllActivities = (page = 0, size = 10) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/activities`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      const { content, pageable } = data;
      dispatch({
        type: GET_ALL_ACTIVITIES,
        payload: { content, pageable, page, size },
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//------------------------------------CREATE NEW ACTIVITY--------------------------------------------//

export const fetchCreateNewActivity = (body, accessToken) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/activities/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();

      return dispatch({
        type: CREATE_NEW_ACTIVITY,
        payload: data,
      });
    } else {
      throw new Error("Problem with Access Token");
    }
  };
};

//-------------------------------------UPDATE ACTIVITY----------------------------------------//

export const updateSingleActivity = (
  activityId,
  updatedActivity,
  accessToken
) => {
  return async (dispatch) => {
    console.log("ok");
    try {
      const response = await fetch(`${API_URL}/activities/${activityId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedActivity),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("response:", response);
        dispatch({
          type: UPDATE_SINGLE_ACTIVITY,
          payload: data,
        });
      } else {
        throw new Error("Seems there are some Server Problems");
      }
    } catch {
      throw new Error("Some problems with your activity");
    }
  };
};

//-------------------------------------DELETE ACTIVITY---------------------------------------//

export const deleteSingleActivity = (activityId, accessToken) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/activities/${activityId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      dispatch({
        type: DELETE_SINGLE_ACTIVITY,
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//-------------------------------------GET FAVOURITE ACTIVITIES----------------------------------------//

export const fetchFavouriteActivities = (accessToken) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/users/me/favourite-activities`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("fav", data);
      dispatch({
        type: GET_FAVOURITE_ACTIVITIES,
        payload: data,
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//-------------------------------------ADD FAVOURITE ACTIVITIY----------------------------------------//

export const fetchAddFavouriteActivities = (accessToken, activityId) => {
  return async (dispatch) => {
    const response = await fetch(
      `${API_URL}/users/me/favourite-activities/${activityId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      dispatch({
        type: ADD_FAVOURITE_ACTIVITIES,
        payload: data,
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//-------------------------------------DELETE FAVOURITE ACTIVITY--------------------------------------------//

export const fetchDeleteFavouriteActivity = (accessToken, activityId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${API_URL}/users/me/favourite-activities/${activityId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        dispatch({
          type: DELETE_FAVOURITE_ACTIVITY,
          payload: activityId,
        });
      } else {
        throw new Error("Seems there are some Server Problems");
      }
    } catch {
      throw new Error("Error by deleting your favourite");
    }
  };
};

//-------------------------------------LOCATIONS--------------------------------------------//

//-------------------------------------GET ALL LOCATIONS--------------------------------------------//

export const fetchAllLocations = (page = 0, size = 10) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/locations`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      const { content, pageable } = data;

      dispatch({
        type: GET_ALL_LOCATIONS,
        payload: { content, pageable, page, size },
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//------------------------------------CREATE NEW LOCATION--------------------------------------------//

export const fetchCreateNewLocation = (body, accessToken) => {
  console.log(accessToken);
  console.log(body);
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/locations/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      return dispatch({
        type: CREATE_NEW_LOCATION,
        payload: data,
      });
    } else {
      throw new Error("Problem with Access Token");
    }
  };
};

//-------------------------------------UPDATE LOCATION---------------------------------------//

export const updateSingleLocation = (
  locationId,
  updatedLocation,
  accessToken
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/locations/me/${locationId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedLocation),
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: UPDATE_SINGLE_LOCATION,
          payload: data,
        });
      } else {
        throw new Error("Seems there are some Server Problems");
      }
    } catch {
      throw new Error("Some problems with your location");
    }
  };
};
//-------------------------------------DELETE LOCATION---------------------------------------//

export const deleteSingleLocation = (locationId, accessToken) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/locations/${locationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      dispatch({
        type: DELETE_SINGLE_LOCATION,
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//-------------------------------------GET FAVOURITE LOCATIONS----------------------------------------//

export const fetchFavouriteLocations = (accessToken) => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}/users/me/favourite-locations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      console.log("fav", data);
      dispatch({
        type: GET_FAVOURITE_LOCATIONS,
        payload: data,
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//-------------------------------------ADD FAVOURITE LOCATION----------------------------------------//

export const fetchAddFavouriteLocations = (accessToken, locationId) => {
  return async (dispatch) => {
    const response = await fetch(
      `${API_URL}/users/me/favourite-locations/${locationId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      }
    );
    if (response.ok) {
      const data = await response.json();
      console.log("data", data);
      dispatch({
        type: ADD_FAVOURITE_LOCATION,
        payload: data,
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//-------------------------------------DELETE FAVOURITE LOCATION--------------------------------------------//

export const fetchDeleteFavouriteLocation = (accessToken, locationId) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `${API_URL}/users/me/favourite-locations/${locationId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json",
          },
        }
      );
      if (response.ok) {
        dispatch({
          type: DELETE_FAVOURITE_LOCATION,
          payload: locationId,
        });
      } else {
        throw new Error("Seems there are some Server Problems");
      }
    } catch {
      throw new Error("Error by deleting your favourite");
    }
  };
};

//-------------------------------------GET THE BEST POSTS--------------------------------------------//

export const fetchTheBestPosts = () => {
  return async (dispatch) => {
    const response = await fetch(`${API_URL}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();

      dispatch({
        type: GET_THE_BEST_POSTS,
        payload: { data },
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//-------------------------------------UPLOAD PROFILE AVATAR--------------------------------------------//

export const fetchUploadImage = (accessToken, avatar) => {
  let formData = new FormData();
  formData.append("avatar", avatar);

  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch({
          type: UPLOAD_IMAGE,
          payload: data.avatar,
        });
      } else {
        throw new Error("Problem with Access Token");
      }
    } catch {
      throw new Error("Problem uploading the avatar");
    }
  };
};

//-------------------------------------UPLOAD ACTIVITY PICTURE--------------------------------------------//

export const uploadActivityPicture = (accessToken, picture, activityId) => {
  let formData = new FormData();
  formData.append("picture", picture);

  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/activities/${activityId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch({
          type: UPLOAD_ACTIVITY_PICTURE,
          payload: data.picture,
        });
      } else {
        throw new Error("Problem with Access Token");
      }
    } catch {
      throw new Error("Problem uploading the picture");
    }
  };
};

//-------------------------------------UPLOAD LOCATION PICTURE--------------------------------------------//

export const uploadLocationPicture = (accessToken, picture, locationId) => {
  let formData = new FormData();
  formData.append("picture", picture);

  return async (dispatch) => {
    try {
      const response = await fetch(`${API_URL}/locations/${locationId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        console.log("data", data);
        dispatch({
          type: UPLOAD_LOCATION_PICTURE,
          payload: data.picture,
        });
      } else {
        throw new Error("Problem with Access Token");
      }
    } catch {
      throw new Error("Problem uploading the picture");
    }
  };
};

export const startLoader = () => (dispatch) => {
  dispatch({
    type: START_LOADER,
  });
};

export const stopLoader = () => (dispatch) => {
  dispatch({
    type: STOP_LOADER,
  });
};
