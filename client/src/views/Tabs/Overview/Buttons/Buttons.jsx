import React, { Component } from 'react';
import { Button } from 'reactstrap';
import SNMPModal from './SNMPModal';
import TCPModal from './TCPModal';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      snmpModal: false,
      tcpModal: false
    };
  }
  snmpModalToggle = () => {
    this.setState({
      ...this.state,
      snmpModal: !this.state.snmpModal
    });
  };

  tcpModalToggle = () => {
    this.setState({
      ...this.state,
      tcpModal: !this.state.tcpModal
    });
  };

  render() {
    return (
      <div className="buttons">
        <Button className="btn" color="info" onClick={this.snmpModalToggle}>
          SNMP Scan
        </Button>
        <SNMPModal
          isOpen={this.state.snmpModal}
          snmpModalToggle={this.snmpModalToggle}
        />

        <Button className="btn" color="info" onClick={this.tcpModalToggle}>
          TCP Scan
        </Button>
        <TCPModal
          isOpen={this.state.tcpModal}
          tcpModalToggle={this.tcpModalToggle}
        />

        <Button className="btn" color="info">
          Another Scan
        </Button>

        <Button className="btn" color="info">
          Scan
        </Button>
      </div>
    );
  }
}

export default Buttons;
