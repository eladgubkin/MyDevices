import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { CardBody, Button } from 'reactstrap';
import { timeFormat } from '../../utils/timeFormat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NoDataComponent from '../../components/common/NoDataComponent';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      computers: {}
    };
  }

  // componentWillReceiveProps(newProps) {
  //   const computers = this.state.computers;
  //   for (const [ip, snmp] of Object.entries(newProps.computers)) {
  //     if (ip in computers) {
  //       computers[ip].snmp = snmp;
  //     } else {
  //       computers[ip] = { snmp };
  //     }
  //   }
  //   this.setState({ ...this.state, computers });
  // }

  render() {
    console.log(this.props);
    let style;
    if (window.innerWidth < 768) {
      style = { height: 'calc(100vh - 218px)' };
    } else {
      style = { height: 'calc(100vh - 278px)' };
    }

    // const data = Object.keys(this.state.computers).map(ip => {
    //   return {
    //     name: this.state.computers[ip].snmp.name,
    //     ip: ip,
    //     // eslint-disable-next-line
    //     mac: this.state.computers[ip].snmp.interfaces.map(doc => {
    //       if (doc.description === 'wl0') {
    //         return doc.mac;
    //       }
    //     }),
    //     location: this.state.computers[ip].snmp.location,
    //     uptime: timeFormat(this.state.computers[ip].snmp.uptime),
    //     description: this.state.computers[ip].snmp.description,
    //     actions: (
    //       <div className="text-center">
    //         <Button
    //           onClick={() => {
    //             alert('hi');
    //           }}
    //           color="inverse"
    //           size="sm"
    //           round="true"
    //           icon="true"
    //         >
    //           <i className="mdi mdi-map-marker-plus" />
    //         </Button>
    //       </div>
    //     )
    //   };
    // });

    return (
      <CardBody style={style}>
        <ReactTable
          // data={data}
          data={this.props.computers}
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
              Header: 'Ping',
              accessor: 'ping',
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
          filterable
          NoDataComponent={NoDataComponent}
          // pageSize={data.length === 0 ? 0 : data.length}
          showPagination={true}
          showPageSizeOptions={true}
          showPaginationTop={false}
          showPaginationBottom={true}
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
  computers: PropTypes.array.isRequired,
  currentTheme: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(Table);
