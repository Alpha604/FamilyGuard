import { Activity, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { cn } from "../lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: "clock" | "activity" | "alert" | "check";
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
}

export function StatCard({ title, value, subtitle, icon, trend, trendValue, className }: StatCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "clock": return <Clock className="w-5 h-5 text-indigo-500" />;
      case "activity": return <Activity className="w-5 h-5 text-emerald-500" />;
      case "alert": return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case "check": return <CheckCircle className="w-5 h-5 text-blue-500" />;
    }
  };

  const getIconBackground = () => {
    switch (icon) {
      case "clock": return "bg-indigo-50";
      case "activity": return "bg-emerald-50";
      case "alert": return "bg-amber-50";
      case "check": return "bg-blue-50";
    }
  };

  return (
    <div className={cn("bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col h-full", className)}>
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-2 rounded-lg", getIconBackground())}>
          {getIcon()}
        </div>
        {trend && trendValue && (
          <span className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded uppercase whitespace-nowrap",
            trend === "up" ? "bg-rose-100 text-rose-700" : trend === "down" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"
          )}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "-" } {trendValue}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-black text-slate-900">{value}</span>
          {subtitle && <span className="text-sm font-semibold text-slate-400">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
}
