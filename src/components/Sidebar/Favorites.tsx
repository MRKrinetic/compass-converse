
import React from 'react';
import { cn } from '@/lib/utils';

interface FavoritesProps {
  className?: string;
}

const MOCK_FAVORITES = [
  {
    id: 'fav-1',
    title: 'Hidden Beach in Tulum',
    category: 'Beach',
    coords: '20.2114° N, 87.4654° W',
  },
  {
    id: 'fav-2',
    title: 'Secret Garden in Kyoto',
    category: 'Nature',
    coords: '35.0116° N, 135.7681° E',
  },
  {
    id: 'fav-3',
    title: 'Underground Jazz Bar in Paris',
    category: 'Nightlife',
    coords: '48.8566° N, 2.3522° E',
  },
];

const Favorites: React.FC<FavoritesProps> = ({ className }) => {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between px-3 py-1.5">
        <h3 className="text-sm font-medium">Favorites</h3>
        <button className="text-compass-500 dark:text-compass-400 hover:text-compass-600 dark:hover:text-compass-300 p-1 rounded-md transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5v14"></path>
            <path d="M5 12h14"></path>
          </svg>
        </button>
      </div>
      
      <ul className="space-y-1 px-1.5">
        {MOCK_FAVORITES.map((favorite) => (
          <li key={favorite.id}>
            <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-compass-50/50 dark:hover:bg-slate-800/50 transition-colors group">
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 dark:text-amber-300">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="text-sm font-medium">{favorite.title}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-xs text-muted-foreground">
                <span className="bg-compass-100 dark:bg-slate-700 text-compass-800 dark:text-compass-200 px-1.5 py-0.5 rounded-md">
                  {favorite.category}
                </span>
                <span className="truncate max-w-[120px]">{favorite.coords}</span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
