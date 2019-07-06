import React, { Component } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Button
} from 'reactstrap';

export default class NetworkScan extends Component {
  render() {
    return (
      <div id="NetworkScan">
        <Row>
          <Col xs="12" sm="12" md="7" lg="5">
            <Card>
              <div className="p-3 border-bottom bg-light">
                <CardTitle>
                  <i className="mr-2 mdi mdi-access-point-network" />
                  Network Scan
                </CardTitle>
                <CardSubtitle>
                  Gather information about devices connected to a network
                </CardSubtitle>
              </div>
              <CardBody>
                <Form className="form-material">
                  <FormGroup>
                    <Label>Protocol</Label>
                    <Input type="select">
                      <option>SNMP</option>
                      <option>ICMP</option>
                      <option>TCP</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Agent</Label>
                    <Input type="select" defaultValue="Agent">
                      <option>b5d771e7-00d6-46ad-ad78-ee9a61c7884b</option>
                      <option>4a6f448b-2db5-4992-968d-117c9744e785</option>
                      <option>7357ab39-41a0-47bb-b8e5-50529dbc6d4b</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>Network</Label>
                    <Input
                      type="text"
                      placeholder="Enter range (10.0.0.1-10.0.2.255) or subnet (10.0.0.0/24)"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Community</Label>
                    <Input type="text" placeholder="Enter Community" />
                  </FormGroup>
                  <Button
                    className="btn"
                    outline
                    color="primary"
                    style={{ float: 'right' }}
                  >
                    Scan
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
