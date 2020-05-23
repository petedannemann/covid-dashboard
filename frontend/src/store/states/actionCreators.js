export const SELECT_STATES = "SELECT_STATES";

export const selectStates = (selectedStates) => {
  return {
    type: SELECT_STATES,
    data: selectedStates.data,
  };
};
