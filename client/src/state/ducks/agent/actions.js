import * as types from './types';
import Agent from '../../../utils/agent';

if (!window.agent) {
  window.agent = new Agent();
}

const agent = window.agent;

const findAgents = () => dispatch => {
  return new Promise((resolve, reject) => {
    agent.execute(agent.getAgents()).then(({ agents }) => {
      dispatch({
        type: types.FIND_AGENTS,
        payload: {
          agents: agents.filter(agentId => agentId !== agent.getAgentId())
        }
      });
      resolve();
      // console.log(agents);
    });
  });
};

export { findAgents };
