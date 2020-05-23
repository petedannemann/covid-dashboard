import { combineReducers } from "redux";

import casesAndDeaths from "./casesAndDeaths/reducers";
import selectedStates from "./states/reducers";

const appReducer = combineReducers({
  casesAndDeaths,
  selectedStates
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
