import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
//import Grafico from "./grafico";
import dynamic from "next/dynamic";

import "./infoGraficos.css";

const Grafico = dynamic(() => import("./grafico"), { ssr: false });

export default class InfoGraficos extends React.Component {
  constructor(props) {
    super(props);
  }

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
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`chilexpress`}
                label={`Chilexpress`}
                className="mx-2"
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`indap`}
                label={`INDAP`}
                className="mx-2"
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`sag`}
                label={`SAG`}
                className="mx-2"
              />
              <Form.Check // prettier-ignore
                type={"checkbox"}
                id={`capredena`}
                label={`CAPREDENA`}
                className="mx-2"
              />
            </div>
            <Grafico
              ciudades={this.props.ciudades}
              servicios={this.props.servicios}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
