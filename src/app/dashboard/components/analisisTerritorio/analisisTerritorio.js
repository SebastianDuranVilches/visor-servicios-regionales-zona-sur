import React from "react";
import "./analisisTerritorio.css";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
//import RadarChartAnalisis from "./radarChart";
import dynamic from "next/dynamic";
import manchasUrbanas from "../../../../../public/data/Mancha_Urbana_2017.json";
import Multiselect from "multiselect-react-dropdown";
import ValoresAnalisis from "./valoresAnalisis";

const MapaAnalisis = dynamic(() => import("./mapaAnalisis"), { ssr: false });

const RadarChartAnalisis = dynamic(() => import("./radarChart"), {
  ssr: false,
});

function quitarTildes(cadena) {
  const tildes = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
  };
  // Reemplazar tildes
  cadena = cadena.replace(/[áéíóúÁÉÍÓÚ]/g, (letra) => tildes[letra] || letra);

  // Eliminar espacios al final de la cadena
  cadena = cadena.trim();

  return cadena;
}


export default class AnalisisTerritorio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      indiceDimension: props.indiceDimension,
      indiceProvisionCiudad: props.indiceProvisionCiudad,
      rangosIndicadores: props.rangosIndicadores,
      rangosDimensiones: props.rangosDimensiones,
      rangosIndiceProvision: props.rangosIndiceProvision,
      valorPorCiudadIndicador: props.valorPorCiudadIndicador,
      mostrarIndiceDimension: props.indiceDimension,
      mostrarIndiceProvisionCiudad: props.indiceProvisionCiudad,
      mostrarRangosIndicadores: props.rangosIndicadores,
      mostrarRangosDimensiones: props.rangosDimensiones,
      mostrarRangosIndiceProvision: props.rangosIndiceProvision,
      mostrarValorPorCiudadIndicador: props.valorPorCiudadIndicador,
      nombreIndicadores: props.nombreIndicadores,
      zonasUrbanas: [],
      ciudad: "",
      listaIndicadores: [],
      selectedUrbanosDimensiones: [],
      selectedUrbanosServicios: [],
      comparativoDimensiones: [],
      NombreServicioComparativa: { nombre: "Seleccione un servicio" },
      medida: "",
      subMedida: "",
      valores: {
        valor: 0,
        maximo: 0,
        minimo: 0,
        mediana: 0,
        promedio: 0,
        rangos: [],
      },
    };
  }

  componentDidUpdate(prevProps) {
    // Verifica si los props han cambiado y actualiza el estado local
    if (
      prevProps.indiceDimension !== this.props.indiceDimension ||
      prevProps.indiceProvisionCiudad !== this.props.indiceProvisionCiudad ||
      prevProps.rangosIndicadores !== this.props.rangosIndicadores ||
      prevProps.rangosDimensiones !== this.props.rangosDimensiones ||
      prevProps.rangosIndiceProvision !== this.props.rangosIndiceProvision ||
      prevProps.valorPorCiudadIndicador !==
        this.props.valorPorCiudadIndicador ||
      prevProps.nombreIndicadores !== this.props.nombreIndicadores
    ) {
      this.actualizarEstadoLocal();
    }
  }

  actualizarEstadoLocal() {
    // Actualiza el estado local con los nuevos props
    this.setState({
      indiceDimension: this.props.indiceDimension,
      indiceProvisionCiudad: this.props.indiceProvisionCiudad,
      rangosIndicadores: this.props.rangosIndicadores,
      rangosDimensiones: this.props.rangosDimensiones,
      rangosIndiceProvision: this.props.rangosIndiceProvision,
      valorPorCiudadIndicador: this.props.valorPorCiudadIndicador,
      nombreIndicadores: this.props.nombreIndicadores,
    });
  }

  obtenerZonasUrbanas = () => {
    const zonasUrbanas = [];
    for (let i = 0; i < manchasUrbanas.features.length; i++) {
      const poligono = manchasUrbanas.features[i];
      if (poligono.properties.URBANO) {
        zonasUrbanas.push({
          comuna: poligono.properties.COMUNA,
          nombreComuna: poligono.properties.NOM_COMUNA,
          urbano: poligono.properties.URBANO,
          region: poligono.properties.REGION,
          nombreRegion: poligono.properties.NOM_REGION,
        });
      }
    }
    return zonasUrbanas;
  };

  cambiarValores = (subMedida) => {
    this.setState({ subMedida: subMedida }, () => {
      console.log(this.state.ciudad);
      console.log(this.state.medida);
      console.log(this.state.subMedida);

      if (this.state.medida == "Previsión") {
        const ciudadEncontrada = this.buscarCiudad(this.state.ciudad[0],this.state.indiceProvisionCiudad, "Indice provisión");
        console.log(ciudadEncontrada);

      }
      if (this.state.medida == "Dimensión") {

      }
      if (this.state.medida === "Servicio") {

      }
      // Dejar en 0
    });
  };

  buscarCiudad = (ciudadBuscada, medida,subMedida) => {
    let ciudadEncontrada = medida.find((ciudad) =>
    quitarTildes(ciudad["Entidad urbana"].toUpperCase()).includes(
      quitarTildes(ciudadBuscada.urbano.toUpperCase())
    )
  );

  if (!ciudadEncontrada) {
    ciudadEncontrada = medida.find((ciudad) =>
      quitarTildes(ciudad["Entidad urbana"].toUpperCase()).includes(
        quitarTildes(ciudadBuscada["nombreComuna"].toUpperCase())
      )
    );
  }

  if (!ciudadEncontrada) {
    ciudadEncontrada = medida.find((ciudad) =>
      quitarTildes(ciudadBuscada.urbano.toUpperCase()).includes(
        quitarTildes(ciudad["Entidad urbana"].toUpperCase())
      )
    );
  }
  return ciudadEncontrada[subMedida];
  }

  opcionesDeMedida = () => {
    if (this.state.medida == "Previsión") {
      return <option value="Previsión">Previsión</option>;
    }
    if (this.state.medida == "Dimensión") {
      // Usamos un Set para almacenar dimensiones únicas
      const dimensionesUnicas = new Set();

      // Llenamos el Set con dimensiones únicas
      this.state.nombreIndicadores.forEach((indicador) => {
        dimensionesUnicas.add(indicador["Dimensión"]);
      });

      // Mapeamos el Set para renderizar las opciones
      const opcionesDimensiones = Array.from(dimensionesUnicas).map(
        (dimension, index) => (
          <option key={index} value={dimension}>
            {dimension}
          </option>
        )
      );

      return (
        <>
          <option>Seleccionar Dimensión</option>
          {opcionesDimensiones}
        </>
      );
    }
    if (this.state.medida === "Servicio") {
      return (
        <>
          <option>Seleccionar Servicio</option>
          {this.state.nombreIndicadores.map((indicador) => {
            return (
              <option
                key={indicador["Codificación"]}
                value={`${indicador["Codificación"]}-${indicador["Indicador o variable"]}`}
              >
                {indicador["Indicador o variable"]}
              </option>
            );
          })}
        </>
      );
    }
    return <option> Seleccionar medida</option>;
  };

  render() {
    const listaZonasUrbanas = this.obtenerZonasUrbanas();
    return (
      <div className="analisisTerritorio p-1">
        <Row className="text-center pt-4">
          <h3 className="titulos-dashboard">ANÁLISIS POR TERRITORIO</h3>
          <h3 className="titulos-dashboard">TERRITORIO: REGIÓN/CIUDAD</h3>
        </Row>
        <Container>
          <Row className="p-1 analisis-big-box">
            <Col lg className="analisis-boxs m-3 py-3">
              <div
                className="d-flex flex-column justify-content-between"
                style={{ height: "100%" }}
              >
                <h3 className="titulos-dashboard p-2">PANEL DE CONTROL</h3>
                <div className="p-2">
                  ZONA URBANA
                  <Multiselect
                    selectedValues={this.state.ciudad}
                    onSelect={(e) => {
                      this.setState({ ciudad: e });
                    }}
                    options={listaZonasUrbanas}
                    displayValue="urbano"
                    groupBy="nombreRegion"
                    singleSelect
                    style={{
                      chips: {
                        background: "#634F4E",
                        color: "white",
                      },
                      searchBox: {
                        /*maxHeight:"74px"*/
                      },
                    }}
                  />
                </div>
                <div className="p-2 ">
                  MEDIDA
                  <Form.Select
                    aria-label="Default select"
                    onChange={(e) => {
                      this.setState({ medida: e.target.value });
                      if (e.target.value == "Previsión") {
                        this.setState({ subMedida: e.target.value });
                        this.cambiarValores(e.target.value);
                      }
                    }}
                    value={this.state.medida}
                  >
                    <option>Medida</option>
                    <option value="Previsión">Previsión</option>
                    <option value="Dimensión">Dimensión</option>
                    <option value="Servicio">Servicio</option>
                  </Form.Select>
                </div>

                <div className="p-2">
                  SELECCIONAR{" "}
                  {this.state.medida != ""
                    ? this.state.medida.toUpperCase()
                    : "MEDIDA"}
                  <Form.Select
                    aria-label="Default select"
                    value={this.state.subMedida}
                    onChange={(e) => {
                      this.setState({ subMedida: e.target.value });
                      this.cambiarValores(e.target.value);
                    }}
                  >
                    {this.opcionesDeMedida()}
                  </Form.Select>
                </div>
                <div className="p-2 py-3">
                  <a>
                    <Button
                      className="color-terciario w-100"
                      onClick={() => {
                        this.setState({
                          medida: "",
                          subMedida: "",
                          ciudad: "",
                        });
                        this.cambiarValores();
                      }}
                    >
                      <img src="./plusIcon.svg" alt="Plus Icon" /> Limpiar
                      gráfico
                    </Button>
                  </a>
                </div>
              </div>
            </Col>
            <Col lg className="analisis-boxs m-3">
              <div>
                <ValoresAnalisis
                  valor={this.state.valores.valor}
                  maximo={this.state.valores.maximo}
                  minimo={this.state.valores.minimo}
                  mediana={this.state.valores.mediana}
                  promedio={this.state.valores.promedio}
                  rangos={this.state.valores.rangos}
                ></ValoresAnalisis>
              </div>
            </Col>
            <Col
              lg
              className="analisis-boxs m-3"
              style={{ padding: "0px", minHeight: "358.294px" }}
            >
              <MapaAnalisis />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
