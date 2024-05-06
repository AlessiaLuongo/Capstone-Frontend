export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const GET_ALL_LOCATIONS = "GET_ALL_LOCATIONS";
export const LOGIN = "LOGIN";

//-------------------------------------LOGIN-------------------------------------------------//

export const LoginUser = (user) => {
  return async (dispatch) => {
    console.log("ok");
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
      console.log(data);
      dispatch({ type: LOGIN, payload: data.accessToken });
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
