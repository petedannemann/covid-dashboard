import axios from "../utils/axios";

export const REQUEST_DEATHS_BY_STATE = "REQUEST_DEATHS_BY_STATE";
export const RECEIVE_DEATHS_BY_STATE = "RECEIVE_DEATHS_BY_STATE";

const requestDeathsByState = () => {
  return {
    type: REQUEST_DEATHS_BY_STATE,
  };
};

const receiveDeathsByState = (json) => {
  return {
    type: RECEIVE_DEATHS_BY_STATE,
    data: json.data,
  };
};

const fetchDeathsByState = () => {
  return (dispatch) => {
    dispatch(requestDeathsByState);
    return axios.get("/deaths-by-state").then((json) => {
      dispatch(receiveDeathsByState(json));
    });
  };
};

const shouldFetchDeathsByState = (state) => {
  const deathsByState = state.deathsByState.data;
  if (deathsByState.length === 0) {
    return true;
  } else if (state.deathsByState.isFetching) {
    return false;
  }
};

export const fetchDeathsByStateIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchDeathsByState(getState())) {
      return dispatch(fetchDeathsByState());
    }
  };
};
