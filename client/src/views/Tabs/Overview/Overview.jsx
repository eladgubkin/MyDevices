import React, { Component } from 'react';
import { CardBody } from 'reactstrap';
import List from './List';
import Map from './Map';
import Buttons from './Buttons';
import Graph from './Graph';
import './Overview.css';

export default class Overview extends Component {
  render() {
    return (
      <CardBody style={{ height: 'calc(100vh - 278px)', overflowY: 'auto' }}>
        <div id="Overview">
          <List />
          <div className="section">
            <Map />
            <Buttons />
            <Graph />
          </div>
        </div>
      </CardBody>
    );
  }
}
