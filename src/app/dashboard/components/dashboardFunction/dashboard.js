import React from "react";
import { Container, Row , Col } from "react-bootstrap";
import "./dashboardFunction.css"
import AnalisisTerritorio from "../analisisTerritorio/analisisTerritorio";
import AnalisisComparativo from "../analisisComparativo/analisisComparativo";
import data from "../../../datosTest.json";

export default class DashboardFunction extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          ciudades: [],
          servicios: [],
        };
      }
    
      componentDidMount() {
        for (let i = 0; i < data.length; i++) {
          this.setState((prevState) => ({
            ciudades: [...prevState.ciudades, data[i]["CIUDAD"]],
            servicios: [
              ...prevState.servicios,
              {
                CIUDAD: data[i]["CIUDAD"],
                "CAMAS HOSPITALARIAS": data[i]["CAMAS HOSPITALARIAS"],
                CHILEXPRESS: data[i]["CHILEXPRESS"],
                INDAP: data[i]["INDAP"],
                SAG: data[i]["SAG"],
                CAPREDENA: data[i]["CAPREDENA"],
              },
            ],
          }));
        }
      }

    render() {
        return(
            <div className="superPosition-dashboard">
            <main>
        <Container className="my-0 p-3 background-back-dashboard">
            <AnalisisTerritorio></AnalisisTerritorio>
            <AnalisisComparativo           ciudades={this.state.ciudades}
          servicios={this.state.servicios} ></AnalisisComparativo>
        </Container>
            </main>
            </div>
        );
    }
}
