import React from "react";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";
import { iconPerson } from './mapIcon'

function Map({ countries, casesType, center, zoom, popUpData }) {
  return (
    <div className="map" style={{ background: 'none', border: 'none' }}>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
        <Marker position={center} icon={iconPerson}>
          <Popup>
            <div style={{ textAlign: "center", width: '100px', fontSize: '20px', fontWeight: 'bold', color: '#555' }}>
              {popUpData}
            </div>
          </Popup>
        </Marker>
      </LeafletMap>
    </div>
  );
}

export default Map;
