/* ACTION CREATOR FUNCTIONS
Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects
*/

import * as types from './types';
import Agent from '../../../utils/agent';
import { timeFormat } from '../../../utils/timeFormat';

if (!window.agent) {
  window.agent = new Agent();
}

const agent = window.agent;

const searchComputers = (protocol, agentId, data) => dispatch => {
  switch (protocol) {
    case 'snmp':
      const command = agent.transfer(agentId, agent.snmpScan(data.network, data.community));
      console.log('Sending SCAN command, command ID = ', command.commandId);
      agent
        .execute(
          command    
        )
        .then(({ commandAnswer: { result } }) => {
          const foundComputersObj = result;
          const foundComputersArr = [];
          console.log(foundComputersObj);
          
          for (const [ip] of Object.entries(foundComputersObj)) {
            foundComputersArr.push({
              name: foundComputersObj[ip].name,
              ip: ip,
              mac: foundComputersObj[ip].interfaces.find(
                item => item.description === 'eth0.4'
              ).mac,
              ping: 0,
              uptime: timeFormat(foundComputersObj[ip].uptime),
              description: foundComputersObj[ip].description,
              location: foundComputersObj[ip].location,
              interfaces: foundComputersObj[ip].interfaces
            });
          }

          agent.execute(agent.getComputers()).then((computers) => {
            const macs = new Set([].map(d => d.mac));
            const noDupComputers = [
              ...computers,
              ...foundComputersArr.filter(d => !macs.has(d.mac))
            ];
  
            foundComputersArr.reduce((a, b) => {
              let a1 = noDupComputers.find(e => e.mac === b.mac) || {};
              return a.concat(Object.assign(a1, b));
            }, []);
  
            // computers = noDupComputers;
            agent.execute(agent.saveComputers(JSON.stringify(noDupComputers))).then(() => {
              dispatch({
                type: types.SEARCH_COMPUTERS,
                payload: {
                  computers: noDupComputers
                }
              });
            });
          })
        });

      break;

    default:
      console.log('Default case');
      break;
  }
};

const pingComputers = (network, agentId, computers) => dispatch => {
  return new Promise((resolve, reject) => {
    agent
      .execute(agent.transfer(agentId, agent.ping(network)))
      .then(({ commandAnswer: { result } }) => {
        dispatch({
          type: types.UPDATE_COMPUTERS_PING,
          ipToTime: result
        });
        resolve();
      });
    });
};

const getComputers = () => dispatch => {
  return new Promise((resolve, reject) => {
    agent.execute(agent.getComputers()).then(({computers}) => {
      dispatch({
        type: types.SEARCH_COMPUTERS,
        payload: {
          computers: JSON.parse(computers)
        }
      });
      resolve(JSON.parse(computers));
    });
  });
}

const saveComputers = (computers) => dispatch => {
  agent.execute(agent.saveComputers(JSON.stringify(computers))).then(({computers}) => {
    dispatch({
      type: types.SEARCH_COMPUTERS,
      payload: {
        computers
      }
    })
  })
}

export { searchComputers, pingComputers, getComputers, saveComputers };
