import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", users: 4000, revenue: 2400 },
  { month: "Feb", users: 4800, revenue: 2800 },
  { month: "Mar", users: 5200, revenue: 3200 },
  { month: "Apr", users: 6100, revenue: 3800 },
  { month: "May", users: 7500, revenue: 4500 },
  { month: "Jun", users: 8200, revenue: 5100 },
  { month: "Jul", users: 9100, revenue: 5800 },
  { month: "Aug", users: 10500, revenue: 6400 },
  { month: "Sep", users: 11200, revenue: 7100 },
  { month: "Oct", users: 12800, revenue: 8200 },
  { month: "Nov", users: 14100, revenue: 9100 },
  { month: "Dec", users: 15800, revenue: 10200 },
];

export function UserGrowthChart() {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">User Growth</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Monthly active users over the past year
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 87%, 48%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(0, 87%, 48%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(142, 76%, 36%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(0, 0%, 20%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="month" 
              stroke="hsl(0, 0%, 70%)"
              tickLine={false}
              axisLine={false}
              dy={10}
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(0, 0%, 70%)"
              tickLine={false}
              axisLine={false}
              dx={-10}
              fontSize={12}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 10%)",
                border: "1px solid hsl(0, 0%, 20%)",
                borderRadius: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}
              labelStyle={{ color: "hsl(0, 0%, 100%)" }}
              itemStyle={{ color: "hsl(0, 0%, 70%)" }}
            />
            <Area
              type="monotone"
              dataKey="users"
              stroke="hsl(0, 87%, 48%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorUsers)"
              name="Users"
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(142, 76%, 36%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              name="Revenue ($)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
