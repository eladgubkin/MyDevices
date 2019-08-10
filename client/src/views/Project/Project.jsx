import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Card } from 'reactstrap';
import Table from './Table.jsx';
import Map from '../../views/Tabs/Map';
import Feeds from './feeds/feeds';
import Visitors from './visitors';
import ProgressCards from './progress-cards';
import Buttons from './Buttons';
import { findAgents } from '../../state/ducks/agent/actions';
import { getComputers } from '../../state/ducks/computer/actions';
// import RevenueCards from './revenue-cards';
import NewsleterCompaign from './newsleter-compaign/newsleter-compaign';
import CardBandwidth from './card-bandwidth';
import CardDownload from './card-download';


class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getComputers();
    this.refreshAgents();
  }

  refreshAgents = () => {
    this.props.findAgents().then(() => {
      setTimeout(this.refreshAgents, 2000);
    });
  }

  render() {
    return (
      <div>
        <ProgressCards />
        {/* <RevenueCards /> */}

        <Row>
          <Col xl="7" lg="7">
            <Card style={{ height: '750px' }}>
              <Map />
            </Card>
          </Col>
          <Col xl="5" lg="5">
            <Visitors />
            <Feeds />
          </Col>
        </Row>

        <Buttons />

        <Row>
          <Col lg="12">
            <Table />
          </Col>
        </Row>
        <Row>
          <Col md="12" lg="12" xl="7">
            <NewsleterCompaign />
          </Col>
          <Col md="12" lg="12" xl="5">
            <CardBandwidth />
            <CardDownload />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

Project.propTypes = {
  findAgents: PropTypes.func.isRequired,
  getComputers: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { findAgents, getComputers }
)(Project);
