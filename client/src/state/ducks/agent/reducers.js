/* REDUCER(S)
It's a good practice to define your state shape first.
Based on the state shape, multiple reducers might be defined in this file, combined and exported into a single reducer function.
*/

import * as types from './types';

const initState = {
  agents: []
};

const agent = (state = initState, action) => {
  switch (action.type) {
    case types.FIND_AGENTS:
      return {
        agents: action.payload.agents
      };

    default:
      return state;
  }
};
const reducer = agent;

export default reducer;
