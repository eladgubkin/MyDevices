/* ACTION CREATOR FUNCTIONS
Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects
*/

import * as types from './types';
import Agent from '../../../utils/agent';
import { timeFormat } from '../../../utils/timeFormat';
import { dbComputers } from './db';
const agent = new Agent();

const searchComputers = (protocol, agentId, data) => dispatch => {
  switch (protocol) {
    case 'snmp':
      agent
        .execute(
          agent.transfer(agentId, agent.snmpScan(data.network, data.community))
        )
        .then(({ commandAnswer: { result } }) => {
          const foundComputersObj = result;

          agent
            .execute(agent.transfer(agentId, agent.ping(data.network)))
            .then(({ commandAnswer: { result } }) => {
              const foundPingObj = result;

              const foundComputersArr = [];

              for (const [ip] of Object.entries(foundComputersObj)) {
                foundComputersArr.push({
                  name: foundComputersObj[ip].name,
                  ip: ip,
                  mac: foundComputersObj[ip].interfaces.find(
                    item => item.description === 'eth0.4'
                  ).mac,
                  ping: foundPingObj[ip] + 'ms',
                  uptime: timeFormat(foundComputersObj[ip].uptime),
                  description: foundComputersObj[ip].description,
                  location: foundComputersObj[ip].location,
                  interfaces: foundComputersObj[ip].interfaces
                });
              }

              const macs = new Set([dbComputers].map(d => d.mac));
              const noDupComputers = [
                ...dbComputers,
                ...foundComputersArr.filter(d => !macs.has(d.mac))
              ];

              foundComputersArr.reduce((a, b) => {
                let a1 = noDupComputers.find(e => e.mac === b.mac) || {};
                return a.concat(Object.assign(a1, b));
              }, []);

              // dbComputers = noDupComputers;

              dispatch({
                type: types.SEARCH_COMPUTERS,
                payload: {
                  computers: noDupComputers
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

const pingComputers = (network, agentId, computers) => dispatch => {
  agent
    .execute(agent.transfer(agentId, agent.ping(network)))
    .then(({ commandAnswer: { result } }) => {
      const pings = [];

      Object.entries(result).map(obj => {
        return pings.push({
          ip: obj[0],
          ping: obj[1] + 'ms'
        });
      });

      computers = computers.map(item => {
        let item2 = pings.find(i2 => i2.ip === item.ip);
        return item2 ? { ...item, ...item2 } : item;
      });

      dispatch({
        type: types.UPDATE_COMPUTERS_PING,
        payload: {
          computers: computers
        }
      });
    });
};

export { searchComputers, pingComputers };
