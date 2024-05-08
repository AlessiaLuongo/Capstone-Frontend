export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const GET_ALL_LOCATIONS = "GET_ALL_LOCATIONS";
export const LOGIN = "LOGIN";
export const CURRENT_USER = "CURRENT_USER";
export const UPDATE_SINGLE_ACTIVITY = "UPDATE_SINGLE_ACTIVITY";
export const UPDATE_SINGLE_LOCATION = "UPDATE_SINGLE_LOCATION";
export const DELETE_SINGLE_ACTIVITY = "DELETE_SINGLE_ACTIVITY";
export const DELETE_SINGLE_LOCATION = "DELETE_SINGLE_LOCATION";
export const CREATE_NEW_ACTIVITY = "CREATE_NEW_ACTIVITY";

//-------------------------------------LOGIN-------------------------------------------------//

export const LoginUser = (user) => {
  return async (dispatch) => {
    const body = JSON.stringify(user);
    const response = await fetch("http://localhost:3001/auth/login", {
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

export const getCurrentUser = (accessToken) => {
  return async (dispatch) => {
    console.log("ok");
    const response = await fetch(`http://localhost:3001/users/me`, {
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

//-------------------------------------ACTIVITIES--------------------------------------------//

export const fetchCreateNewActivity = (body, accessToken) => {
  console.log(accessToken);
  console.log(body);
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/activities/me", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (response.ok) {
      const data = await response.json();
      dispatch({
        type: CREATE_NEW_ACTIVITY,
        payload: data,
      });
    } else {
      throw new Error("Problem with Access Token");
    }
  };
};

export const fetchAllActivities = (page = 0, size = 10) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/activities", {
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

//-------------------------------------UPDATE ACTIVITY----------------------------------------//

export const updateSingleActivity = (
  activityId,
  updatedActivity,
  accessToken
) => {
  return async (dispatch) => {
    console.log("ok");
    try {
      const response = await fetch(
        `http://localhost:3001/activities/${activityId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedActivity),
        }
      );
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
    const response = await fetch(
      `http://localhost:3001/activities/${activityId}`,
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
        type: DELETE_SINGLE_ACTIVITY,
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};

//-------------------------------------LOCATIONS--------------------------------------------//
export const fetchAllLocations = (page = 0, size = 10) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/locations", {
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

//-------------------------------------UPDATE LOCATION---------------------------------------//

export const updateSingleLocation = (
  locationId,
  updatedLocation,
  accessToken
) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3001/locations/me/${locationId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedLocation),
        }
      );
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
    const response = await fetch(
      `http://localhost:3001/locations/${locationId}`,
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
        type: DELETE_SINGLE_LOCATION,
      });
    } else {
      throw new Error("Seems there are some Server Problems");
    }
  };
};
