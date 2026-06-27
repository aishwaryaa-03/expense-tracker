import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function PieChartComponent({ data }) {
  const chartData = Object.keys(data).map((key) => ({
    name: key,
    value: data[key]
  }));

  return (
    <PieChart width={300} height={300}>
      <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100}>
        {chartData.map((_, index) => (
          <Cell key={index} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default PieChartComponent;