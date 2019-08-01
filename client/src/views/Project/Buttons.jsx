import React from 'react';
import { Col, Row, Card, Button, CardBody } from 'reactstrap';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import SNMPModal from './SNMPModal';
import TCPModal from './TCPModal';

class Buttons extends React.Component {
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
      <Row>
        <Col md="6" lg="3">
          <Card>
            <CardBody>
              <Button
                className="btn w-100"
                color="info"
                onClick={this.snmpModalToggle}
              >
                SNMP Scan
              </Button>
            </CardBody>
          </Card>
        </Col>
        <SNMPModal
          isOpen={this.state.snmpModal}
          snmpModalToggle={this.snmpModalToggle}
        />

        <Col md="6" lg="3">
          <Card>
            <CardBody>
              <Button
                className="btn w-100"
                color="info"
                onClick={this.tcpModalToggle}
              >
                TCP Scan
              </Button>
            </CardBody>
          </Card>
        </Col>
        <TCPModal
          isOpen={this.state.tcpModal}
          tcpModalToggle={this.tcpModalToggle}
        />

        <Col md="6" lg="3">
          <Card>
            <CardBody>
              <Button className="btn w-100" color="info">
                ICMP Scan
              </Button>
            </CardBody>
          </Card>
        </Col>

        <Col md="6" lg="3">
          <Card>
            <CardBody>
              <Button className="btn w-100" color="info">
                Another Scan
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({});

Buttons.propTypes = {};

export default connect(
  mapStateToProps,
  null
)(Buttons);
