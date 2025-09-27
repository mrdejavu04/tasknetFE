import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

export default function Stats({ items }) {
  const doneCount = items.filter((t) => t.status === "done").length;
  const openCount = items.filter((t) => t.status === "open").length;

  const barData = [{ name: "Nhiệm vụ", done: doneCount, open: openCount }];
  const pieData = [
    { name: "Đã xong", value: doneCount },
    { name: "Chưa xong", value: openCount },
  ];
  const COLORS = ["#10b981", "#f59e0b"];

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">
        Thống kê nhiệm vụ
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Biểu đồ cột */}
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="done" fill="#10b981" name="Đã xong" />
            <Bar dataKey="open" fill="#f59e0b" name="Chưa xong" />
          </BarChart>
        </ResponsiveContainer>

        {/* Biểu đồ tròn */}
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
