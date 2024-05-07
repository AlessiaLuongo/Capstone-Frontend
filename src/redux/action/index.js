export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const GET_ALL_LOCATIONS = "GET_ALL_LOCATIONS";
export const LOGIN = "LOGIN";
export const CURRENT_USER = "CURRENT_USER";
export const UPDATE_SINGLE_ACTIVITY = "UPDATE_SINGLE_ACTIVITY";

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

export const getCurrentUser = (accessToken, id) => {
  return async (dispatch) => {
    console.log("ok");
    const response = await fetch(`http://localhost:3001/users/${id}`, {
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

export const updateSingleActivity = (activity, body) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3001/activities/${activity.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        const data = await response.json();
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
