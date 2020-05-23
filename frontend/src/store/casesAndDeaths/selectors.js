import { createSelector } from "reselect";

import { activeStatesSelector } from "../states/selectors";

export function casesAndDeathsReceivedSelector(state) {
  return !!state.casesAndDeaths.receivedAt;
}

export function casesAndDeathsLoadingSelector(state) {
  return state.casesAndDeaths.loading;
}

export function casesAndDeathsSelector(state) {
  return state.casesAndDeaths.data;
}

const activeCasesAndDeathsSelector = createSelector(
  [casesAndDeathsSelector, activeStatesSelector],
  (casesAndDeaths, activeStates) => {
    if (activeStates === null) {
      return casesAndDeaths;
    }
    console.log(activeStates)
    
    return casesAndDeaths.filter((currentCaseAndDeath) => {
      const currentState = currentCaseAndDeath.state;
      return activeStates.includes(currentState);
    });
  }
);

export default activeCasesAndDeathsSelector;
