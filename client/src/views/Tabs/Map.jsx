import React, { Component } from 'react';
import { CardBody } from 'reactstrap';
// import L from 'leaflet';
// import { Map as M, ImageOverlay } from 'react-leaflet';
import ImageMapper from 'react-image-mapper';
import map from '../../assets/map.jpg';

class Map extends Component {
  render() {
    return (
      <CardBody style={{ height: 'calc(100vh - 277px)' }}>
        <ImageMapper src={map} />
        {/* <M
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
          maxBounds={[[2234, 0], [0, 2234]]}
          // setView={[1117, 2250]}
          zoomControl={true}
        >
          <ImageOverlay url={map} bounds={[[0, 0], [2234, 4500]]} />
          
          {data.map((doc, i) => {
            return (
              <Marker
                key={i}
                position={doc.position}
                draggable={true}
                onDragend={e => {
                  console.log([e.target.getLatLng().lat, e.target.getLatLng().lng]);
                }}
              >
                <Tooltip>
                  <b>Name</b>: {doc.name} <br />
                  <b>IP</b>: <a href={doc.ip}>{doc.ip}</a> <br />
                  <b>Ping</b>: {doc.ping} <br />
                  <b>UpTime</b>: {this.msToTime(doc.uptime)}
                </Tooltip>
              </Marker>
            );
          })}
        </M> */}
      </CardBody>
    );
  }
}

export default Map;
