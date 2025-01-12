"use client";

import { DoughnutChartProps } from "@/types";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ account }: DoughnutChartProps) => {
  const data = {
    datasets: [
      {
        label: account.accountType,
        data: [account.balance, -account.balance / 5],
        backgroundColor: ["#0747b6", "#f1f1f1"],
      },
    ],
    labels: ["Current Balance", "Total Balance"],
  };

  return (
    <Doughnut
      data={data}
      options={{
        cutout: "80%",
        plugins: {
          legend: {
            display: false,
          },
        },
      }}
    />
  );
};

export default DoughnutChart;
