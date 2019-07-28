import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { searchComputers } from '../../../../state/ducks/computer/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class SNMPModal extends Component {
  constructor(props) {
    super(props);
    this.agentIdRef = React.createRef();
    this.state = {
      network: '172.21.12.0-172.21.12.13',
      community: 'public'
    };
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.snmpModalToggle}>
        <ModalHeader>SNMP Scan</ModalHeader>
        <ModalBody>
          <Form className="form-material">
            <FormGroup>
              <Label>Agent</Label>
              <Input type="select" innerRef={this.agentIdRef}>
                {this.props.agents.map((agentId, i) => {
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
                value={this.state.network}
                onChange={e =>
                  this.setState({
                    network: e.target.value
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label>Community</Label>
              <Input
                type="text"
                placeholder="Enter Community"
                value={this.state.community}
                onChange={e =>
                  this.setState({
                    community: e.target.value
                  })
                }
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            onClick={() => {
              const agentId = this.agentIdRef.current.value;
              const { network, community } = this.state;
              this.props.searchComputers('snmp', agentId, { network, community });
              console.log('Scanning...');

              return this.props.snmpModalToggle();
            }}
          >
            Scan
          </Button>
          <Button color="secondary" onClick={this.props.snmpModalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  agents: state.agent.agents
});

SNMPModal.propTypes = {
  searchComputers: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { searchComputers }
)(SNMPModal);
