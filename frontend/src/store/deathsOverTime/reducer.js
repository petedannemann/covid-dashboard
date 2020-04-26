import { REQUEST_DEATHS_OVER_TIME, RECEIVE_DEATHS_OVER_TIME } from "./actionCreators";

const deathsOverTime = (
  state = {
    isFetching: false,
    data: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_DEATHS_OVER_TIME:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_DEATHS_OVER_TIME:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    default:
      return state;
  }
};

export default deathsOverTime;
