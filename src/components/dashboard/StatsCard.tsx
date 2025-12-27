import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  icon: ReactNode;
  sparklineData?: number[];
}

export function StatsCard({ title, value, change, icon, sparklineData = [] }: StatsCardProps) {
  const isPositive = change >= 0;

  // Simple sparkline SVG
  const renderSparkline = () => {
    if (sparklineData.length === 0) return null;
    
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    
    const width = 80;
    const height = 30;
    
    const points = sparklineData
      .map((value, index) => {
        const x = (index / (sparklineData.length - 1)) * width;
        const y = height - ((value - min) / range) * height;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <svg width={width} height={height} className="opacity-60">
        <defs>
          <linearGradient id="sparklineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        <polygon
          fill="url(#sparklineGradient)"
          points={`0,${height} ${points} ${width},${height}`}
        />
      </svg>
    );
  };

  return (
    <div className="relative group bg-card rounded-xl p-6 border border-border hover-scale hover-glow overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -top-1/2 -right-1/2 w-full h-full gradient-radial-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-destructive" />
            )}
            <span
              className={cn(
                "text-sm font-medium",
                isPositive ? "text-emerald-500" : "text-destructive"
              )}
            >
              {isPositive ? "+" : ""}{change}%
            </span>
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        </div>

        <div className="mt-4">
          {renderSparkline()}
        </div>
      </div>
    </div>
  );
}
