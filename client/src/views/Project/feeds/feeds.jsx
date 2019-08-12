import React from 'react';
import { Card, CardBody } from 'reactstrap';
// import PerfectScrollbar from 'react-perfect-scrollbar';
import FeedData from './feeddata';

class Feeds extends React.Component {
  render() {
    return (
      <Card style={{ height: '500px' }}>
        {/* <CardTitle className="bg-light border-bottom p-3 mb-0">Log</CardTitle> */}
        <CardBody>
          <div
            className="feeds scrollable"
            style={{ height: '460px', overflowY: 'auto' }}
          >
            {/* <PerfectScrollbar> */}
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />
            <FeedData
              buttoncolor="info"
              iconname="far fa-bell"
              content="You have 4 pending tasks."
              smtext="hh:mm:ss"
            />

            {/* </PerfectScrollbar> */}
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Feeds;
