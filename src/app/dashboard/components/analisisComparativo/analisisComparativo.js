import React from "react";
import "./analisisComparativo.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import dynamic from "next/dynamic";

const MapaComparativo = dynamic(() => import("./mapaComparativo"), {
  ssr: false,
});

const GradicoComparativoCiudadesDimensiones = dynamic(
  () => import("./graficoComparativoCiudadesDimensiones"),
  {
    ssr: false,
  }
);

const GraficoComparativoUnServicio = dynamic(
  () => import("./graficoComparativoUnServicio"),
  {
    ssr: false,
  }
);

export default class AnalisisComparativo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaDeServicios: [
        "CAMAS HOSPITALARIAS",
        "CHILEXPRESS",
        "INDAP",
        "SAG",
        "CAPREDENA",
      ],
      listaDeServiciosAMostrar: [
        "CAMAS HOSPITALARIAS",
        "CHILEXPRESS",
        "INDAP",
        "SAG",
        "CAPREDENA",
      ],
      listaComunas: [
        "CUNCO",
        "CARAHUE",
        "LOS SAUCES",
        "VALDIVIA",
        "LOS LAGOS",
        "LA UNION",
      ],
    };
    this.establecerListaDeServicios =
      this.establecerListaDeServicios.bind(this);
  }

  establecerListaDeServicios(servicio) {
    this.setState({
      listaDeServicios: [...this.state.listaDeServicios, servicio],
    });
  }

  agregarServiciosAlistaDeServicios(servicio) {
    this.setState({
      listaDeServicios: [...this.state.listaDeServicios, servicio],
    });
  }

  eliminarServiciosAlistaDeServicios(servicio) {
    const nuevaLista = this.state.listaDeServicios.filter(
      (str) => str !== servicio
    );
    this.setState({ listaDeServicios: nuevaLista });
  }

  seleccionarComunasRegion = (valor) => {
    if (valor == "1") {
      this.setState({
        listaComunas: ["CUNCO", "CARAHUE", "LOS SAUCES"],
      });
    } else if (valor == "2") {
      this.setState({
        listaComunas: ["VALDIVIA", "LOS LAGOS", "LA UNION"],
      });
    } else {
      this.setState({
        listaComunas: ["VILCUN", "TOLTEN", "TEMUCO"],
      });
    }
  };

  seleccionarDimension = (valor) => {
    if (valor == "1") {
      this.setState({
        listaDeServicios: ["CHILEXPRESS"],
        listaDeServiciosAMostrar: ["CHILEXPRESS"],
      });
    } else if (valor == "2") {
      this.setState({
        listaDeServicios: ["INDAP", "SAG"],
        listaDeServiciosAMostrar: ["INDAP", "SAG"],
      });
    } else if (valor == "3") {
      this.setState({
        listaDeServicios: ["CAMAS HOSPITALARIAS"],
        listaDeServiciosAMostrar: ["CAMAS HOSPITALARIAS"],
      });
    } else {
      this.setState({
        listaDeServicios: [
          "CAMAS HOSPITALARIAS",
          "CHILEXPRESS",
          "INDAP",
          "SAG",
          "CAPREDENA",
        ],
        listaDeServiciosAMostrar: [
          "CAMAS HOSPITALARIAS",
          "CHILEXPRESS",
          "INDAP",
          "SAG",
          "CAPREDENA",
        ],
      });
    }
  };

  render() {
    return (
      <div className="analisisComparativo p-1 pt-4  mt-3">
        <h3 className="titulos-dashboard text-center">ANÁLISIS COMPARATIVO</h3>
        <Container>
          <Row>
            <Col
              className="analisis-boxs m-3"
              style={{ padding: "0px", minHeight: "358.294px" }}
            >
              <MapaComparativo />
            </Col>
          </Row>
          <Row className="fila-comparativo">
            <Col lg className="analisis-boxs m-3 py-3 columna-comparativo">
              <GradicoComparativoCiudadesDimensiones
                ciudades={this.state.listaComunas}
                servicios={this.props.servicios}
                listaDeServiciosAMostrar={this.state.listaDeServicios}
              />
            </Col>
            <Col lg className="analisis-boxs m-3 py-3 panel-comparativo panle-comparativo-ancho-responsivo" style={{ maxWidth: "358.294px" }} >
              <div
                className="d-flex flex-column justify-content-between"
                style={{ height: "100%" }}
              >
                <div className="p-2">
                  CIUDADES
                  <Form.Select aria-label="Default select">
                    <option>Ciudades</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
                <div className="p-2 ">
                  {"DIMENSIÓN (ES)"}
                  <Form.Select aria-label="Default select">
                    <option>{"Dimensión (es)"}</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
                <div className="p-2">
                  SERVICIOS
                  <Form.Select aria-label="Default select">
                    <option>Servicios</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="fila-comparativo" >
            <Col
              lg
              className="analisis-boxs m-3 py-3 columna-comparativo"
              style={{ paddingLeft: "30px" }}
            >
              <GraficoComparativoUnServicio />
            </Col>
            <Col lg className="panle-comparativo-ancho-responsivo" style={{ maxWidth: "388.294px" }} >
              <Row>
                <Col className="analisis-boxs panel-comparativo m-3 py-3">Otros parámetros??</Col>
              </Row>
              <Row className="flex-column align-items-center">
                <Col className="p-3 botones-panel">
                  <Button className="color-primario w-100 mb-3">
                    <img src="./plusIcon.svg" alt="Plus Icon" /> Más información
                  </Button>
                  <Button className="color-secundario w-100">
                    <img src="./plusIcon.svg" alt="Plus Icon" /> Obtener datos
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
