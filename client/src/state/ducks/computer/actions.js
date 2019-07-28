/* ACTION CREATOR FUNCTIONS
Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects
*/

import * as types from './types';
import Agent from '../../../utils/agent';
const agent = new Agent();

const searchComputers = (protocol, agentId, data) => dispatch => {
  switch (protocol) {
    case 'snmp':
      agent
        .execute(
          agent.transfer(agentId, agent.snmpScan(data.network, data.community))
        )
        .then(({ commandAnswer: { result } }) => {
          console.log(result);
          dispatch({
            type: types.SEARCH_COMPUTERS,
            payload: {
              computers: result
            }
          });
        });

      break;

    default:
      console.log('Default case');
      break;
  }
};

export { searchComputers };
