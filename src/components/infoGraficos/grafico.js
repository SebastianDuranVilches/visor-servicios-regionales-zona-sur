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
                  to: 50,
                  color: '#D9534F',
                  name: 'Low',
                },
                {
                  from: 51,
                  to: 100,
                  color: '#F9C851',
                  name: 'Medium',
                },
                {
                  from: 101,
                  to: 150,
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
          categories: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'],
        },
      },
      series: this.generateRandomData(),
    };
  }

  generateRandomData = () => {
    const cities = ['Santiago', 'Valparaíso', 'Concepción', 'Antofagasta', 'La Serena'];
    const features = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10'];
    const data = [];

    for (let i = 0; i < cities.length; i++) {
      const cityData = [];
      for (let j = 0; j < features.length; j++) {
        cityData.push(Math.floor(Math.random() * 150)); // Generate a random value between 0 and 150
      }
      data.push({ name: cities[i], data: cityData });
    }

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
