import axios from "../utils/axios";

export const REQUEST_CASES_AND_DEATHS = "REQUEST_CASES_AND_DEATHS";
export const RECEIVE_CASES_AND_DEATHS = "RECEIVE_CASES_AND_DEATHS";

const requestCasesAndDeaths = () => {
  return {
    type: REQUEST_CASES_AND_DEATHS,
  };
};

const receiveCasesAndDeaths = (json) => {
  return {
    type: RECEIVE_CASES_AND_DEATHS,
    data: json.data,
  };
};

const fetchCasesAndDeaths = () => {
  return (dispatch) => {
    dispatch(requestCasesAndDeaths);
    return axios
      .get("/cases-and-deaths")
      .then((json) => dispatch(receiveCasesAndDeaths(json)));
  };
};

const shouldFetchCasesAndDeaths = (state) => {
  if (!state.casesAndDeaths.data) {
    return true;
  } else if (state.casesAndDeaths.isFetching) {
    return false;
  }
};

export const fetchCasesAndDeathsIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchCasesAndDeaths(getState())) {
      return dispatch(fetchCasesAndDeaths());
    }
  };
};
