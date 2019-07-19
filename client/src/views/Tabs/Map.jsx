import React, { Component } from 'react';
import { CardBody } from 'reactstrap';
import L from 'leaflet';
import { Map as M, ImageOverlay } from 'react-leaflet';
import map from '../../assets/map.jpg';

class Map extends Component {
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
        <M
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
          {/* 
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
          })} */}
        </M>
      </CardBody>
    );
  }
}

export default Map;
