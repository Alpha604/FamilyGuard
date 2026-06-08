import { ActivityLog } from "../types";
import { AlertTriangle, Info, ShieldAlert, CheckCircle } from "lucide-react";
import { cn } from "../lib/utils";

interface ActivityFeedProps {
  logs: ActivityLog[];
}

export function ActivityFeed({ logs }: ActivityFeedProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'block': return <ShieldAlert className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'success': return <CheckCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getStyles = (type: string) => {
    switch (type) {
      case 'block': return {
        bg: 'bg-rose-50', border: 'border-rose-100',
        iconBg: 'bg-rose-500', text: 'text-rose-900',
        subText: 'text-rose-700', time: 'text-rose-400'
      };
      case 'alert': return {
        bg: 'bg-amber-50', border: 'border-amber-100',
        iconBg: 'bg-amber-500', text: 'text-amber-900',
        subText: 'text-amber-700', time: 'text-amber-500'
      };
      case 'success': return {
        bg: 'bg-emerald-50', border: 'border-emerald-100',
        iconBg: 'bg-emerald-500', text: 'text-emerald-900',
        subText: 'text-emerald-700', time: 'text-emerald-500'
      };
      default: return {
        bg: 'bg-slate-50', border: 'border-slate-100',
        iconBg: 'bg-slate-400', text: 'text-slate-900',
        subText: 'text-slate-600', time: 'text-slate-400'
      };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col shadow-sm h-full">
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="text-sm font-bold text-slate-900">Activité Récente</h2>
        <button className="text-xs text-indigo-600 font-bold hover:underline">Voir tout</button>
      </div>
      <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {logs.slice(0, 4).map((log) => {
          const styles = getStyles(log.type);
          return (
            <div key={log.id} className={cn("flex items-start gap-4 p-3 rounded-xl border", styles.bg, styles.border)}>
              <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 shadow-sm", styles.iconBg)}>
                {getIcon(log.type)}
              </div>
              <div>
                <p className={cn("text-xs font-bold", styles.text)}>{log.title}</p>
                <p className={cn("text-[11px] mt-0.5", styles.subText)}>{log.message}</p>
                <p className={cn("text-[10px] mt-1 uppercase font-bold", styles.time)}>{log.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
