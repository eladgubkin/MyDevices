/* ACTION CREATOR FUNCTIONS
Put here the functions that return an action object that can be dispatched
HINT: Always use functions for consistency, don't export plain objects
*/

import * as types from './types';
import Agent from '../../../utils/agent';
// import { timeFormat } from '../../../utils/timeFormat';
import moment from 'moment';

if (!window.agent) {
  window.agent = new Agent();
}

const agent = window.agent;

const searchComputers = (protocol, agentId, data) => dispatch => {
  switch (protocol) {
    case 'snmp':
      const command = agent.transfer(
        agentId,
        agent.snmpScan(data.network, data.community)
      );
      console.log('Sending SCAN command, command ID = ', command.commandId);
      agent.execute(command).then(({ commandAnswer: { result } }) => {
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
            // uptime: timeFormat(foundComputersObj[ip].uptime),
            uptime: moment
              .utc(foundComputersObj[ip].uptime * 1000)
              .format('DD:HH:mm'),
            description: foundComputersObj[ip].description,
            location: foundComputersObj[ip].location,
            upload: (
              foundComputersObj[ip].interfaces.find(
                item => item.description === 'eth0.4'
              ).out_octets / 10000000
            ).toFixed(2),
            download: (
              foundComputersObj[ip].interfaces.find(
                item => item.description === 'eth0.4'
              ).in_octets / 10000000
            ).toFixed(2)
            // interfaces: foundComputersObj[ip].interfaces
          });
        }

        agent.execute(agent.getComputers()).then(computers => {
          const macs = new Set([].map(d => d.mac));
          const noDupComputers = [
            ...computers,
            ...foundComputersArr.filter(d => !macs.has(d.mac))
          ];

          foundComputersArr.reduce((a, b) => {
            let a1 = noDupComputers.find(e => e.mac === b.mac) || {};
            return a.concat(Object.assign(a1, b));
          }, []);

          agent
            .execute(agent.saveComputers(JSON.stringify(noDupComputers)))
            .then(() => {
              dispatch({
                type: types.SEARCH_COMPUTERS,
                payload: {
                  computers: noDupComputers
                }
              });
            });
        });
      });

      break;

    case 'tcp':
      const tcpCommand = agent.transfer(
        agentId,
        agent.tcpScan(data.network, data.ports)
      );
      console.log('Sending SCAN command, command ID = ', tcpCommand.commandId);

      agent.execute(tcpCommand).then(({ commandAnswer: { result } }) => {
        console.log(result);
      });

      break;

    default:
      console.log('Default case');
      break;
  }
};

const pingComputers = (network, agentId) => dispatch => {
  return new Promise(resolve => {
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

const saveComputers = computers => dispatch => {
  agent.execute(agent.saveComputers(JSON.stringify(computers)));
};

const getComputers = () => dispatch => {
  return new Promise(resolve => {
    agent.execute(agent.getComputers()).then(({ computers }) => {
      dispatch({
        type: types.SEARCH_COMPUTERS,
        payload: {
          computers: JSON.parse(computers)
        }
      });
      resolve(JSON.parse(computers));
    });
  });
};

const deleteComputers = comps => dispatch => {
  return new Promise(resolve => {
    // dispatch({
    //   type: types.UPDATE_COMPUTERS_AFTER_DELETE,
    //   payload: {
    //     computers: comps
    //   }
    // });
    agent.execute(agent.deleteComputers(JSON.stringify(comps))).then(() => {
      agent.execute(agent.getComputers()).then(({ computers }) => {
        dispatch({
          type: types.UPDATE_COMPUTERS_AFTER_DELETE,
          payload: {
            computers: JSON.parse(computers)
          }
        });
      });
    });
    resolve();
  });
};

export {
  searchComputers,
  pingComputers,
  getComputers,
  saveComputers,
  deleteComputers
};
