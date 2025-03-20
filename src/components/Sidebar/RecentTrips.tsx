
import React from 'react';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/ChatContext';

interface RecentTripsProps {
  className?: string;
}

interface Trip {
  id: string;
  title: string;
  date: string;
  icon: string;
  isActive: boolean;
  messages: any[];
}

const RecentTrips: React.FC<RecentTripsProps> = ({ className }) => {
  const { messages, loadTrip, activeTrip } = useChat();
  
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between px-3 py-1.5">
        <h3 className="text-sm font-medium">Recent Trips</h3>
        <button className="text-compass-500 dark:text-compass-400 hover:text-compass-600 dark:hover:text-compass-300 p-1 rounded-md transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
        </button>
      </div>
      
      <ul className="space-y-1 px-1.5">
        {activeTrip.savedTrips.map((trip) => (
          <li key={trip.id}>
            <button 
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors group",
                trip.id === activeTrip.id 
                  ? "bg-compass-50 text-compass-900 dark:bg-slate-800 dark:text-compass-50" 
                  : "hover:bg-compass-50/50 dark:hover:bg-slate-800/50"
              )}
              onClick={() => loadTrip(trip.id)}
            >
              <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-white dark:bg-slate-700 shadow-sm">
                {trip.icon}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{trip.title}</p>
                <p className="text-xs text-muted-foreground truncate">{trip.date}</p>
              </div>
              <svg 
                className="opacity-0 group-hover:opacity-100 transition-opacity text-compass-500 dark:text-compass-400" 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="1" />
                <circle cx="19" cy="12" r="1" />
                <circle cx="5" cy="12" r="1" />
              </svg>
            </button>
          </li>
        ))}
        {activeTrip.savedTrips.length === 0 && (
          <li className="text-sm text-muted-foreground text-center py-2">
            No trips yet. Start a conversation and click "New Trip" to save it.
          </li>
        )}
      </ul>
    </div>
  );
};

export default RecentTrips;
