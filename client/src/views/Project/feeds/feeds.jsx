import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import FeedData from './feeddata';

class Feeds extends React.Component {
  render() {
    return (
      <Card>
        <CardBody>
          <CardTitle>Feeds</CardTitle>
          <div
            className="feeds scrollable"
            style={{ height: '232px', overflowY: 'auto' }}
          >
            {/* <PerfectScrollbar> */}
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="5 Aug"
            />

            <FeedData
              buttoncolor="success"
              iconname="ti-server"
              content="Server #1 overloaded."
              smtext="12 July"
            />

            <FeedData
              buttoncolor="warning"
              iconname="ti-shopping-cart"
              content="New order received."
              smtext="31 May"
            />

            <FeedData
              buttoncolor="danger"
              iconname="ti-user"
              content="New user registered."
              smtext="30 May"
            />
            <FeedData
              buttoncolor="danger"
              iconname="ti-user"
              content="New user registered."
              smtext="30 May"
            />
            <FeedData
              buttoncolor="danger"
              iconname="ti-user"
              content="New user registered."
              smtext="30 May"
            />
            <FeedData
              buttoncolor="danger"
              iconname="ti-user"
              content="New user registered."
              smtext="30 May"
            />
            {/* </PerfectScrollbar> */}
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Feeds;
