import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

export default function LineChartComponent({ data }) {
  return (
    <LineChart width={350} height={250} data={data}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="expense" stroke="red" />
    </LineChart>
  );
}
