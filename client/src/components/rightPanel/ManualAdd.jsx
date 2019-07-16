import React, { Component } from 'react';
import { CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';

export default class ManualAdd extends Component {
  render() {
    return (
      <CardBody>
        <Form className="form-material">
          <FormGroup>
            <Label>Name</Label>
            <Input type="text" placeholder="Enter name" />
          </FormGroup>
          <FormGroup>
            <Label>IP</Label>
            <Input type="text" placeholder="Enter IP" />
          </FormGroup>
          <Button className="btn float-right" outline color="primary">
            Add
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
