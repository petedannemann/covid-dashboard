import { REQUEST_CASES_AND_DEATHS, RECEIVE_CASES_AND_DEATHS } from "./actionCreators";

const casesAndDeaths = (
  state = {
    isFetching: false,
    data: null,
  },
  action
) => {
  switch (action.type) {
    case REQUEST_CASES_AND_DEATHS:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_CASES_AND_DEATHS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    default:
      return state;
  }
};

export default casesAndDeaths;
