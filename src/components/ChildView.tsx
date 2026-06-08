import { AppUsage } from "../types";
import { Lock, Smartphone, Youtube, Camera, Gamepad2, Globe, ArrowLeft, MoreHorizontal, AlertTriangle, Book, Calculator } from "lucide-react";
import { cn } from "../lib/utils";

interface ChildViewProps {
  apps: AppUsage[];
  deviceLocked: boolean;
  internetPaused: boolean;
  activeAppId: string | null;
  onOpenApp: (id: string) => void;
  onCloseApp: () => void;
}

export function ChildView({ apps, deviceLocked, internetPaused, activeAppId, onOpenApp, onCloseApp }: ChildViewProps) {
  const getIcon = (iconName: string) => {
    const props = { className: "w-8 h-8 text-white" };
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

  const getLargeIcon = (iconName: string) => {
    const props = { className: "w-16 h-16 text-white" };
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
    const s = seconds % 60;
    if (hours > 0) return `${hours}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  };

  if (deviceLocked) {
    return (
      <div className="h-full w-full bg-slate-900 border-4 border-slate-950 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-xl"></div>
        <Lock className="w-20 h-20 text-rose-500 mb-6 drop-shadow-lg" />
        <h2 className="text-3xl font-black mb-3">Appareil Verrouillé</h2>
        <p className="text-slate-400 font-medium">Vos parents ont verrouillé votre iPad. Il est temps de faire une pause !</p>
      </div>
    );
  }

  const activeApp = activeAppId ? apps.find(a => a.id === activeAppId) : null;

  if (activeApp) {
    const isOverLimit = activeApp.limit !== null && activeApp.timeSpent >= activeApp.limit;
    const isInternetBlockedForApp = internetPaused && (activeApp.category === 'Internet' || activeApp.category === 'Réseaux Sociaux' || activeApp.category === 'Divertissement');

    if (isOverLimit || activeApp.isBlocked || isInternetBlockedForApp) {
      return (
        <div className="h-full w-full bg-slate-900 border-4 border-slate-950 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-xl"></div>
          {activeApp.isBlocked ? (
             <Lock className="w-20 h-20 text-rose-500 mb-6 drop-shadow-lg" />
          ) : isOverLimit ? (
             <AlertTriangle className="w-20 h-20 text-amber-500 mb-6 drop-shadow-lg" />
          ) : (
             <Globe className="w-20 h-20 text-slate-500 mb-6 drop-shadow-lg" />
          )}
          <h2 className="text-3xl font-black mb-3">{activeApp.name} Inaccessible</h2>
          <p className="text-slate-400 font-medium mb-8">
            {activeApp.isBlocked ? "Cette application a été bloquée." :
             isOverLimit ? "Vous avez atteint votre limite de temps pour aujourd'hui." :
             "Pas de connexion internet disponible."}
          </p>
          <button onClick={onCloseApp} className="px-8 py-3.5 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:bg-slate-100 transition-colors">
            Retour à l'accueil
          </button>
        </div>
      );
    }

    return (
      <div className="h-full w-full bg-slate-50 border-4 border-slate-950 rounded-[3rem] shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-950 rounded-b-xl z-20"></div>
        <button onClick={onCloseApp} className="absolute top-10 left-6 p-3 bg-white rounded-full shadow border border-slate-200 text-slate-900 hover:bg-slate-50 z-10 transition-transform active:scale-95">
          <ArrowLeft className="w-6 h-6" />
        </button>
        
        <div className="w-40 h-40 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-[2.5rem] mb-8 shadow-2xl shadow-indigo-500/30 flex items-center justify-center relative">
           <div className="absolute inset-0 bg-indigo-400 rounded-[2.5rem] animate-ping opacity-20"></div>
           {getLargeIcon(activeApp.icon)}
        </div>
        
        <h2 className="text-4xl font-black text-slate-900 mb-3">{activeApp.name}</h2>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
          <span className="text-slate-500 font-semibold w-20 text-right">Temps:</span>
          <span className="font-bold text-indigo-600 text-xl font-mono">{formatTime(activeApp.timeSpent)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-gradient-to-br from-indigo-950 to-slate-900 border-4 border-slate-950 rounded-[3rem] shadow-2xl relative overflow-hidden">
      {/* Notch */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-950 rounded-full z-20"></div>
      
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-indigo-500/20 to-transparent pointer-events-none"></div>

      <div className="p-8 pt-24 h-full overflow-y-auto">
        <div className="grid grid-cols-4 sm:grid-cols-4 gap-x-4 gap-y-8">
          {apps.map(app => {
            const isOverLimit = app.limit !== null && app.timeSpent >= app.limit;
            const isInternetBlockedForApp = internetPaused && (app.category === 'Internet' || app.category === 'Réseaux Sociaux' || app.category === 'Divertissement');
            const disabled = app.isBlocked || isOverLimit || isInternetBlockedForApp;

            return (
              <button 
                key={app.id} 
                onClick={() => onOpenApp(app.id)} 
                className={cn(
                  "flex flex-col items-center cursor-pointer transition-all active:scale-95 group", 
                  disabled && "opacity-60"
                )}
              >
                 <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-500/10 backdrop-blur-md rounded-[1.5rem] shadow-lg flex items-center justify-center mb-3 border border-white/10 group-hover:bg-indigo-500/20 transition-colors relative overflow-hidden">
                    {getIcon(app.icon)}
                    {disabled && (
                      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center">
                        <Lock className="w-6 h-6 text-white drop-shadow-md" />
                      </div>
                    )}
                 </div>
                 <span className="text-[11px] font-bold text-white/90 truncate w-full text-center drop-shadow-md tracking-wide">
                   {app.name}
                 </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Dock Area */}
      <div className="absolute bottom-6 left-6 right-6 h-24 bg-white/10 backdrop-blur-xl border border-white/10 rounded-[2rem] flex items-center justify-around px-2 shadow-2xl">
         {/* Fake dock items */}
         <div className="w-14 h-14 bg-indigo-400 rounded-2xl opacity-60"></div>
         <div className="w-14 h-14 bg-emerald-400 rounded-2xl opacity-60"></div>
         <div className="w-14 h-14 bg-rose-400 rounded-2xl opacity-60"></div>
         <div className="w-14 h-14 bg-amber-400 rounded-2xl opacity-60"></div>
      </div>
    </div>
  )
}
