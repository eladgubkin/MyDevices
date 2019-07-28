import React, { Component } from 'react';
import map from '../../../assets/map.jpg';
import L from 'leaflet';
import { Map as M, ImageOverlay } from 'react-leaflet';

class Map extends Component {
  render() {
    return (
      <div className="map">
        {/* <img src={map} alt={map} /> */}
        <M
          scrollWheelZoom={true}
          center={[1117, 2225]}
          zoom={-1.2}
          style={{
            width: '100%',
            height: '100%',
            background: 'transparent',
            border: 'solid #525f7f 1px',
            borderRadius: '4px'
          }}
          crs={L.CRS.Simple}
          minZoom={-2}
          maxZoom={2}
          // maxBounds={[[2234, 0], [0, 2234]]}
          // setView={[1117, 2250]}
          zoomControl={true}
        >
          <ImageOverlay url={map} bounds={[[0, 0], [2234, 4500]]} />
        </M>
      </div>
    );
  }
}

export default Map;
