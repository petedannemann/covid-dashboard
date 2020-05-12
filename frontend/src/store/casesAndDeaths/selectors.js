export function casesAndDeathsReceivedSelector(state) {
  return !!state.casesAndDeaths.receivedAt;
}

export function casesAndDeathsLoadingSelector(state) {
  return state.casesAndDeaths.loading;
}

export function casesAndDeathsSelector(state) {
  return state.casesAndDeaths.data;
}
