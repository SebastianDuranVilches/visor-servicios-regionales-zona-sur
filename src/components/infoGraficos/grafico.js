import React from "react";
import Chart from "react-apexcharts";
import ReactApexChart from 'react-apexcharts';

export default class Grafico extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          heatmap: {
            enableShades: false,
            colorScale: {
              ranges: [
                {
                  from: 0,
                  to: 19,
                  color: '#D953FF',
                  name: 'Low',
                },
                {
                  from: 20,
                  to: 39,
                  color: '#D9534F',
                  name: 'Low Medium',
                },
                {
                  from: 40,
                  to: 59,
                  color: '#F9C8F1',
                  name: 'Medium',
                },
                {
                  from: 60,
                  to: 79,
                  color: '#F9C851',
                  name: 'High Medium',
                },
                {
                  from: 80,
                  to: 100,
                  color: '#5CB85C',
                  name: 'High',
                },
              ],
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Heatmap Data for Chilean Cities',
        },
        xaxis: {
          type: 'category',
          categories: ['CAMAS HOSPITALARIAS', 'CHILEXPRESS', 'INDAP', 'SAG', 'CAPREDENA'],
        },
      },
      series: this.generateRandomData(props),
    };
  }

  generateRandomData = (props) => {
    //const cities = ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta', 'La Serena'];
    //const features = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'];
    const data = [];
    const cities = [];

    for (let i = 0; i < 5; i++) {
      cities.push(props.ciudades[i])
    };

    for (let i = 0; i < cities.length; i++) {
      const cityData = [];
      cityData.push(props.servicios[i]["CAMAS HOSPITALARIAS"]);
      cityData.push(props.servicios[i]["CHILEXPRESS"]);
      cityData.push(this.props.servicios[i]["INDAP"]);
      cityData.push(this.props.servicios[i]["SAG"]);
      cityData.push(this.props.servicios[i]["CAPREDENA"]);
      data.push({ name: cities[i], data: cityData });
    }

    console.log(data);
    return data;
  };
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
