import { createSelector } from "reselect";

import { casesAndDeathsSelector } from "../casesAndDeaths/selectors";

const casesByStateSelector = createSelector(
  casesAndDeathsSelector,
  (casesAndDeathsData) => {
    if (casesAndDeathsData === null) {
      return [];
    }

    const casesByStateCounter = casesAndDeathsData.reduce((acc, currentValue) => {
      const { state, new_cases } = currentValue;
      if (state in acc) {
        acc[state] += new_cases;
      } else {
        acc[state] = new_cases;
      }
      return acc;
    }, {});

    return Object.entries(casesByStateCounter)
      .map((val) => {
        const [state, number_of_cases] = val;
        return { state, number_of_cases };
      })
      .sort((a, b) => {
        return a.number_of_cases >= b.number_of_cases ? 1 : -1;
      });
  }
);

export default casesByStateSelector;
