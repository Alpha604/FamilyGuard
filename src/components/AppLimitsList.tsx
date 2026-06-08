import { AppUsage } from "../types";
import { Lock, LockOpen, Smartphone, Youtube, Camera, Gamepad2, Globe, MoreHorizontal, Book, Calculator, Plus } from "lucide-react";
import { cn } from "../lib/utils";

interface AppLimitsListProps {
  apps: AppUsage[];
  onToggleBlock: (id: string) => void;
  onAddBonusTime: (id: string, mins: number) => void;
}

export function AppLimitsList({ apps, onToggleBlock, onAddBonusTime }: AppLimitsListProps) {
  const getIcon = (iconName: string) => {
    const props = { className: "w-5 h-5" };
    switch (iconName.toLowerCase()) {
      case "smartphone": return <Smartphone {...props} />;
      case "youtube": return <Youtube {...props} />;
      case "camera": return <Camera {...props} />;
      case "gamepad-2": return <Gamepad2 {...props} />;
      case "globe": return <Globe {...props} />;
      case "book": return <Book {...props} />;
      case "calculator": return <Calculator {...props} />;
      default: return <MoreHorizontal {...props} />;
    }
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (hours > 0 && m > 0) return `${hours}h ${m}m`;
    if (hours > 0) return `${hours}h`;
    return `${m}m`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden h-full">
      <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
         <h2 className="text-sm font-bold text-slate-900">App Limits & Blocks</h2>
         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{apps.length} APPS</span>
      </div>
      <div className="divide-y divide-slate-100">
        {apps.map((app) => {
          const isOverLimit = app.limit !== null && app.timeSpent >= app.limit;
          const percentage = app.limit ? Math.min(100, (app.timeSpent / app.limit) * 100) : 0;
          
          return (
            <div key={app.id} className={cn(
                "p-4 sm:p-5 flex items-center justify-between transition-colors",
                app.isBlocked ? "bg-slate-50/50 opacity-70" : "hover:bg-slate-50/30"
              )}>
              
              <div className="flex items-center gap-4 flex-1">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  app.isBlocked ? "bg-slate-200 text-slate-400" : "bg-slate-50 text-slate-400"
                )}>
                  {getIcon(app.icon)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={cn("text-sm font-bold", app.isBlocked ? "text-slate-500 line-through" : "text-slate-900")}>
                      {app.name}
                    </h3>
                    {isOverLimit && !app.isBlocked && (
                      <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-bold uppercase whitespace-nowrap">
                        Limit Reached
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between gap-4">
                     <p className="text-xs font-semibold text-slate-500">
                        {formatTime(app.timeSpent)} 
                        {app.limit && <span className="text-slate-400"> / {formatTime(app.limit)}</span>}
                     </p>
                  </div>
                  
                  {app.limit && (
                    <div className="w-full sm:w-48 h-1.5 bg-slate-100 rounded-full mt-2 overflow-hidden">
                      <div 
                        className={cn("h-full rounded-full transition-all duration-500", 
                          app.isBlocked ? "bg-slate-300" :
                          isOverLimit ? "bg-rose-500" : 
                          percentage > 80 ? "bg-amber-400" : "bg-indigo-500"
                        )} 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="pl-4 flex items-center gap-2">
                {app.limit && (
                   <button
                     onClick={() => onAddBonusTime(app.id, 15)}
                     className="p-2.5 rounded-lg flex items-center justify-center transition-all bg-indigo-50 text-indigo-600 hover:bg-indigo-100 font-bold text-xs gap-1"
                     title="Ajouter 15 minutes"
                   >
                     <Plus className="w-3.5 h-3.5" /> <span className="hidden sm:inline">15m</span>
                   </button>
                )}
                <button
                  onClick={() => onToggleBlock(app.id)}
                  className={cn(
                    "p-2.5 rounded-lg flex items-center justify-center transition-all",
                    app.isBlocked 
                      ? "bg-slate-800 text-white hover:bg-slate-900" 
                      : "bg-white text-slate-400 border border-slate-200 hover:border-slate-300 hover:text-slate-600 shadow-sm"
                  )}
                  title={app.isBlocked ? "Unblock app" : "Block app"}
                >
                  {app.isBlocked ? <Lock className="w-4 h-4" /> : <LockOpen className="w-4 h-4" />}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
