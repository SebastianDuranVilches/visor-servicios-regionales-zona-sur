"use client";
import React from "react";
import {Container, Col, Row } from "react-bootstrap";
import "./headFuction.css"; 

export default function HeadFuction() {
    return(
        <div className="headFuction pt-0 pb-5">
            <Container className="mb-5">
             <Row className="justify-content-center pt-1">
                <Col className="text-center" >
                <img src="./logo-proyecto.svg" alt="FONDECYT 1230159"/>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <h4 className="text-center">
                Modelación prospectiva de los servicios básicos en asentamientos humanos del Sur de Chile. Propuestas para su gestión territorial
                </h4>
                <h3 className="text-center">
                FONDECYT 1230159
                </h3>
            </Row>            
            </Container>
        </div>
    );
}