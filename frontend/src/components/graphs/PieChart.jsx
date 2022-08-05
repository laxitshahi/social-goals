/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
function PieChart({ chartData }) {
  const options = {
    legend: {
      display: false,
    },
  };
  return <Pie data={chartData} options={options} />;
}

export default PieChart;
