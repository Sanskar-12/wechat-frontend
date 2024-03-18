/* eslint-disable react/prop-types */
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { getLast7Days } from "../lib/features";

ChartJS.register(
  Tooltip,
  Filler,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue 2",
        fill: true,
        backgroundColor: "rgba(75,12,192,0.2)",
        borderColor: "rgba(75,12,192,0.9)",
      },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  cutout: 100,
};

const DoughnutChart = ({ value = [], labels = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue 2",
        fill: true,
        backgroundColor: ["rgba(75,12,192,0.2)", "rgba(72, 202, 228, 0.2)"],
        borderColor: ["rgba(75,12,192,1)", "rgba(0, 180, 216, 1)"],
        hoverBackgroundColor: ["rgba(75,12,192,1)", "rgba(0, 180, 216, 1)"],
        offset: 40,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      options={doughnutChartOptions}
      style={{
        zIndex: 10,
      }}
    />
  );
};

export { LineChart, DoughnutChart };
