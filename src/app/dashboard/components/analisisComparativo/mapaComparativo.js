import React from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  ScaleControl,
  MapControl,
  Marker,
  Popup,
  GeoJSON,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoJsonData from "../../../../../public/data/Mancha_Urbana_2017.json";

const position = [-39.821148, -73.237661];

const WindroseControl = () => {
  return (
    <div className="windrose-control">
      {/* Aquí puedes agregar tu imagen de rosa de los vientos */}
      <img src="norte.png" alt="Windrose" />
    </div>
  );
};

export default class MapaComparativo extends React.Component {
  render() {
    return (
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
        className="mapaDeServicios"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={geoJsonData} />
        <div className="windrose-container">
          <WindroseControl />{" "}
          {/* Agrega el componente del rosa de los vientos */}
        </div>
        <ZoomControl position="topright"/>
        <ScaleControl imperial={false} position="bottomright" />
      </MapContainer>
    );
  }
}
