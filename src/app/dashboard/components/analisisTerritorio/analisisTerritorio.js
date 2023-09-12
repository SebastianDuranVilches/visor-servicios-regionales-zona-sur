import React from "react";
import "./analisisTerritorio.css";
import { Row, Col, Container, Form } from "react-bootstrap";
import RadarChartAnalisis from "./radarChart";
import dynamic from "next/dynamic";

const MapaAnalisis = dynamic(
    () => import("./mapaAnalisis"),
    { ssr: false }
  );

export default class AnalisisTerritorio extends React.Component {
  render() {
    return (
      <div className="analisisTerritorio p-1">
        <Row className="text-center">
          <h3 className="titulos-dashboard">ANÁLISIS POR TERRITORIO</h3>
          <h3 className="titulos-dashboard">TERRITORIO: REGIÓN/CIUDAD</h3>
        </Row>
        <Container>
          <Row className="p-1">
            <Col className="analisis-boxs m-3 py-3">
              <div
                className="d-flex flex-column justify-content-between"
                style={{ height: "100%" }}
              >
                <div className="p-2">
                  REGIÓN
                  <Form.Select aria-label="Default select">
                    <option>Región</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
                <div className="p-2 ">
                  CIUDAD
                  <Form.Select aria-label="Default select">
                    <option>Ciudad</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
                <div className="p-2">
                  {"DIMENSIÓN (ES)"}
                  <Form.Select aria-label="Default select">
                    <option>{"Dimensión (es)"}</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </Form.Select>
                </div>
              </div>
            </Col>
            <Col className="analisis-boxs m-3">
              <div>
                <RadarChartAnalisis></RadarChartAnalisis>
              </div>
            </Col>
            <Col className="analisis-boxs m-3" style={{padding : "0px"}}>
            <MapaAnalisis/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
