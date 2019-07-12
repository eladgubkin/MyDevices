import React, { Component } from 'react';
import { VectorMap } from 'react-jvectormap';
import '../assets/vectormap.css';
import { CardBody } from 'reactstrap';

class Map extends Component {
  render() {
    var mapData = {
      FR: 540,
      AU: 360,
      GB: 690,
      GE: 200,
      IN: 400,
      RO: 600,
      RU: 300,
      US: 2920
    };

    return (
      <CardBody className="h-100">
        <VectorMap
          map={'world_mill'}
          backgroundColor="transparent"
          zoomOnScroll={true}
          containerStyle={{
            width: '100%',
            height: '100%'
          }}
          containerClassName="map"
          regionStyle={{
            initial: {
              fill: '#d5e4e4',
              'fill-opacity': 0.9,
              stroke: '1',
              'stroke-width': 1,
              'stroke-opacity': 0.5
            }
          }}
          series={{
            regions: [
              {
                values: mapData,
                scale: ['#2e66ff', '#2962ff']
              }
            ]
          }}
        />
      </CardBody>
    );
  }
}

export default Map;
