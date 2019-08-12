import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import Chart from 'react-c3-component';
import 'c3/c3.css';

class Visitors extends React.Component {
  render() {
    return (
      <Card style={{ height: '500px' }}>
        <CardBody>
          <CardTitle>Server Status</CardTitle>
          <CardSubtitle className="mb-3">server status</CardSubtitle>
          <Chart
            style={{ width: '100%' }}
            config={{
              data: {
                columns: [['Down', 30], ['Unknown', 10], ['Up', 60]],
                type: 'donut',
                tooltip: {
                  show: true
                }
              },
              donut: {
                label: {
                  show: false
                },
                title: 'Server Status',
                width: 20
              },
              legend: {
                hide: true
              },
              color: {
                pattern: ['#d9534f', '#ccbe21', '#5cb85c']
              }
            }}
          />
        </CardBody>
        <div>
          <hr className="mt-0 mb-0" />
        </div>
        <CardBody>
          <div className="d-flex no-block align-items-center justify-content-center">
            <div>
              <h6 style={{ color: '#d9534f' }}>
                <i className="fa fa-circle font-10 mr-2" />
                Down
              </h6>
            </div>
            <div className="ml-3">
              <h6 style={{ color: '#ccbe21' }}>
                <i className="fa fa-circle font-10 mr-2" />
                Unknown
              </h6>
            </div>
            <div className="ml-3">
              <h6 style={{ color: '#5cb85c' }}>
                <i className="fa fa-circle font-10 mr-2" />
                Up
              </h6>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

export default Visitors;
