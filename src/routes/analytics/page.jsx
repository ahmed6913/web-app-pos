import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useTheme } from "@/hooks/use-theme";

export default function AnalyticsPage() {
  const { theme } = useTheme();
  const [overviewData, setOverviewData] = useState([]);

  useEffect(() => {
    const fetchBillingData = async () => {
      const snapshot = await getDocs(collection(db, "bills"));
      const bills = snapshot.docs.map(doc => doc.data());

      // Group by day or month for overview
      const grouped = {};

      for (let bill of bills) {
        const date = new Date(bill.date);
        const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" }); // e.g. "Jun 25"

        if (!grouped[label]) grouped[label] = 0;
        grouped[label] += bill.total;
      }

      const chartData = Object.keys(grouped).map(label => ({
        name: label,
        total: grouped[label],
      }));

      setOverviewData(chartData);
    };

    fetchBillingData();
  }, []);

  return (
    <div className="p-6 text-slate-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Analytics Overview</h1>

      <div className="card">
        <div className="card-header">
          <p className="card-title">Overview</p>
        </div>
        <div className="card-body p-0">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={overviewData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Tooltip
                cursor={false}
                formatter={(value) => `$${value}`}
              />
              <XAxis
                dataKey="name"
                strokeWidth={0}
                stroke={theme === "light" ? "#475569" : "#94a3b8"}
                tickMargin={6}
              />
              <YAxis
                strokeWidth={0}
                stroke={theme === "light" ? "#475569" : "#94a3b8"}
                tickFormatter={(value) => `$${value}`}
                tickMargin={6}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#2563eb"
                fillOpacity={1}
                fill="url(#colorTotal)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
