import React, { Component } from 'react';
import { CardSubtitle, Progress } from 'reactstrap';
class Graph extends Component {
  render() {
    return (
      <div className="graph">
        <div>
          <h3>86%</h3>
          <CardSubtitle>Total Product</CardSubtitle>
          <Progress color="warning" value="30" animated />
        </div>

        <div>
          <h3>40%</h3>
          <CardSubtitle>Pending Product</CardSubtitle>
          <Progress color="info" value="50" animated />
        </div>

        <div>
          <h3>56%</h3>
          <CardSubtitle>Completed Product</CardSubtitle>
          <Progress color="success" value="60" animated />
        </div>

        <div>
          <h3>26%</h3>
          <CardSubtitle>Overall Product</CardSubtitle>
          <Progress color="danger" value="75" animated />
        </div>
      </div>
    );
  }
}

export default Graph;
