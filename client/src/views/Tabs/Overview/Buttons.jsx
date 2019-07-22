import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }
  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div className="buttons">
        <Button className="btn" color="success" onClick={this.toggle}>
          SNMP Scan
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Button className="btn" color="info">
          Ping
        </Button>
        <Button className="btn" color="info">
          HTTP
        </Button>
        <Button className="btn" color="success">
          TCP Scan
        </Button>
      </div>
    );
  }
}

export default Buttons;
