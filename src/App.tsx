/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { initialAppUsage, weeklyScreenTime, initialActivityLogs } from './data';
import { StatCard } from './components/StatCard';
import { ScreenTimeChart } from './components/ScreenTimeChart';
import { AppLimitsList } from './components/AppLimitsList';
import { ChildView } from './components/ChildView';
import { ActivityFeed } from './components/ActivityFeed';
import { ContentFilter } from './components/ContentFilter';
import { Shield, Power, WifiOff, MapPin, Bell, User, Smartphone, X } from 'lucide-react';
import { cn } from './lib/utils';
import { motion } from 'motion/react';

export default function App() {
  const [apps, setApps] = useState(initialAppUsage);
  const [internetPaused, setInternetPaused] = useState(false);
  const [deviceLocked, setDeviceLocked] = useState(false);
  const [activeAppId, setActiveAppId] = useState<string | null>(null);
  const [showSimulator, setShowSimulator] = useState(false);

  // Simulation Timer
  useEffect(() => {
    if (!activeAppId || deviceLocked) return;

    const timer = setInterval(() => {
      setApps(prev => prev.map(app => {
         if (app.id === activeAppId) {
            if (app.isBlocked) return app;
            const isInternetBlocked = internetPaused && (app.category === 'Internet' || app.category === 'Réseaux Sociaux' || app.category === 'Divertissement');
            if (isInternetBlocked) return app;
            if (app.limit !== null && app.timeSpent >= app.limit) return app;
            return { ...app, timeSpent: app.timeSpent + 1 };
         }
         return app;
      }));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [activeAppId, deviceLocked, internetPaused]);

  const toggleBlockApp = (id: string) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, isBlocked: !app.isBlocked } : app
    ));
  };

  const addBonusTime = (id: string, mins: number) => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, limit: app.limit ? app.limit + (mins * 60) : null } : app
    ));
  };

  const totalTimeTodaySeconds = apps.reduce((acc, app) => acc + app.timeSpent, 0);
  const hours = Math.floor(totalTimeTodaySeconds / 3600);
  const minutes = Math.floor((totalTimeTodaySeconds % 3600) / 60);

  const getStatusColor = () => {
    if (deviceLocked) return "bg-rose-500";
    if (internetPaused) return "bg-amber-500";
    return "bg-green-500";
  };

  const getStatusText = () => {
    if (deviceLocked) return "Appareil Verrouillé";
    if (internetPaused) return "Internet Suspendu";
    return "Appareil Actif";
  };

  return (
    <div className="flex h-screen overflow-hidden w-full bg-slate-50 font-sans text-slate-800 relative">
      
      {/* Main Content Area */}
      <div className={cn("flex-1 flex flex-col min-w-0 transition-opacity", showSimulator && "opacity-0 lg:opacity-100 pointer-events-none lg:pointer-events-auto")}>
        {/* Top Navigation Bar */}
        <nav className="flex items-center justify-between px-4 sm:px-8 py-4 bg-white border-b border-slate-200 shrink-0 shadow-sm z-10 w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-md">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 shrink-0">
              FamilyGuard <span className="font-normal text-slate-400 text-sm ml-1 hidden sm:inline-block">Dashboard</span>
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <button 
              onClick={() => setShowSimulator(true)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 font-bold rounded-lg whitespace-nowrap border border-indigo-100"
            >
              <Smartphone className="w-4 h-4" />
              Simulateur
            </button>
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap">
              <span className="w-2 h-2 bg-green-500 rounded-full shrink-0"></span> Tous les appareils protégés
            </div>
            <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors relative hidden sm:block">
               <span className="w-2 h-2 bg-rose-500 rounded-full absolute top-1.5 right-1.5 border-2 border-white"></span>
               <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block whitespace-nowrap">
                <p className="text-sm font-semibold leading-none">Sarah Miller</p>
                <p className="text-xs text-slate-500 mt-1">Administrateur</p>
              </div>
              <div className="w-10 h-10 bg-slate-200 rounded-full border border-slate-300 flex items-center justify-center overflow-hidden shrink-0">
                 <User className="w-5 h-5 text-slate-400" />
              </div>
            </div>
          </div>
        </nav>

        {/* Dashboard Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 relative">
        <div className="max-w-6xl mx-auto space-y-6">
          
          {/* Profile Header Row */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white rounded-2xl p-6 border border-slate-200 shadow-sm gap-6"
          >
            <div className="flex items-center gap-4 sm:gap-8 w-full md:w-auto">
              <div className="flex items-center gap-4 md:border-r border-slate-100 pr-4 sm:pr-8">
                <div className="relative">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                    <span className="text-xl font-bold">L</span>
                  </div>
                  <div className={cn("absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white", getStatusColor())} />
                </div>
                <div>
                  <p className="font-bold text-slate-900 flex flex-wrap items-center gap-2">iPad de Léo 
                    <span className={cn("text-[10px] px-2 py-0.5 rounded font-bold uppercase", 
                      deviceLocked ? "bg-rose-100 text-rose-700" :
                      internetPaused ? "bg-amber-100 text-amber-700" :
                      "bg-green-100 text-green-700"
                    )}>{getStatusText()}</span>
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">Âge 9 • 2 Appareils</p>
                </div>
              </div>
            </div>

            <div className="flex w-full md:w-auto gap-3">
               <button 
                  onClick={() => setInternetPaused(!internetPaused)}
                  className={cn(
                    "flex-1 justify-center md:flex-none flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all",
                    internetPaused 
                      ? "bg-amber-500 text-white hover:bg-amber-400 shadow-sm shadow-amber-200" 
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                  )}
               >
                  <WifiOff className="w-4 h-4" />
                  {internetPaused ? "Reprendre" : "Couper Internet"}
               </button>
               <button 
                  onClick={() => setDeviceLocked(!deviceLocked)}
                  className={cn(
                    "flex-1 justify-center md:flex-none flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all shadow-sm",
                    deviceLocked 
                      ? "bg-slate-800 text-white hover:bg-slate-700" 
                      : "bg-rose-500 text-white hover:bg-rose-400 shadow-rose-200"
                  )}
               >
                  <Power className="w-4 h-4" />
                  {deviceLocked ? "Déverrouiller" : "Verrouiller Appareil"}
               </button>
            </div>
          </motion.div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="h-full">
               <StatCard 
                 title="Temps d'écran aujourd'hui"
                 value={`${hours}h`}
                 subtitle={`${minutes}m`}
                 icon="clock"
                 trend="up"
                 trendValue="12% vs Hier"
               />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="h-full">
               <StatCard 
                 title="Applications Ouvertes"
                 value={apps.filter(a => a.timeSpent > 0).length.toString()}
                 icon="activity"
               />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="h-full">
               <StatCard 
                 title="Alertes Sécurité"
                 value="1"
                 subtitle="Reçue"
                 icon="alert"
                 trend="neutral"
                 trendValue="Site bloqué"
               />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="h-full">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
                      <MapPin className="w-5 h-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs text-slate-500 uppercase tracking-wide font-bold mb-1">Localisation En Direct</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-slate-900 truncate">École Primaire</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Mise à jour : 10m</p>
                  </div>
               </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
            
            {/* Main Content Area (Chart + Feed) */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }} 
                 animate={{ opacity: 1, scale: 1 }} 
                 transition={{ delay: 0.3 }}
                 className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200"
              >
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                   <div>
                     <h2 className="text-lg font-bold text-slate-900 mb-1">Résumé de la semaine</h2>
                     <p className="text-sm font-semibold text-slate-500">Moyenne de 3h 15m par jour</p>
                   </div>
                   <div className="flex gap-2">
                    <span className="px-3 py-1 bg-slate-100 rounded-md text-xs font-semibold text-slate-900">Cette Semaine</span>
                    <span className="px-3 py-1 text-slate-400 text-xs font-semibold">Semaine Dernière</span>
                  </div>
                 </div>
                 <ScreenTimeChart data={weeklyScreenTime} />
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, y: 20 }} 
                 animate={{ opacity: 1, y: 0 }} 
                 transition={{ delay: 0.4 }}
                 className="flex-1 min-h-[300px]"
              >
                 <ActivityFeed logs={initialActivityLogs} />
              </motion.div>
            </div>

            {/* Right Sidebar (App Limits List) */}
            <div className="lg:col-span-1 border-t lg:border-t-0 border-slate-100 pt-6 lg:pt-0 flex flex-col gap-6">
               <motion.div 
                 initial={{ opacity: 0, x: 20 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 transition={{ delay: 0.4 }}
               >
                  <AppLimitsList apps={apps} onToggleBlock={toggleBlockApp} onAddBonusTime={addBonusTime} />
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, x: 20 }} 
                 animate={{ opacity: 1, x: 0 }} 
                 transition={{ delay: 0.5 }}
               >
                  <ContentFilter />
               </motion.div>
            </div>

          </div>
        </div>
        </main>
      </div>

      {/* Child Device Simulator Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] lg:w-[460px] lg:relative bg-slate-100 border-l border-slate-200 shadow-2xl lg:shadow-none flex flex-col items-center pt-8 pb-12 px-6 transition-transform duration-300 ease-in-out transform overflow-y-auto",
          showSimulator ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        <div className="w-full flex items-center justify-between mb-8 lg:mb-4 lg:justify-center relative">
           <button 
             onClick={() => setShowSimulator(false)} 
             className="lg:hidden p-2 bg-white rounded-full shadow-sm text-slate-600 border border-slate-200 absolute left-0"
           >
              <X className="w-5 h-5" />
           </button>
           <div className="text-center w-full">
             <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Simulateur Enfant</h3>
             <p className="text-xs sm:text-sm text-slate-500 font-semibold uppercase tracking-wider">Aperçu en temps réel</p>
           </div>
        </div>

        <div className="w-full max-w-[340px] aspect-[1/2.1] lg:h-[720px] lg:max-h-full flex-shrink-0 mx-auto mt-4 ring-[12px] ring-slate-800 rounded-[3.5rem] shadow-2xl relative bg-slate-900">
           <ChildView 
             apps={apps}
             deviceLocked={deviceLocked}
             internetPaused={internetPaused}
             activeAppId={activeAppId}
             onOpenApp={(id) => setActiveAppId(id)}
             onCloseApp={() => setActiveAppId(null)}
           />
        </div>
      </div>

    </div>
  );
}

