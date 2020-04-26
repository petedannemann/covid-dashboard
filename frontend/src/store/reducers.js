import { combineReducers } from "redux";

import caseCount from "./caseCount/reducer";
import casesByState from "./casesByState/reducer";
import deathCount from "./deathCount/reducer";
import deathsByState from "./deathsByState/reducer";

const appReducer = combineReducers({
  caseCount,
  casesByState,
  deathCount,
  deathsByState,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
