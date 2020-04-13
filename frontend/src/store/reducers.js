import { combineReducers } from "redux";

import caseCount from "./caseCount/reducer";
import deathCount from "./deathCount/reducer";

const appReducer = combineReducers({
  caseCount,
  deathCount,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
