import axios from "../utils/axios";

export const REQUEST_CASES_OVER_TIME = "REQUEST_CASES_OVER_TIME";
export const RECEIVE_CASES_OVER_TIME = "RECEIVE_CASES_OVER_TIME";

const requestCasesOverTime = () => {
  return {
    type: REQUEST_CASES_OVER_TIME,
  };
};

const receiveCasesOverTime = (json) => {
  return {
    type: RECEIVE_CASES_OVER_TIME,
    data: json.data,
  };
};

const fetchCasesOverTime = () => {
  return (dispatch) => {
    dispatch(requestCasesOverTime);
    return axios.get("/cases-over-time").then((json) => {
      dispatch(receiveCasesOverTime(json));
    });
  };
};

const shouldFetchCasesOverTime = (state) => {
  const casesOverTime = state.casesOverTime.data;
  if (casesOverTime.length === 0) {
    return true;
  } else if (state.casesOverTime.isFetching) {
    return false;
  }
};

export const fetchCasesOverTimeIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchCasesOverTime(getState())) {
      return dispatch(fetchCasesOverTime());
    }
  };
};
