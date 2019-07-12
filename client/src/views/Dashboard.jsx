import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card } from 'reactstrap';
import classnames from 'classnames';
import Map from './Map';
import Table from './Table';

export default class Dashboard extends Component {
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
      <Card
        style={{
          height: '94.6%',
          margin: 0
        }}
      >
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
              Map
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
              Table
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} className="h-100">
          <TabPane tabId="1" className="h-100">
            <Map />
          </TabPane>
          <TabPane tabId="2" className="h-100">
            <Table />
          </TabPane>
        </TabContent>
      </Card>
    );
  }
}
