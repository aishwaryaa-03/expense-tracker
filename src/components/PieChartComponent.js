import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#4caf50", "#ff9800", "#2196f3", "#f44336", "#9c27b0"];

export default function PieChartComponent({ data }) {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          fill="#8884d8"
          label
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}