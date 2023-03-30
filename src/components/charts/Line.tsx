import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// const options = {
//   responsive: true,
//   maintainAspectRatio: false,
//   plugins: {
//     legend: {
//       display: false,
//     },
//   },
//   scales: {
//     x: {
//       display: true,
//     },
//     y: {
//       display: true,
//     },
//   },
// };

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const testData = {
  // labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.round(Math.random() * 1000)),
      borderColor: 'rgba(46, 230, 202, 1)',
      backgroundColor: 'rgba(46, 230, 202, 0.5)',
    },
  ],
};

interface LineGraphComponentProps {
  data?: typeof testData; //!temporarily using typeof testData and made optional
  width?: number;
  height?: number;
}

const LineGraphComponent = ({
  data = testData,
  width = 100,
  height = 50,
}: LineGraphComponentProps) => {
  return (
    // <Line options={options} data={data} />
    <Line
      data={data}
      width={width ?? 100}
      height={height ?? 50}
      options={options}
    />
  );
};

export default LineGraphComponent;
