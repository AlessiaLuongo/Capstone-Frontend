export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";

export const fetchAllActivities = (page = 0, size = 10) => {
  return async (dispatch) => {
    const response = await fetch("http://localhost:3001/activities", {
      method: "GET",
      headers: {
        "Content-type": "apllication/json",
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
