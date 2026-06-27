import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

function LineChartComponent({ expenses }) {
  const daily = expenses.reduce((acc, item) => {
    const date = item.date;
    acc[date] = (acc[date] || 0) + Number(item.amount);
    return acc;
  }, {});

  const data = Object.keys(daily).map((date) => ({
    date,
    amount: daily[date]
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#4caf50" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default LineChartComponent;