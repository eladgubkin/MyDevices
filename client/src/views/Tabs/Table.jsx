import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { CardBody, Button } from 'reactstrap';
import { timeFormat } from '../../utils/timeFormat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      computers: {}
    };
  }

  componentWillReceiveProps(newProps) {
    const computers = this.state.computers;
    for (const [ip, snmp] of Object.entries(newProps.computers)) {
      if (ip in computers) {
        computers[ip].snmp = snmp;
      } else {
        computers[ip] = { snmp };
      }
    }
    this.setState({ ...this.state, computers });
  }

  render() {
    const data = Object.keys(this.state.computers).map(ip => {
      return {
        name: this.state.computers[ip].snmp.name,
        ip: ip,
        // eslint-disable-next-line
        mac: this.state.computers[ip].snmp.interfaces.map(doc => {
          if (doc.description === 'wl0') {
            return doc.mac;
          }
        }),
        location: this.state.computers[ip].snmp.location,
        uptime: timeFormat(this.state.computers[ip].snmp.uptime),
        description: this.state.computers[ip].snmp.description,
        actions: (
          <div className="text-center">
            <Button
              onClick={() => {
                alert('hi');
              }}
              color="inverse"
              size="sm"
              round="true"
              icon="true"
            >
              <i className="mdi mdi-map-marker-plus" />
            </Button>
          </div>
        )
      };
    });

    return (
      <CardBody style={{ height: 'calc(100vh - 277px)' }}>
        <ReactTable
          data={data}
          columns={[
            {
              accessor: 'actions',
              sortable: false,
              filterable: false,
              width: 50
            },
            {
              Header: 'Name',
              accessor: 'name',
              minWidth: 150
            },
            {
              Header: 'IP Address',
              accessor: 'ip',
              minWidth: 150
            },
            {
              Header: 'Mac Address',
              accessor: 'mac',
              minWidth: 150
            },
            {
              Header: 'Location',
              accessor: 'location',
              minWidth: 150
            },
            {
              Header: 'UpTime',
              accessor: 'uptime',
              minWidth: 250
            },
            {
              Header: 'Description',
              accessor: 'description',
              width: 420
            }
          ]}
          pageSize={data.length === 0 ? 0 : data.length}
          showPagination={false}
          showPageSizeOptions={false}
          showPaginationTop={false}
          showPaginationBottom={false}
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

const mapStateToProps = state => ({
  computers: state.computer.computers,
  currentTheme: state.settings.currentTheme
});

Table.propTypes = {
  computers: PropTypes.object.isRequired,
  currentTheme: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(Table);
