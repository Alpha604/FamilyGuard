import { AppUsage, DailyUsage, ActivityLog } from "./types";

export const initialAppUsage: AppUsage[] = [
  { id: "1", name: "TikTok", category: "Réseaux Sociaux", timeSpent: 3500, limit: 3600, icon: "smartphone", isBlocked: false },
  { id: "2", name: "YouTube", category: "Divertissement", timeSpent: 2700, limit: 7200, icon: "youtube", isBlocked: false },
  { id: "3", name: "Instagram", category: "Réseaux Sociaux", timeSpent: 4800, limit: 5400, icon: "camera", isBlocked: false },
  { id: "4", name: "Brawl Stars", category: "Jeux", timeSpent: 1800, limit: 3600, icon: "gamepad-2", isBlocked: false },
  { id: "6", name: "Duolingo", category: "Éducation", timeSpent: 1200, limit: null, icon: "book", isBlocked: false },
  { id: "7", name: "Calculatrice", category: "Éducation", timeSpent: 300, limit: null, icon: "calculator", isBlocked: false },
  { id: "5", name: "Chrome", category: "Internet", timeSpent: 3900, limit: null, icon: "globe", isBlocked: false },
];

export const weeklyScreenTime: DailyUsage[] = [
  { day: "Lun", duree: 180 },
  { day: "Mar", duree: 150 },
  { day: "Mer", duree: 210 },
  { day: "Jeu", duree: 140 },
  { day: "Ven", duree: 190 },
  { day: "Sam", duree: 320 },
  { day: "Dim", duree: 280 },
];

export const initialActivityLogs: ActivityLog[] = [
  { id: '1', type: 'block', title: 'Tentative bloquée', message: 'Léo a essayé d\'accéder à discord.com', time: 'Il y a 5 min' },
  { id: '2', type: 'alert', title: 'Limite atteinte', message: 'Temps écoulé pour Instagram', time: 'Il y a 15 min' },
  { id: '3', type: 'success', title: 'Récompense accordée', message: '+15 minutes de temps d\'écran', time: 'Il y a 2h' },
  { id: '4', type: 'info', title: 'Nouvelle application', message: 'Duolingo a été installée', time: 'Hier' },
];
