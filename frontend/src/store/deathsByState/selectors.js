import { createSelector } from "reselect";

import { casesAndDeathsSelector } from "../casesAndDeaths/selectors";

const deathsByStateSelector = createSelector(
  casesAndDeathsSelector,
  (casesAndDeathsData) => {
    if (casesAndDeathsData === null) {
      return [];
    }

    const deathsByStateCounter = casesAndDeathsData.reduce((acc, currentValue) => {
      const { state, new_deaths } = currentValue;
      if (state in acc) {
        acc[state] += new_deaths;
      } else {
        acc[state] = new_deaths;
      }
      return acc;
    }, {});

    return Object.entries(deathsByStateCounter)
      .map((val) => {
        const [state, number_of_deaths] = val;
        return { state, number_of_deaths };
      })
      .sort((a, b) => {
        return a.number_of_deaths >= b.number_of_deaths ? 1 : -1;
      });
  }
);

export default deathsByStateSelector;
