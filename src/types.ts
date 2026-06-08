export interface AppUsage {
  id: string;
  name: string;
  category: string;
  timeSpent: number;
  limit: number | null;
  icon: string;
  isBlocked: boolean;
}

export interface DailyUsage {
  day: string;
  duree: number;
}

export interface ActivityLog {
  id: string;
  type: 'alert' | 'info' | 'block' | 'success';
  title: string;
  message: string;
  time: string;
}
