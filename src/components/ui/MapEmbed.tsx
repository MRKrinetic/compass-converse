
import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface MapEmbedProps {
  lat: number;
  lng: number;
  zoom?: number;
  className?: string;
  interactive?: boolean;
  height?: string;
}

const MapEmbed: React.FC<MapEmbedProps> = ({ 
  lat, 
  lng, 
  zoom = 13,
  className,
  interactive = true,
  height = '200px'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x400&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=YOUR_GOOGLE_MAPS_API_KEY`;

  // In a real application, you would integrate with the actual Google Maps API
  // For demo purposes, we're using a static image and styling it to look interactive
  
  return (
    <div className={cn("relative overflow-hidden rounded-lg transition-all duration-300 ease-in-out", className)}
         style={{ height }}>
      <div className="absolute inset-0 flex items-center justify-center bg-compass-50 dark:bg-compass-900 animate-fade-in">
        {/* Placeholder map image - in production, replace with actual Google Maps integration */}
        <div className="absolute inset-0 bg-gradient-to-t from-compass-100/60 to-transparent dark:from-compass-900/60 pointer-events-none z-10"></div>
        
        <div 
          ref={mapRef}
          className="absolute inset-0 bg-compass-100 dark:bg-compass-900"
          style={{
            backgroundImage: `url('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Demo map content - replace with actual map in production */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center p-4">
              <div className="w-full h-32 sm:h-40 bg-compass-200/50 dark:bg-compass-800/50 rounded-lg mb-2 relative overflow-hidden">
                {/* Simplified map representation for demo */}
                <div className="absolute w-full h-full bg-compass-100 dark:bg-compass-800 opacity-70">
                  <div className="grid grid-cols-8 grid-rows-6 gap-0.5 h-full w-full">
                    {Array.from({ length: 48 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-compass-200 dark:bg-compass-700 opacity-30"
                        style={{ opacity: Math.random() * 0.5 + 0.1 }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-compass-500 ring-4 ring-compass-500/20 animate-pulse"></div>
                </div>
              </div>
              <p className="text-sm text-compass-700 dark:text-compass-300 truncate">
                Coordinates: {lat.toFixed(4)}, {lng.toFixed(4)}
              </p>
            </div>
          </div>
        </div>
        
        {/* Interactive controls overlay */}
        {interactive && (
          <div className="absolute bottom-2 right-2 z-20 flex flex-col gap-2">
            <button className="p-1.5 bg-white dark:bg-slate-800 rounded-md shadow-md flex items-center justify-center text-compass-700 dark:text-compass-300 hover:bg-compass-50 dark:hover:bg-slate-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            <button className="p-1.5 bg-white dark:bg-slate-800 rounded-md shadow-md flex items-center justify-center text-compass-700 dark:text-compass-300 hover:bg-compass-50 dark:hover:bg-slate-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 11 8-8 8 8" />
                <path d="M11 3v8h8" />
                <path d="m21 13-8 8-8-8" />
                <path d="M13 21v-8H5" />
              </svg>
            </button>
          </div>
        )}
        
        {/* Overlay for expanding the map */}
        <div className="absolute top-2 right-2 z-20">
          <button className="p-1.5 bg-white dark:bg-slate-800 rounded-md shadow-md flex items-center justify-center text-compass-700 dark:text-compass-300 hover:bg-compass-50 dark:hover:bg-slate-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6" />
              <path d="M9 21H3v-6" />
              <path d="m21 3-7 7" />
              <path d="m3 21 7-7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapEmbed;
