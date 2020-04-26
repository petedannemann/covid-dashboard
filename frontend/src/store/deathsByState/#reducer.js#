import { REQUEST_DEATHS_BY_STATE, RECEIVE_DEATHS_BY_STATE } from "./actionCreators";

const deathsByState = (
  state = {
    isFetching: false,
    data: [],
  },
  action
) => {
  switch (action.type) {
    case REQUEST_DEATHS_BY_STATE:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_DEATHS_BY_STATE:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.data,
      });
    default:
      return state;
  }
};

export default deathsByState;
