import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import NoDataComponent from '../../../components/common/NoDataComponent';

class List extends Component {
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
        ip: ip
      };
    });

    return (
      <div className="list" style={{ overflowY: 'auto', minHeight: '450px' }}>
        <ReactTable
          data={data}
          columns={[
            {
              Header: 'Name',
              accessor: 'name',
              width: '50%'
            },
            {
              Header: 'IP Address',
              accessor: 'ip',
              width: '50%'
            }
          ]}
          filterable
          NoDataComponent={NoDataComponent}
          pageSize={data.length === 0 ? 15 : data.length}
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  computers: state.computer.computers,
  currentTheme: state.settings.currentTheme
});

List.propTypes = {
  computers: PropTypes.object.isRequired,
  currentTheme: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  null
)(List);
