import * as types from './types';
import _ from 'lodash';

const initState = {
  computers: []
};

const computer = (state = initState, action) => {
  switch (action.type) {
    case types.SEARCH_COMPUTERS:
      return {
        ...state,
        computers: _.values(
          _.merge(
            _.mapValues(_.groupBy(state.computers, 'ip'), v => v[0]),
            _.mapValues(_.groupBy(action.payload.computers, 'ip'), v => v[0])
          )
        )
      };

    case types.UPDATE_COMPUTERS_PING:
      return {
        ...state,
        computers: _.map(state.computers, computer => ({
          ...computer,
          ping: action.ipToTime[computer.ip] || computer.ping
        }))
      };

    case types.UPDATE_TABLE:
      return {
        ...state,
        computers: action.payload.computers
      };

    default:
      return state;
  }
};
const reducer = computer;

export default reducer;
