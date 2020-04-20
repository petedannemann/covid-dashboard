import axios from "../utils/axios";

export const REQUEST_DEATH_COUNT = "REQUEST_DEATH_COUNT";
export const RECEIVE_DEATH_COUNT = "RECEIVE_DEATH_COUNT";

const requestDeathCount = () => {
  return {
    type: REQUEST_DEATH_COUNT,
  };
};

const receiveDeathCount = (json) => {
  return {
    type: RECEIVE_DEATH_COUNT,
    deathCount: json.data.death_count,
  };
};

const fetchDeathCount = () => {
  return (dispatch) => {
    dispatch(requestDeathCount);
    return axios.get("/death-count").then((json) => dispatch(receiveDeathCount(json)));
  };
};

const shouldFetchDeathCount = (state) => {
  const deathCount = state.deathCount.number;
  if (!deathCount) {
    return true;
  } else if (state.deathCount.isFetching) {
    return false;
  }
};

export const fetchDeathCountIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchDeathCount(getState())) {
      return dispatch(fetchDeathCount());
    }
  };
};
