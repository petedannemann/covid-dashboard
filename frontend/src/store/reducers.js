import { combineReducers } from 'redux';

const appReducer = combineReducers({});

const reducer = (state, action) => {
  if (action.type === "RESET_STATE") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default reducer;

