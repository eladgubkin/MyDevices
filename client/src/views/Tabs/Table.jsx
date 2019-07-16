import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import * as data from './data.json';
import { CardBody } from 'reactstrap';

class Table extends Component {
  msToTime = duration => {
    // eslint-disable-next-line
    var milliseconds = parseInt((duration % 1000) / 100, 10),
      seconds = parseInt((duration / 1000) % 60, 10),
      minutes = parseInt((duration / (1000 * 60)) % 60, 10),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  };

  render() {
    return (
      <CardBody style={{ height: 'calc(100vh - 277px)' }}>
        <ReactTable
          data={data.map(doc => {
            return {
              name: doc.name,
              ip: doc.ip,
              alive: doc.alive ? 'Alive' : 'Dead',
              uptime: this.msToTime(doc.uptime),
              ping: doc.ping
            };
          })}
          columns={[
            {
              Header: 'Name',
              accessor: 'name'
            },
            {
              Header: 'IP',
              accessor: 'ip'
            },
            {
              Header: 'Status',
              accessor: 'alive'
            },
            {
              Header: 'UpTime',
              accessor: 'uptime'
            },
            {
              Header: 'Ping',
              accessor: 'ping'
            }
          ]}
          defaultPageSize={data.length}
          showPagination={false}
          showPageSizeOptions={false}
          showPaginationTop={false}
          showPaginationBottom={false}
          pageSizeOptions={[5, 10, 20, 25, 50, data.length]}
          style={{
            height: '100%',
            width: '100%'
          }}
          className="-highlight"
        />
      </CardBody>
    );
  }
}

export default Table;