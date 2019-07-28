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
import Overview from './Overview/Overview';
import Map from './Map';
import Table from './Table';
// import { changeTab } from '../../state/ducks/settings/actions';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

class Tabs extends Component {
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
      // this.props.changeTab(tab);
    }
  };

  render() {
    let style;

    if (window.innerWidth < 768) {
      style = { height: 'calc(100vh - 218px)' };
    } else {
      style = { height: 'calc(100vh - 278px)' };
    }

    return (
      <Card className="mb-0">
        <CardTitle className="bg-light border-bottom p-3 mb-0">
          <i className="mdi mdi-tab-unselected mr-2"> </i>
          Project 1 - Yifat
        </CardTitle>

        <CardBody>
          <Nav pills className="custom-pills border-bottom">
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
                Map
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
                Table
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === '4'
                })}
                onClick={() => {
                  this.toggle('4');
                }}
              >
                Graph
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
            <TabPane tabId="4" className="h-100">
              <CardBody style={style}>
                <h4>Graph</h4>
              </CardBody>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  // currentTab: state.settings.currentTab
});

Tabs.propTypes = {
  // changeTab: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  null
)(Tabs);
