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
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import geoJsonData from "../../../../../public/data/Mancha_Urbana_2017.json";
import { Form } from "react-bootstrap";

const position = [-39.821148, -73.237661];

const WindroseControl = () => {
  return (
    <div className="windrose-control">
      {/* Aquí puedes agregar tu imagen de rosa de los vientos */}
      <img src="norte.png" alt="Windrose" />
    </div>
  );
};

function calcularCentroPoligono(geoJSON) {
  if (geoJSON && geoJSON.geometry && geoJSON.geometry.type === "Polygon") {
    const coordinates = geoJSON.geometry.coordinates[0]; // Suponiendo que las coordenadas son un anillo exterior

    if (coordinates.length > 0) {
      // Inicializa las sumas de latitud y longitud
      let sumLatitud = 0;
      let sumLongitud = 0;

      // Suma las coordenadas de los vértices
      for (const coord of coordinates) {
        sumLatitud += coord[1];
        sumLongitud += coord[0];
      }

      // Calcula el centro dividiendo por el número de vértices
      const centroLatitud = sumLatitud / coordinates.length;
      const centroLongitud = sumLongitud / coordinates.length;

      return [centroLongitud, centroLatitud]; // Importante: [longitud, latitud]
    }
  }

  return null; // Devuelve null si no se pudo calcular el centro
}

function calculoDePoligonos (geoJSON){
  const coordinates = geoJSON; // Suponiendo que las coordenadas son un anillo exterior

    if (coordinates.length > 0) {
      // Inicializa las sumas de latitud y longitud
      let sumLatitud = 0;
      let sumLongitud = 0;

      // Suma las coordenadas de los vértices
      for (const coord of coordinates) {
        sumLatitud += coord[1];
        sumLongitud += coord[0];
      }

      // Calcula el centro dividiendo por el número de vértices
      const centroLatitud = sumLatitud / coordinates.length;
      const centroLongitud = sumLongitud / coordinates.length;

      return [centroLongitud, centroLatitud]; // Importante: [longitud, latitud]
    }
}

function calcularCentroMultiPoligonos(geoJSON) {
  const { type, coordinates } = geoJSON.geometry;
  // Caso para múltiples polígonos
  const centros = coordinates.map((polygonCoordinates) =>
  calculoDePoligonos(polygonCoordinates[0])
  );
  console.log(coordinates);
  console.log(centros);
  // Calcula el centro promedio de los polígonos
  if (centros.length > 0) {
    const sumLatitud = centros.reduce((sum, centro) => sum + centro[1], 0);
    const sumLongitud = centros.reduce((sum, centro) => sum + centro[0], 0);

    const centroLatitud = sumLatitud / centros.length;
    const centroLongitud = sumLongitud / centros.length;

    return [centroLongitud, centroLatitud];
  }

  return null;
}

export default class MapaComparativo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ciudades: [],
      servicios: [],
      servicio: null,
    };
  }
  // Supongamos que tienes una lista de ciudades a destacar
  componentDidUpdate(prevProps) {
    if (this.props.ciudades !== prevProps.ciudades) {
      this.setState({
        ciudades: this.props.ciudades.map((ciudad) => ciudad.urbano),
      });
    }
  }

  // Función para crear los CircleMarkers para ciudades destacadas
  crearCircleMarkers() {
    return this.state.ciudades.map((ciudad, index) => {
      // Encuentra la geometría correspondiente a la ciudad en el archivo GeoJSON
      const ciudadGeometry = geoJsonData.features.find(
        (feature) => feature.properties.URBANO === ciudad
      );
      //console.log(calcularCentroMultiPoligonos(ciudadGeometry));
      if (ciudadGeometry) {
        // Extrae las coordenadas de la geometría
        //const coordinates = ciudadGeometry.geometry.coordinates[0];
        var coordinates = [0,0]
        if(ciudadGeometry.geometry.type === "Polygon"){
          coordinates = calcularCentroPoligono(ciudadGeometry);
        }else{
          coordinates = calcularCentroMultiPoligonos(ciudadGeometry);
        }
        // Crea un CircleMarker para la ciudad
        return (
          <CircleMarker
            key={index}
            center={[coordinates[1], coordinates[0]]} // Importante: [latitud, longitud]
            radius={15} // Puedes ajustar el tamaño del círculo según tus preferencias
            color="blue" // Puedes ajustar el color del círculo
            fillOpacity={0.5} // Ajusta la opacidad del círculo
          >
            <Popup open={true}>{ciudad}</Popup>
          </CircleMarker>
        );
      }

      return null;
    });
  }

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
        <ZoomControl position="topright" />
        <ScaleControl imperial={false} position="bottomright" />
        {/* Agrega los CircleMarkers para ciudades destacadas */}
        {this.crearCircleMarkers()}
        {/* Agrega la leyenda en la parte inferior derecha */}
        <div className="leyenda-container">
          <p>Leyenda: Tu leyenda aquí</p>
          <div className="leyenda-item">
            <div className="color alto"></div>
            Alto
          </div>
          <div className="leyenda-item">
            <div className="color medio-alto"></div>
            {/*<p>Medio-Alto</p>*/}
          </div>
          <div className="leyenda-item">
            <div className="color medio"></div>
            {/*<p>Medio</p>*/}
          </div>
          <div className="leyenda-item">
            <div className="color medio-bajo "></div>
            {/*<p>Medio-Bajo</p>*/}
          </div>
          <div className="leyenda-item">
            <div className="color bajo"></div>
            Bajo
          </div>
        </div>
        <div className="select-container">
          <Form.Select aria-label="Default select">
            <option>Seleccionar</option>
            <option>Valor 1</option>
            <option>Valor 2</option>
            <option>Valor 3</option>
          </Form.Select>
        </div>
      </MapContainer>
    );
  }
}
