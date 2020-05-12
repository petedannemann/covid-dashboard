import { combineReducers } from "redux";

import casesAndDeaths from "./casesAndDeaths/reducer";
import caseCount from "./caseCount/reducer";
import casesByState from "./casesByState/reducer";
import casesOverTime from "./casesOverTime/reducer";
import deathCount from "./deathCount/reducer";
import deathsByState from "./deathsByState/reducer";
import deathsOverTime from "./deathsOverTime/reducer";

const appReducer = combineReducers({
  casesAndDeaths,
  caseCount,
  casesByState,
  casesOverTime,
  deathCount,
  deathsByState,
  deathsOverTime,
});

const rootReducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
