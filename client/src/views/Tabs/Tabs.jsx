import React, { Component } from 'react';
import {
  Card,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  CardBody,
  CardTitle
} from 'reactstrap';
import classnames from 'classnames';
import Overview from './Overview';
import Map from './Map';
import Table from './Table';

export default class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
    };
  }

  toggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <Card className="mb-0">
        <CardTitle className="bg-light border-bottom p-3 mb-0">
          <i className="mdi mdi-tab-unselected mr-2"> </i>
          Project 1 - Yifat
        </CardTitle>

        <CardBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '1'
                })}
                onClick={() => {
                  this.toggle('1');
                }}
              >
                Overview
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '2'
                })}
                onClick={() => {
                  this.toggle('2');
                }}
              >
                Locations
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '3'
                })}
                onClick={() => {
                  this.toggle('3');
                }}
              >
                All Servers
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab} className="h-100">
            <TabPane tabId="1" className="h-100">
              <Overview />
            </TabPane>
            <TabPane tabId="2" className="h-100">
              <Map />
            </TabPane>
            <TabPane tabId="3" className="h-100">
              <Table />
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    );
  }
}
