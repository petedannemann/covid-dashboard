import { REQUEST_CASES_BY_STATE, RECEIVE_CASES_BY_STATE } from "./actionCreators";

const casesByState = (
  state = {
    isFetching: false,
    data: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_CASES_BY_STATE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_CASES_BY_STATE:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    default:
      return state;
  }
};

export default casesByState;
