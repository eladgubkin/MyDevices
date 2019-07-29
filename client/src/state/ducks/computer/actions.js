/* ACTION CREATOR FUNCTIONS
Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects
*/

import * as types from './types';
import Agent from '../../../utils/agent';
import { timeFormat } from '../../../utils/timeFormat';
const agent = new Agent();

const searchComputers = (protocol, agentId, data) => dispatch => {
  switch (protocol) {
    case 'snmp':
      agent
        .execute(
          agent.transfer(agentId, agent.snmpScan(data.network, data.community))
        )
        .then(({ commandAnswer: { result } }) => {
          const computers = result;
          // Ping
          agent
            .execute(agent.transfer(agentId, agent.ping(data.network)))
            .then(({ commandAnswer: { result } }) => {
              const ping = result;

              const info = [];

              for (const [ip] of Object.entries(computers)) {
                info.push({
                  ip: ip,
                  ping: ping[ip],
                  uptime: timeFormat(computers[ip].uptime),
                  description: computers[ip].description,
                  location: computers[ip].location,
                  name: computers[ip].name,
                  interfaces: computers[ip].interfaces,
                  // eslint-disable-next-line
                  mac: computers[ip].interfaces.map(doc => {
                    if (doc.description === 'wl0') {
                      return doc.mac;
                    }
                  })
                });
              }
              dispatch({
                type: types.SEARCH_COMPUTERS,
                payload: {
                  computers: info
                }
              });
            });
        });

      break;

    default:
      console.log('Default case');
      break;
  }
};

const pingComputers = (network, agentId) => {};

export { searchComputers, pingComputers };
