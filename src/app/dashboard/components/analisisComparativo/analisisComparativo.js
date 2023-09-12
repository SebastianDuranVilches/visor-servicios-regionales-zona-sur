import React from "react";
import "./analisisComparativo.css";
import { Container, Row, Col, Form } from "react-bootstrap";
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
              className="analisis-boxs m-3 "
              style={{ padding: "0px", minHeight: "358.294px" }}
            >
              <MapaComparativo />
            </Col>
          </Row>
          <Row>
            <Col className="analisis-boxs m-3 py-3">
              <GradicoComparativoCiudadesDimensiones
                ciudades={this.state.listaComunas}
                servicios={this.props.servicios}
                listaDeServiciosAMostrar={this.state.listaDeServicios}
              />
            </Col>
            <Col className="analisis-boxs m-3 py-3">
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
          <Row>
          <Col className="analisis-boxs m-3 py-3" style={{paddingLeft : "30px"}}>
              <GraficoComparativoUnServicio />
            </Col>
            <Col className="analisis-boxs m-3 py-3">
              {" "}
              {/* Quizas quitarlo despues */}
              otro panel o botones
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
