/* ACTION CREATOR FUNCTIONS
Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects
*/

import * as types from './types';
import Agent from '../../../utils/agent';
const agent = new Agent();

window.agent = agent;

const findAgents = () => dispatch => {
  // Every 2 seconds
  setInterval(() => {
    agent.execute(agent.getAgents()).then(({ agents }) => {
      dispatch({
        type: types.FIND_AGENTS,
        payload: {
          agents: agents.filter(agentId => agentId !== agent.getAgentId())
        }
      });
      // console.log(agents);
    });
  }, 2000);
};

export { findAgents };
