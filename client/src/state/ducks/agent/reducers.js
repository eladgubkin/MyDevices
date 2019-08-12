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
