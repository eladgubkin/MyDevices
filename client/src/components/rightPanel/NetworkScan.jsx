import React, { Component } from 'react';
import { CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Agent from '../../actions/agentActions';

const PROTOCOLS = [
  { key: 'snmp', displayName: 'SNMP' },
  { key: 'icmp', displayName: 'ICMP' },
  { key: 'tcp', displayName: 'TCP' }
];

export default class NetworkScan extends Component {
  constructor(props) {
    super(props);
    this.agent = new Agent();
    this.protocolRef = React.createRef();
    this.agentIdRef = React.createRef();
    this.state = {
      otherAgents: [],
      computers: {},
      selectedData: {
        network: '172.21.12.0-172.21.12.255',
        community: 'public'
      }
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.agent.execute(this.agent.getAgents()).then(({ agents }) => {
        this.setState({
          ...this.state,
          otherAgents: agents.filter(agentId => agentId !== this.agent.getAgentId())
        });
      });
    }, 2000);
  }

  searchComputers = (protocol, agentId, data) => {
    switch (protocol) {
      case 'snmp':
        this.agent
          .execute(
            this.agent.transfer(
              agentId,
              this.agent.snmpScan(data.network, data.community)
            )
          )
          .then(({ commandAnswer: { result } }) => {
            const computers = this.state.computers;

            for (const [ip, snmp] of Object.entries(result)) {
              if (ip in computers) {
                computers[ip].snmp = snmp;
              } else {
                computers[ip] = { snmp };
              }
            }

            this.setState({ ...this.state, computers });
          });

        break;

      default:
        console.log('Default case');
        break;
    }
  };

  render() {
    if (Object.keys(this.state.computers).length !== 0) {
      console.log(this.state.computers);
    }

    return (
      <CardBody>
        <Form className="form-material">
          <FormGroup>
            <Label>Protocol</Label>
            <Input
              type="select"
              innerRef={this.protocolRef}
              // onChange={e => this.setState({ selectedProtocol: e.target.value })}
            >
              {PROTOCOLS.map((protocol, i) => {
                return (
                  <option key={i} value={protocol.key}>
                    {protocol.displayName}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Agent</Label>
            <Input
              type="select"
              innerRef={this.agentIdRef}
              // onChange={e => this.setState({ selectedAgentId: e.target.value })}
            >
              {this.state.otherAgents.map((agentId, i) => {
                return (
                  <option key={i} value={agentId}>
                    {agentId}
                  </option>
                );
              })}
            </Input>
          </FormGroup>
          <FormGroup>
            <Label>Network</Label>
            <Input
              type="text"
              placeholder="(10.0.0.1-10.0.2.255) or (10.0.0.0/24)"
              value={this.state.selectedData.network}
              onChange={e =>
                this.setState({
                  selectedData: {
                    ...this.state.selectedData,
                    network: e.target.value
                  }
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <Label>Community</Label>
            <Input
              type="text"
              placeholder="Enter Community"
              value={this.state.selectedData.community}
              onChange={e =>
                this.setState({
                  selectedData: {
                    ...this.state.selectedData,
                    community: e.target.value
                  }
                })
              }
            />
          </FormGroup>
          <Button
            className="btn float-right"
            outline
            color="primary"
            onClick={() => {
              const protocol = this.protocolRef.current.value;
              const agentId = this.agentIdRef.current.value;
              const { selectedData } = this.state;
              this.searchComputers(protocol, agentId, selectedData);
              console.log('Scanning...');
            }}
          >
            Scan
          </Button>
          {window.innerWidth < 501 ? (
            <Button
              className="btn float-left"
              outline
              color="danger"
              onClick={this.props.rightPanelToggle}
            >
              Exit
            </Button>
          ) : (
            ''
          )}
        </Form>
      </CardBody>
    );
  }
}
