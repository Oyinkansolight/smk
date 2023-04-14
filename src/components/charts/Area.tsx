import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  // plugins: {
  //   legend: {
  //     position: 'top' as const,
  //   },
  //   title: {
  //     display: true,
  //     text: 'Chart.js Line Chart',
  //   },
  // },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Dataset 2',
      data: labels.map(() => Math.round(Math.random() * 1000)),
      borderColor: 'rgba(255, 64, 0, 1)',
      backgroundColor: 'rgba(255, 64, 0, 0.2)',
    },
  ],
};

const AreaChart = () => {
  return <Line options={options} data={data} />;
};

export default AreaChart;
