import { createSelector } from "reselect";

import casesAndDeathsSelector from "../casesAndDeaths/selectors";

const deathCountSelector = createSelector(
  casesAndDeathsSelector,
  (casesAndDeathsData) => {
    if (casesAndDeathsData.length === 0) {
      return null;
    }
    return casesAndDeathsData.reduce((acc, currentValue) => {
      return acc + currentValue.new_deaths;
    }, 0);
  }
);

export default deathCountSelector;
