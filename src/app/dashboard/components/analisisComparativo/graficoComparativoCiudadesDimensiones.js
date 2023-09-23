import React from "react";
import ReactApexChart from "react-apexcharts";

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

export default class GradicoComparativoCiudadesDimensiones extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          heatmap: {
            distributed: true,
            enableShades: false,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 19,
                  color: "#5A1A16",
                  name: "Low",
                },
                {
                  from: 20,
                  to: 39,
                  color: "#4B3134",
                  name: "Low Medium",
                },
                {
                  from: 40,
                  to: 59,
                  color: "#2E3135",
                  name: "Medium",
                },
                {
                  from: 60,
                  to: 90,
                  color: "#64464A",
                  name: "High Medium",
                },
                {
                  from: 91,
                  to: 10000,
                  color: "#66AEAE",
                  name: "High",
                },
              ],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        /*title: {
          text: 'Ciudades,
          show: false
        },*/
        xaxis: {
          type: "category",
          categories: props.listaDeServiciosAMostrar.map(
            (servicios) => servicios["Indicador o variable"]
          ),
        },
      },
      series: this.generateData(props),
    };
  }

  generateData = (props) => {
    const data = [];
    const cities = [];

    for (let i = 0; i < props.ciudades.length; i++) {
      cities.push(props.ciudades[i]);
    }

    for (let i = 0; i < cities.length; i++) {
      const cityData = [];
      for (let j = 0; j < props.listaDeServiciosAMostrar.length; j++) {
        let ciudadEncontrada = props.servicios.find((ciudad) =>
          quitarTildes(ciudad["Entidad urbana"].toUpperCase()).includes(
            quitarTildes(cities[i].urbano.toUpperCase())
          )
        );

        if (!ciudadEncontrada) {
          console.log("anterior");
          ciudadEncontrada = props.servicios.find((ciudad) =>
          quitarTildes(ciudad["Entidad urbana"].toUpperCase()).includes(
            quitarTildes(cities[i].nombreComuna.toUpperCase())
          )
        );
        }

        if (!ciudadEncontrada) {
          console.log("anterior");
          ciudadEncontrada = props.servicios.find((ciudad) =>
          quitarTildes(cities[i].urbano.toUpperCase()).includes(
            quitarTildes(ciudad["Entidad urbana"].toUpperCase())
          )
        );
        }


        cityData.push(
          ciudadEncontrada[props.listaDeServiciosAMostrar[j]["Codificación"]]
        );
      }
      data.push({ name: cities[i].urbano, data: cityData });
    }
    return data;
  };

  establecerNuevoGrafico() {
    this.setState((prevState) => ({
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: this.props.listaDeServiciosAMostrar.map(
            (servicios) => servicios["Indicador o variable"]
          ),
        },
      },
    }));
    this.setState((prevState) => ({
      series: this.generateData(this.props),
    }));
  }

  establecerCiudades() {
    this.setState((prevState) => ({
      series: this.generateData(this.props),
    }));
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.listaDeServiciosAMostrar !== prevProps.listaDeServiciosAMostrar
    ) {
      this.establecerNuevoGrafico();
    }
    if (this.props.ciudades !== prevProps.ciudades) {
      this.establecerCiudades();
    }
  }

  render() {
    return (
      <div style={{ padding: "10px" }}>
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="heatmap"
          height={350}
        />
      </div>
    );
  }
}
