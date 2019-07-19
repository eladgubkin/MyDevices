import React, { Component } from 'react';
import { CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { searchComputers } from '../../state/ducks/computer/actions';
import { findAgents } from '../../state/ducks/agent/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PROTOCOLS = [
  { key: 'snmp', displayName: 'SNMP' },
  { key: 'icmp', displayName: 'ICMP' },
  { key: 'tcp', displayName: 'TCP' }
];

class NetworkScan extends Component {
  constructor(props) {
    super(props);
    this.protocolRef = React.createRef();
    this.agentIdRef = React.createRef();
    this.state = {
      selectedData: {
        network: '172.21.12.0-172.21.12.255',
        community: 'public'
      }
    };
  }

  componentDidMount() {
    this.props.findAgents();
  }

  render() {
    const { agents } = this.props;
    return (
      <CardBody>
        <Form className="form-material">
          <FormGroup>
            <Label>Protocol</Label>
            <Input
              type="select"
              innerRef={this.protocolRef}
              onChange={e => this.setState({ selectedProtocol: e.target.value })}
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
              onChange={e => this.setState({ selectedAgentId: e.target.value })}
            >
              {agents.map((agentId, i) => {
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
              this.props.searchComputers(protocol, agentId, selectedData);
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

const mapStateToProps = state => ({
  computers: state.computer.computers,
  agents: state.agent.agents
});

NetworkScan.propTypes = {
  searchComputers: PropTypes.func.isRequired,
  findAgents: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { searchComputers, findAgents }
)(NetworkScan);
