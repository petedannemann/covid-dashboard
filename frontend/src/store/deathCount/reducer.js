import { REQUEST_DEATH_COUNT, RECEIVE_DEATH_COUNT } from './actionCreators'

const deathCount = (
  state = {
    isFetching: false,
    number: null
  },
  action
) => {
  switch (action.type) {
    case REQUEST_DEATH_COUNT:
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_DEATH_COUNT:
      return Object.assign({}, state, {
        isFetching: false,
        number: action.deathCount,
      })
    default:
      return state
  }
}

export default deathCount
