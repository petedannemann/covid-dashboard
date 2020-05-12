import { createSelector } from "reselect";

import { casesAndDeathsSelector } from "../casesAndDeaths/selectors";

const casesOverTimeSelector = createSelector(
  casesAndDeathsSelector,
  (casesAndDeathsData) => {
    if (casesAndDeathsData === null) {
      return [{ id: "all", data: [] }];
    }

    const casesOverTimeCounter = casesAndDeathsData.reduce((acc, currentValue) => {
      const { date, new_cases } = currentValue;
      if (date in acc) {
        acc[date] += new_cases;
      } else {
        acc[date] = new_cases;
      }
      return acc;
    }, {});

    const data = Object.entries(casesOverTimeCounter)
      .map((val) => {
        const [date, number_of_cases] = val;
        return { x: date, y: number_of_cases };
      })
      .sort((a, b) => {
        return a.x >= b.x ? 1 : -1;
      });

    return [{ id: "all", data: data }];
  }
);

export default casesOverTimeSelector;
