import React from "react";
import { Container, Row , Col } from "react-bootstrap";
import "./dashboardFunction.css"
import AnalisisTerritorio from "../analisisTerritorio/analisisTerritorio";

export default class DashboardFunction extends React.Component {
    render() {
        return(
            <div className="superPosition-dashboard">
            <main>
        <Container className="my-0 p-3 background-back-dashboard">
            <AnalisisTerritorio ></AnalisisTerritorio>
        </Container>
            </main>
            </div>
        );
    }
}
