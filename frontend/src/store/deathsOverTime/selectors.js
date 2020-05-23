import { createSelector } from "reselect";

import casesAndDeathsSelector from "../casesAndDeaths/selectors";

const deathsOverTimeSelector = createSelector(
  casesAndDeathsSelector,
  (casesAndDeathsData) => {
    const deathsOverTimeCounter = casesAndDeathsData.reduce((acc, currentValue) => {
      const { date, new_deaths } = currentValue;
      if (date in acc) {
        acc[date] += new_deaths;
      } else {
        acc[date] = new_deaths;
      }
      return acc;
    }, {});

    const data = Object.entries(deathsOverTimeCounter)
      .map((val) => {
        const [date, number_of_deaths] = val;
        return { x: date, y: number_of_deaths };
      })
      .sort((a, b) => {
        return a.x >= b.x ? 1 : -1;
      });

    return [{ id: "all", data: data }];
  }
);

export default deathsOverTimeSelector;
