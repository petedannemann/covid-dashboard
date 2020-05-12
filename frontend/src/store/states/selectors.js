import { createSelector } from "reselect";

import { casesAndDeathsSelector } from "../casesAndDeaths/selectors";

const statesSelector = createSelector(casesAndDeathsSelector, (casesAndDeathsData) => {
  if (casesAndDeathsData === null) {
    return [];
  }
  return [...new Set(casesAndDeathsData.map((item) => item.state))].sort((a, b) => {
    return a.x >= b.x ? -1 : 1;
  });
});

export default statesSelector;
