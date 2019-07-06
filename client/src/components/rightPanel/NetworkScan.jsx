import React, { Component } from 'react';
import { CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class NetworkScan extends Component {
  render() {
    return (
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
              placeholder="(10.0.0.1-10.0.2.255) or (10.0.0.0/24)"
            />
          </FormGroup>
          <FormGroup>
            <Label>Community</Label>
            <Input type="text" placeholder="Enter Community" />
          </FormGroup>
          <Button className="btn float-right" outline color="primary">
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
