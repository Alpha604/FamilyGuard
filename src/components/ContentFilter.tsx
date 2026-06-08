import { Shield, Search, Youtube, Globe, ToggleLeft, ToggleRight } from "lucide-react";
import { useState } from "react";
import { cn } from "../lib/utils";

export function ContentFilter() {
  const [filters, setFilters] = useState({
    safeSearch: true,
    adultBlocked: true,
    youtubeRestricted: true,
    socialMedia: false,
  });

  const toggleFilter = (key: keyof typeof filters) => {
    setFilters(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Filtrage de Contenu</h2>
          <p className="text-sm font-semibold text-slate-500">Protection active sur tout le réseau</p>
        </div>
        <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
          <Shield className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-4 flex-1">
        <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
               <Search className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">SafeSearch Google</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Filtre les résultats de recherche explicites</p>
            </div>
          </div>
          <button onClick={() => toggleFilter('safeSearch')} className={cn("transition-colors", filters.safeSearch ? "text-indigo-600" : "text-slate-300")}>
            {filters.safeSearch ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
               <Globe className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Blocage Adultes (18+)</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Bloque les sites non adaptés</p>
            </div>
          </div>
          <button onClick={() => toggleFilter('adultBlocked')} className={cn("transition-colors", filters.adultBlocked ? "text-indigo-600" : "text-slate-300")}>
            {filters.adultBlocked ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
          </button>
        </div>

        <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl border border-slate-100 hover:bg-slate-50/50 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shrink-0">
               <Youtube className="w-4 h-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">YouTube Restreint</p>
              <p className="text-xs text-slate-500 font-medium mt-0.5">Masque le contenu potentiellement choquant</p>
            </div>
          </div>
          <button onClick={() => toggleFilter('youtubeRestricted')} className={cn("transition-colors", filters.youtubeRestricted ? "text-indigo-600" : "text-slate-300")}>
            {filters.youtubeRestricted ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
          </button>
        </div>
      </div>
    </div>
  );
}
