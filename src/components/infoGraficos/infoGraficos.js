import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//import Grafico from "./grafico";
import dynamic from "next/dynamic";

import "./infoGraficos.css";

const Grafico = dynamic(() => import("./grafico"), { ssr: false });

export default class InfoGraficos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listaDeServicios: ['CAMAS HOSPITALARIAS', 'CHILEXPRESS', 'INDAP', 'SAG', 'CAPREDENA'],
    };
    this.establecerListaDeServicios = this.establecerListaDeServicios.bind(this);
  };

  establecerListaDeServicios(servicio){
    this.setState({
      listaDeServicios: [...this.state.listaDeServicios, servicio]
    });
  };

  agregarServiciosAlistaDeServicios(servicio){
    this.setState({
      listaDeServicios: [...this.state.listaDeServicios, servicio]
    });
  };

  eliminarServiciosAlistaDeServicios(servicio){
    const nuevaLista = this.state.listaDeServicios.filter(
      (str) => str !== servicio
    );
    this.setState({ listaDeServicios: nuevaLista });
    //console.log(nuevaLista);
  };
  
  render() {
    return (
      <Container
        style={{
          zIndex: 2,
          maxWidth: "100%",
          paddingRight: "15px",
        }}
      >
        <Row className="info-container">
          <Col xl={{ span: 5, offset: 7 }} className="info">
            <h2 className="text-center">Visor de servicios</h2>
            <Form.Select aria-label="Default select example">
              <option>Región</option>
              <option value="1">Los Lagos</option>
              <option value="2">Los Ríos</option>
              <option value="3">Araucanía</option>
            </Form.Select>

            <div className="m-2 filtro-servicios">
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`cama-hospitalarias`}
                label={`Camas hospitalarias`}
                className="mx-2"
                defaultChecked={true}
                onChange={(e) => {
                  // e.target.checked will return true or false if checkbox is checked
                  e.target.checked ? this.agregarServiciosAlistaDeServicios("CAMAS HOSPITALARIAS") : this.eliminarServiciosAlistaDeServicios("CAMAS HOSPITALARIAS");
                }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`chilexpress`}
                label={`Chilexpress`}
                className="mx-2"
                defaultChecked={true}
                onChange={(e) => {
                  // e.target.checked will return true or false if checkbox is checked
                  e.target.checked ? this.agregarServiciosAlistaDeServicios("CHILEXPRESS") : this.eliminarServiciosAlistaDeServicios("CHILEXPRESS");
                }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`indap`}
                label={`INDAP`}
                className="mx-2"
                defaultChecked={true}
                onChange={(e) => {
                  // e.target.checked will return true or false if checkbox is checked
                  e.target.checked ? this.agregarServiciosAlistaDeServicios("INDAP") : this.eliminarServiciosAlistaDeServicios("INDAP");
                }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`sag`}
                label={`SAG`}
                className="mx-2"
                defaultChecked={true}
                onChange={(e) => {
                  // e.target.checked will return true or false if checkbox is checked
                  e.target.checked ? this.agregarServiciosAlistaDeServicios("SAG") : this.eliminarServiciosAlistaDeServicios("SAG");
                }}
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`capredena`}
                label={`CAPREDENA`}
                className="mx-2"
                defaultChecked={true}
                onChange={(e) => {
                  // e.target.checked will return true or false if checkbox is checked
                  e.target.checked ? this.agregarServiciosAlistaDeServicios("CAPREDENA") : this.eliminarServiciosAlistaDeServicios("CAPREDENA");
                }}
              />
            </div>
            <Grafico
              ciudades={this.props.ciudades}
              servicios={this.props.servicios}
              listaDeServiciosAMostrar = {this.state.listaDeServicios}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
