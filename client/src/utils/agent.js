import uuidv4 from 'uuid/v4';

// agentActions
export const TRANSFER = 0;
export const GET_AGENTS = 1;
export const PING = 2;
export const TCP_SCAN = 3;
export const SNMP_SCAN = 4;

// TODO: put access_token in the constructor()
// agent.execute(agent.transfer('178a924c-448d-46ac-b7c4-5c937b524386', agent.ping(['172.21.12.0', '172.21.12.1', '8.8.8.8', '192.168.100.100']))).then((x) => console.log(x))

// ?access_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1NjM2MzQyOTd9.WQNFdKbpGJcXc33laRCMCsgnVJaVwoR6hBBQ48ocQ_I

export default class Agent {
  constructor() {
    this.ws = new WebSocket('ws://localhost:8000/web');
    this.ws.onmessage = this.onMessage;
    this.pendingCommands = {};
    this.agentId = null;
  }

  getAgentId = () => this.agentId;

  execute = command => {
    return new Promise((resolve, reject) => {
      this.pendingCommands[command.commandId] = { resolve, reject };
      this.ws.send(JSON.stringify(command));
    });
  };

  onMessage = event => {
    const data = JSON.parse(event.data);
    // console.log('Received', event.data);

    // Handle the first message
    if (!this.agentId && data.agentId) {
      this.agentId = data.agentId;
      return;
    }

    if (!(data.commandId in this.pendingCommands)) {
      console.warn(
        `Ignoring command answer ${
          data.commandId
        } because there is no callback registered.`
      );
      return;
    }

    // TODO: Handle errors
    this.pendingCommands[data.commandId].resolve(data);

    delete this.pendingCommands[data.commandId];
  };

  transfer(agentId, command) {
    return {
      commandId: uuidv4(),
      type: TRANSFER,
      agentId,
      command
    };
  }

  getAgents() {
    return {
      commandId: uuidv4(),
      type: GET_AGENTS
    };
  }

  ping(network) {
    return {
      commandId: uuidv4(),
      type: PING,
      network
    };
  }

  tcpScan(network, ports) {
    return {
      commandId: uuidv4(),
      type: TCP_SCAN,
      network,
      ports
    };
  }

  snmpScan(network, community) {
    return {
      commandId: uuidv4(),
      type: SNMP_SCAN,
      network,
      community
    };
  }
}
