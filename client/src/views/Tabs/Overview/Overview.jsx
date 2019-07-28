import React, { Component } from 'react';
import { CardBody } from 'reactstrap';
import List from './List';
import Map from './Map';
import Buttons from './Buttons/Buttons';
import Graph from './Graph';
import './Overview.css';

export default class Overview extends Component {
  render() {
    let style;

    if (window.innerWidth < 768) {
      style = { height: '100vh', overflowY: 'auto' };
    } else {
      style = { height: 'calc(100vh - 278px)', overflowY: 'auto' };
    }
    return (
      <CardBody style={style}>
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
