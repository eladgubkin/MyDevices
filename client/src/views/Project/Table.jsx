import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Card, CardBody, CardTitle } from 'reactstrap';
import NoDataComponent from '../../components/common/NoDataComponent';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log(this.props);
    return (
      <Card>
        <CardTitle className="bg-light border-bottom p-3 mb-0">
          <i className="mdi mdi-border-right mr-2" />
          Basic Table
        </CardTitle>
        <CardBody>
          <ReactTable
            data={this.props.computers}
            columns={[
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
            style={{
              height: '100%',
              width: '100%'
            }}
            filterable
            NoDataComponent={NoDataComponent}
            defaultPageSize={10}
            showPagination={true}
            showPageSizeOptions={false}
            pageSizeOptions={[5, 10, 20, 25]}
            className="-highlight"
          />
        </CardBody>
      </Card>
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
