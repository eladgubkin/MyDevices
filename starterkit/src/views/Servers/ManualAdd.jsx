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

export default class ManualAdd extends Component {
  render() {
    return (
      <div id="ManualAdd">
        <Row>
          <Col xs="12" sm="12" md="7" lg="5">
            <Card>
              <div className="p-3 border-bottom bg-light">
                <CardTitle>
                  <i className="mr-2 mdi mdi-server-plus" />
                  Manual add a server
                </CardTitle>
                <CardSubtitle>Enter information about the server</CardSubtitle>
              </div>
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
                  <Button
                    className="btn"
                    outline
                    color="primary"
                    style={{ float: 'right' }}
                  >
                    Add
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
