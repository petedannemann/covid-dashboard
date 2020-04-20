import { REQUEST_CASE_COUNT, RECEIVE_CASE_COUNT } from "./actionCreators";

const caseCount = (
  state = {
    isFetching: false,
    number: null,
  },
  action
) => {
  switch (action.type) {
    case REQUEST_CASE_COUNT:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case RECEIVE_CASE_COUNT:
      return Object.assign({}, state, {
        isFetching: false,
        number: action.caseCount,
      });
    default:
      return state;
  }
};

export default caseCount;
