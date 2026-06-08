import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ScreenTimeChartProps {
  data: { day: string; duree: number }[];
}

export function ScreenTimeChart({ data }: ScreenTimeChartProps) {
  const formatYAxis = (tickItem: number) => {
    const hours = Math.floor(tickItem / 60);
    return hours > 0 ? `${hours}h` : '';
  };

  return (
    <div className="h-72 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
            dy={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
            tickFormatter={formatYAxis}
          />
          <Tooltip 
             cursor={{fill: 'transparent'}}
             content={({ active, payload }) => {
               if (active && payload && payload.length) {
                 const value = payload[0].value as number;
                 const hours = Math.floor(value / 60);
                 const mins = value % 60;
                 const timeStr = hours > 0 ? `${hours}h ${mins > 0 ? mins + 'm' : ''}` : `${mins}m`;
                 return (
                   <div className="bg-white border border-slate-200 p-3 rounded-lg shadow-sm text-slate-900">
                     <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">{payload[0].payload.day}</p>
                     <p className="font-bold">{timeStr}</p>
                   </div>
                 );
               }
               return null;
             }}
          />
          <Bar dataKey="duree" radius={[4, 4, 0, 0]} maxBarSize={48}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.duree > 240 ? '#f43f5e' : '#6366f1'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
