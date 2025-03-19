
import React from 'react';
import { cn } from '@/lib/utils';

interface RecentTripsProps {
  className?: string;
}

const MOCK_TRIPS = [
  {
    id: 'trip-1',
    title: 'Tokyo Exploration',
    date: '2 days ago',
    icon: '🗼',
    isActive: true,
  },
  {
    id: 'trip-2',
    title: 'Barcelona Weekend',
    date: '1 week ago',
    icon: '🏖️',
    isActive: false,
  },
  {
    id: 'trip-3',
    title: 'New York Business Trip',
    date: '2 weeks ago',
    icon: '🗽',
    isActive: false,
  },
  {
    id: 'trip-4',
    title: 'Paris Getaway',
    date: '1 month ago',
    icon: '🥖',
    isActive: false,
  },
];

const RecentTrips: React.FC<RecentTripsProps> = ({ className }) => {
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
        {MOCK_TRIPS.map((trip) => (
          <li key={trip.id}>
            <button 
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors group",
                trip.isActive 
                  ? "bg-compass-50 text-compass-900 dark:bg-slate-800 dark:text-compass-50" 
                  : "hover:bg-compass-50/50 dark:hover:bg-slate-800/50"
              )}
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
      </ul>
    </div>
  );
};

export default RecentTrips;
