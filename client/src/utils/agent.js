import uuidv4 from 'uuid/v4';

// agentActions
export const TRANSFER = 0;
export const GET_AGENTS = 1;
export const PING = 2;
export const TCP_SCAN = 3;
export const SNMP_SCAN = 4;
export const SAVE_COMPUTERS = 5;
export const GET_COMPUTERS = 6;
export const DELETE_COMPUTERS = 7;

export default class Agent {
  constructor() {
    this.ws = new WebSocket('ws://10.10.50.190:8000/web');
    this.ws.onmessage = this.onMessage;
    this.currentCommand = null;
    this.commandsQueue = [];
    this.agentId = null;
  }

  getAgentId = () => this.agentId;

  setCurrentCommand = currentCommand => {
    this.currentCommand = currentCommand;
  };

  getCurrentCommand = () => this.currentCommand;

  execute = command => {
    return new Promise((resolve, reject) => {
      if (!this.getCurrentCommand()) {
        this.setCurrentCommand({ resolve, reject, command });

        if (this.agentId) {
          this.ws.send(JSON.stringify(command));
        }
      } else {
        this.commandsQueue.push({ resolve, reject, command });
      }
    });
  };

  handleCurrentCommandAnswer = data => {
    if (!this.getCurrentCommand()) {
      console.warn(
        'Received command answer from the server while we did not wait for one.'
      );
      return;
    }

    // eslint-disable-next-line
    const { resolve, reject, command } = this.getCurrentCommand();
    if (command.commandId !== data.commandId) {
      console.warn(
        'Invalid answer received from the server. Was expecting',
        command.commandId,
        'but received',
        data.commandId
      );
      return;
    }

    resolve(data);
  };

  onMessage = event => {
    const data = JSON.parse(event.data);
    // console.log('Received', event.data);

    // Handle the first message
    if (!this.agentId && data.agentId) {
      this.agentId = data.agentId;

      if (this.getCurrentCommand()) {
        console.log('Sending', this.getCurrentCommand().command.commandId);
        this.ws.send(JSON.stringify(this.getCurrentCommand().command));
      }

      return;
    }

    // TODO: Handle errors

    // Handle current command
    this.handleCurrentCommandAnswer(data);

    // Send next command
    if (this.commandsQueue.length > 0) {
      const { resolve, reject, command } = this.commandsQueue.shift();
      this.setCurrentCommand({ resolve, reject, command });
      this.ws.send(JSON.stringify(command));
    } else {
      this.setCurrentCommand(null);
    }
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

  saveComputers(computers) {
    return {
      commandId: uuidv4(),
      type: SAVE_COMPUTERS,
      computers
    };
  }

  getComputers() {
    return {
      commandId: uuidv4(),
      type: GET_COMPUTERS
    };
  }

  deleteComputers(computers) {
    return {
      commandId: uuidv4(),
      type: DELETE_COMPUTERS,
      computers
    };
  }
}
