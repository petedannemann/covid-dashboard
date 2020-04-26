import { REQUEST_CASES_OVER_TIME, RECEIVE_CASES_OVER_TIME } from "./actionCreators";

const casesOverTime = (
  state = {
    isFetching: false,
    data: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_CASES_OVER_TIME:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_CASES_OVER_TIME:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    default:
      return state;
  }
};

export default casesOverTime;
