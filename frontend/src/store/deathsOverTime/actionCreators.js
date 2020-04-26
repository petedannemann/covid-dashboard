import axios from "../utils/axios";

export const REQUEST_DEATHS_OVER_TIME = "REQUEST_DEATHS_OVER_TIME";
export const RECEIVE_DEATHS_OVER_TIME = "RECEIVE_DEATHS_OVER_TIME";

const requestDeathsOverTime = () => {
  return {
    type: REQUEST_DEATHS_OVER_TIME,
  };
};

const receiveDeathsOverTime = (json) => {
  return {
    type: RECEIVE_DEATHS_OVER_TIME,
    data: json.data,
  };
};

const fetchDeathsOverTime = () => {
  return (dispatch) => {
    dispatch(requestDeathsOverTime);
    return axios.get("/deaths-over-time").then((json) => {
      dispatch(receiveDeathsOverTime(json));
    });
  };
};

const shouldFetchDeathsOverTime = (state) => {
  const deathsOverTime = state.deathsOverTime.data;
  if (deathsOverTime.length === 0) {
    return true;
  } else if (state.deathsOverTime.isFetching) {
    return false;
  }
};

export const fetchDeathsOverTimeIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchDeathsOverTime(getState())) {
      return dispatch(fetchDeathsOverTime());
    }
  };
};
