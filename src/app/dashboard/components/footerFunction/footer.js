import React from "react";
import { Container, Row , Col } from "react-bootstrap";
import "./footerFuction.css"


export default function FooterFunction() {
    return (
        <div className="footerFunction pb-2">
            <div className="super-footer-position pt-4">
            <Container className="my-1">
            <Row className="justify-content-between">
                <Col className="pt-4">
                <h5 className="text-center">
                Financia Agencia Nacional de Investigación y Desarrollo, ANID / Fondecyt Regular
                </h5>
                <img src="./fond.png" alt="Agencia Nacional de Investigación y Desarrollo" className="mx-auto d-block"/>
                </Col>
                <Col className="py-4 ">
                <h5 className="text-center">
                Universidad Patrocinante investigador principal
                </h5>
                <img src="./uach.png" alt="UACh" className="mx-auto my-5 d-block" style={{maxWidth : '420px'}}/>
                </Col>
            </Row>            
            <Row className="pt-5">
            <p className="text-center">Por Sebastián Andres Durán Vilches</p>
            </Row>
            </Container>
            </div>
        </div>
    );
}

