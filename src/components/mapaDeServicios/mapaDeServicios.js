import React from "react";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mapaDeServicios.css";

const position = [-40.153912, -72.936010];

export default class MapaDeServicios extends React.Component {
  render() {
    return (
      <MapContainer
        center={position}
        zoom={8}
        scrollWheelZoom={true}
        className="mapaDeServicios"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position="bottomright" />
      </MapContainer>
    );
  }
}
