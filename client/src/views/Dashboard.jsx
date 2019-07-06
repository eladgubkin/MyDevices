import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardTitle,
  CardBody,
  Row,
  Col
} from 'reactstrap';
import classnames from 'classnames';
import Chart from 'react-c3-component';
import 'c3/c3.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <Card>
        <CardTitle className="bg-light border-bottom p-3 mb-0">
          <i className="mdi mdi-tab-unselected mr-2"> </i>
          Tabs
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
                Tab1
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
                Tab 2
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <CardBody>
                    <h4>Tab 1</h4>
                  </CardBody>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12" md="12" lg="6">
                  <CardBody>
                    <CardTitle>X axis tick culling Chart</CardTitle>
                    <Chart
                      config={{
                        data: {
                          columns: [
                            [
                              'options',
                              30,
                              200,
                              100,
                              400,
                              150,
                              250,
                              30,
                              200,
                              100,
                              400,
                              150,
                              250,
                              30,
                              200,
                              100,
                              400,
                              150,
                              250,
                              200,
                              100,
                              400,
                              150,
                              250
                            ]
                          ]
                        },
                        axis: {
                          x: { type: 'category', tick: { culling: { max: 4 } } }
                        },
                        grid: { y: { show: !0 } },
                        size: { height: 400 },
                        color: { pattern: ['#4fc3f7', '#E91E63'] }
                      }}
                    />
                  </CardBody>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    );
  }
}
