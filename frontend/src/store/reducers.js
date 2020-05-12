import { combineReducers } from "redux";

import casesAndDeaths from "./casesAndDeaths/reducers";

const appReducer = combineReducers({
  casesAndDeaths,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
