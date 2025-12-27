import { Activity, Server, Cpu, HardDrive } from "lucide-react";

interface MetricProps {
  label: string;
  value: number;
  icon: React.ReactNode;
}

function HealthMetric({ label, value, icon }: MetricProps) {
  const getColor = (val: number) => {
    if (val >= 80) return "text-destructive";
    if (val >= 60) return "text-amber-400";
    return "text-emerald-400";
  };

  const getBgColor = (val: number) => {
    if (val >= 80) return "from-destructive/20 to-transparent";
    if (val >= 60) return "from-amber-400/20 to-transparent";
    return "from-emerald-400/20 to-transparent";
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors duration-200">
      <div className={`p-2 rounded-lg bg-gradient-to-br ${getBgColor(value)}`}>
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className={`text-lg font-bold ${getColor(value)}`}>{value}%</p>
      </div>
      <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            value >= 80 ? "bg-destructive" : value >= 60 ? "bg-amber-400" : "bg-emerald-400"
          }`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function ServerHealthGauge() {
  const overallHealth = 87;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (overallHealth / 100) * circumference;

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">Server Health</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Real-time system performance
        </p>
      </div>

      {/* Circular gauge */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="hsl(0, 0%, 18%)"
              strokeWidth="8"
            />
            <circle
              cx="64"
              cy="64"
              r="45"
              fill="none"
              stroke="hsl(0, 87%, 48%)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
              style={{
                filter: "drop-shadow(0 0 10px hsl(0, 87%, 48%, 0.5))",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{overallHealth}%</span>
            <span className="text-xs text-muted-foreground">Healthy</span>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3">
        <HealthMetric
          label="CPU Usage"
          value={42}
          icon={<Cpu className="w-4 h-4 text-emerald-400" />}
        />
        <HealthMetric
          label="Memory"
          value={68}
          icon={<Activity className="w-4 h-4 text-amber-400" />}
        />
        <HealthMetric
          label="Disk Space"
          value={23}
          icon={<HardDrive className="w-4 h-4 text-emerald-400" />}
        />
        <HealthMetric
          label="Network"
          value={15}
          icon={<Server className="w-4 h-4 text-emerald-400" />}
        />
      </div>
    </div>
  );
}
