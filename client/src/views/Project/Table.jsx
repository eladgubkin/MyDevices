import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { Card, CardBody, CardTitle } from 'reactstrap';
import NoDataComponent from '../../components/common/NoDataComponent';
import { pingComputers } from '../../state/ducks/computer/actions';
import isEmpty from '../../utils/is-empty';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      selectAll: 0
    };
  }

  toggleRow = name => {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[name] = !this.state.selected[name];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  };

  toggleSelectAll = () => {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.props.computers.forEach(x => {
        newSelected[x.name] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  };

  componentDidMount = () => {
    setInterval(() => {
      if (!isEmpty(this.props.computers) && !isEmpty(this.props.agents)) {
        const network = [];

        this.props.computers.map(computer => {
          return network.push(computer.ip);
        });

        const agentId = this.props.agents[0];
        const time = new Date();

        console.log(
          time.getHours() +
            ':' +
            time.getMinutes() +
            ':' +
            time.getSeconds() +
            ' Pinging servers...'
        );

        this.props.pingComputers(network, agentId, this.props.computers);
      }
    }, 60000);
  };

  render() {
    return (
      <Card>
        <CardTitle className="bg-light border-bottom p-3 mb-0">
          <i className="mdi mdi-border-right mr-2" onClick={this.pingComputers} />
          Table
        </CardTitle>
        <CardBody>
          <ReactTable
            data={this.props.computers}
            columns={[
              {
                id: 'checkbox',
                accessor: '',
                Cell: ({ original }) => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selected[original.name] === true}
                      onChange={() => this.toggleRow(original.name)}
                    />
                  );
                },
                Header: x => {
                  return (
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={this.state.selectAll === 1}
                      ref={input => {
                        if (input) {
                          input.indeterminate = this.state.selectAll === 2;
                        }
                      }}
                      onChange={() => this.toggleSelectAll()}
                    />
                  );
                },
                sortable: false,
                filterable: false,
                width: 45,
                style: {
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }
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
                minWidth: 100,
                Cell: e => {
                  const ping = Number(e.value.substring(0, e.value.length - 2));
                  if (ping < 100) {
                    return (
                      <div
                        style={{
                          color: '#5cb85c',
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        {e.value}
                      </div>
                    );
                  }
                  if (ping < 300 && ping >= 100) {
                    return (
                      <div
                        style={{
                          color: '#FFA500',
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        {e.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        style={{
                          color: '#d9534f',
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        {e.value}
                      </div>
                    );
                  }
                }
              },
              {
                Header: 'Mac Address',
                accessor: 'mac',
                minWidth: 200
              },
              {
                Header: 'Location',
                accessor: 'location',
                minWidth: 150
              },
              {
                Header: 'UpTime',
                accessor: 'uptime',
                minWidth: 300
              },
              {
                Header: 'Description',
                accessor: 'description',
                width: 450
              }
            ]}
            style={{
              height: '500px',
              width: '100%',
              fontFamily: 'Source Code Pro',
              fontWeight: 'bold'
            }}
            filterable
            NoDataComponent={NoDataComponent}
            pageSize={10}
            showPagination={true}
            showPageSizeOptions={false}
            pageSizeOptions={[5, 10, 20, 25]}
            defaultFilterMethod={(filter, row) => {
              const id = filter.pivotId || filter.id;
              return row[id] !== undefined
                ? String(row[id].toLowerCase()).startsWith(
                    filter.value.toLowerCase()
                  )
                : true;
            }}
            className="-highlight"
          />
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  computers: state.computer.computers,
  currentTheme: state.settings.currentTheme,
  agents: state.agent.agents,
  ping: state.computer.ping
});

Table.propTypes = {
  computers: PropTypes.array.isRequired,
  currentTheme: PropTypes.string.isRequired,
  pingComputers: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { pingComputers }
)(Table);
