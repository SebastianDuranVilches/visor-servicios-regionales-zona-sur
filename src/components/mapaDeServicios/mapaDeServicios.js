import React from "react";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  ScaleControl,
  MapControl,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./mapaDeServicios.css";

const position = [-40.153912, -72.936010];

const WindroseControl = () => {
  return (
    <div className="windrose-control">
      {/* Aquí puedes agregar tu imagen de rosa de los vientos */}
      <img src="norte.png" alt="Windrose" />
    </div>
  );
};

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
        <div className="windrose-container">
          <WindroseControl /> {/* Agrega el componente del rosa de los vientos */}
        </div>
        <ZoomControl position="bottomright" />
        <ScaleControl imperial={false} position="bottomright"  />
      </MapContainer>
    );
  }
}
