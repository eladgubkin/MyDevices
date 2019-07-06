import React from 'react';
import classnames from 'classnames';
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Row,
  Col
} from 'reactstrap';
import NetworkScan from './NetworkScan';
import ManualAdd from './ManualAdd';
import Results from './Results';

class RightPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1'
    };
  }
  componentDidMount() {
    window.addEventListener('load', this.defaultSettings);
  }

  rightPanelToggle = () => {
    document.getElementById('customizer').classList.toggle('show-service-panel');
    document.getElementById('toggle-btn').classList.toggle('mdi-arrow-right');
  };

  tabToggle = tab => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  };

  render() {
    return (
      <aside className="customizer" id="customizer">
        <a
          className="service-panel-toggle text-white"
          onClick={this.rightPanelToggle}
        >
          <i id="toggle-btn" className="mdi mdi-access-point-network" />
        </a>
        <div className="customizer-body pt-3 pb-3">
          <div className="px-3">
            <Card>
              <CardBody>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '1'
                      })}
                      onClick={() => {
                        this.tabToggle('1');
                      }}
                    >
                      Network Scan
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '2'
                      })}
                      onClick={() => {
                        this.tabToggle('2');
                      }}
                    >
                      Manual Add
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: this.state.activeTab === '3'
                      })}
                      onClick={() => {
                        this.tabToggle('3');
                      }}
                    >
                      Results
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <NetworkScan rightPanelToggle={this.rightPanelToggle} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <ManualAdd rightPanelToggle={this.rightPanelToggle} />
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="12">
                        <Results rightPanelToggle={this.rightPanelToggle} />
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </div>
        </div>
      </aside>
    );
  }
}
export default RightPanel;
