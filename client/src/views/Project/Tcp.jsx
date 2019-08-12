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
import { searchComputers } from '../../state/ducks/computer/actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

class Tcp extends Component {
  constructor(props) {
    super(props);
    this.agentIdRef = React.createRef();
    this.state = {
      network: '172.21.12.0-172.21.12.13',
      ports: [
        '80',
        '21',
        '22',
        '23',
        '25',
        '53',
        '443',
        '110',
        '135',
        '137',
        '138',
        '139',
        '1433',
        '1434'
      ]
    };
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.tcpModalToggle}>
        <ModalHeader>TCP Scan</ModalHeader>
        <ModalBody>
          <Form className="form-material">
            <FormGroup>
              <Label>Agent</Label>
              <Input
                type="select"
                innerRef={this.agentIdRef}
                style={{
                  fontFamily: 'Source Code Pro',
                  fontWeight: 'bold'
                }}
              >
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
                style={{
                  fontFamily: 'Source Code Pro',
                  fontWeight: 'bold'
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Ports</Label>
              <TagsInput
                value={this.state.ports}
                onChange={e => {
                  if (Number(e.slice(-1).pop())) {
                    this.setState({
                      ports: e
                    });
                  }
                }}
                onlyUnique={true}
                tagProps={{
                  className: 'react-tagsinput-tag bg-info text-white rounded'
                }}
                inputProps={{
                  placeholder: 'Add a port'
                }}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="info"
            onClick={() => {
              const agentId = this.agentIdRef.current.value;
              const { network, ports } = this.state;
              this.props.searchComputers('tcp', agentId, { network, ports });

              return this.props.tcpModalToggle();
            }}
          >
            Scan
          </Button>
          <Button color="secondary" onClick={this.props.tcpModalToggle}>
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

Tcp.propTypes = {
  searchComputers: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { searchComputers }
)(Tcp);
