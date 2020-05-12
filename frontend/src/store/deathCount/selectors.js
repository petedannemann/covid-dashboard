import { createSelector } from "reselect";

import { casesAndDeathsSelector } from "../casesAndDeaths/selectors";

const deathCountSelector = createSelector(
  casesAndDeathsSelector,
  (casesAndDeathsData) => {
    if (casesAndDeathsData === null) {
      return null;
    }
    return casesAndDeathsData.reduce((acc, currentValue) => {
      return acc + currentValue.new_deaths;
    }, 0);
  }
);

export default deathCountSelector;
