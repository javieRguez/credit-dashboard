import "chart.js/auto";
import { Bar, Pie } from "react-chartjs-2";
import {
  Client,
  groupedData,
  sumAvailableBalance,
  sumCurrentBalance,
} from "./dashboard.config";
import { FC } from "react";
import { Row, Col } from "reactstrap";
import { numberToPrice } from "../../helpers/currency";

interface ChartProps {
  clients: Client[];
}
const CreditCharts: FC<ChartProps> = ({ clients }) => {
  const currentBalance = sumCurrentBalance(clients);
  const availableBalance = sumAvailableBalance(clients);
  const dataPie = {
    labels: ["Saldo Actual", "Saldo Disponible"],
    datasets: [
      {
        label: "Valor",
        data: [currentBalance, availableBalance],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
      },
    ],
  };

  const dataGroupedBarChart = groupedData(clients);
  const statesBarChart = Object.keys(dataGroupedBarChart);
  const currentsBalancesBarChart = Object.values(dataGroupedBarChart);

  const dataBar = {
    labels: statesBarChart,
    datasets: [
      {
        label: "Saldo Actual",
        data: currentsBalancesBarChart,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  return (
    <Row>
      <Col md="4">
        <div style={{ width: "300px", height: "300px" }}>
          <Pie
            data={dataPie}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </Col>

      <Col md="8">
        <div style={{ width: "100%", height: "300px" }}>
          <Bar
            data={dataBar}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: function (value) {
                      return numberToPrice(value as number);
                    },
                  },
                },
              },
              plugins: {
                tooltip: {
                  callbacks: {
                    label: function (context) {
                      const value = context.raw as number;
                      return `Saldo Actual: ${numberToPrice(value)}`;
                    },
                  },
                },
              },
            }}
          />
        </div>
      </Col>
    </Row>
  );
};

export default CreditCharts;
