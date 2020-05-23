import { SELECT_STATES} from "./actionCreators";

const selectedStates = (
  state = {
    data: null
  },
  action
) => {
  console.log(action)
  switch (action.type) {
    case SELECT_STATES:
    return Object.assign({}, state, { data: action.data });
  default:
    return state;
  }
}

export default selectedStates;
