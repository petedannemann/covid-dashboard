import axios from '../utils/axios';

export const REQUEST_CASE_COUNT = 'REQUEST_CASE_COUNT'
export const RECEIVE_CASE_COUNT = 'RECEIVE_CASE_COUNT'

const requestCaseCount = () => {
  return {
    type: REQUEST_CASE_COUNT
  }
}

const receiveCaseCount = json => {
  return {
    type: RECEIVE_CASE_COUNT,
    caseCount: json.data.body.case_count,
  }
}

const fetchCaseCount = () => {
  return dispatch => {
    dispatch(requestCaseCount)
    return axios.get('/case-count')
      .then(json => dispatch(receiveCaseCount(json)));
  };
};

const shouldFetchCaseCount = state => {
  const caseCount = state.caseCount.number
  if (!caseCount) {
    return true
  } else if (state.caseCount.isFetching) {
    return false
  }
}

export const fetchCaseCountIfNeeded = () => {
  return (dispatch, getState) => {
    if (shouldFetchCaseCount(getState())) {
      return dispatch(fetchCaseCount())
    }
  }
}
