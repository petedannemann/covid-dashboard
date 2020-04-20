import axios from "../utils/axios";

export const REQUEST_CASES_BY_STATE = "REQUEST_CASES_BY_STATE";
export const RECEIVE_CASES_BY_STATE = "RECEIVE_CASES_BY_STATE";

const requestCasesByState = () => {
  return {
    type: REQUEST_CASES_BY_STATE,
  };
};

const receiveCasesByState = (json) => {
  return {
    type: RECEIVE_CASES_BY_STATE,
    data: json.data,
  };
};

const fetchCasesByState = () => {
  return (dispatch) => {
    dispatch(requestCasesByState);
    return axios.get("/cases-by-state").then((json) => {
      dispatch(receiveCasesByState(json))
    });
                                              
  };
};

const shouldFetchCasesByState = (state) => {
  const casesByState = state.casesByState.data;
  if (casesByState.length === 0) {
    return true;
  } else if (state.casesByState.isFetching) {
    return false;
  }
};

export const fetchCasesByStateIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchCasesByState(getState())) {
      return dispatch(fetchCasesByState());
    }
  };
};

