
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import RecentTrips from './RecentTrips';
import Favorites from './Favorites';
import { Hotel, Plane, PlaneTakeoff, Luggage, Map } from 'lucide-react';
import { useChat } from '@/contexts/ChatContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from "@/components/ui/use-toast";

interface SidebarProps {
  className?: string;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, toggleSidebar }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { messages, clearMessages } = useChat();
  const isMobile = useIsMobile();
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const handleNewTrip = () => {
    // Only save the chat if there are user messages
    const hasUserMessages = messages.some(m => m.sender === 'user');
    
    if (hasUserMessages) {
      // In a real app, this would save the conversation to a database
      // For now, we'll just show a toast to indicate it's been saved
      const tripName = `Trip on ${new Date().toLocaleDateString()}`;
      
      toast({
        title: "Trip Saved",
        description: `Your conversation has been saved as "${tripName}"`,
      });
    }
    
    // Clear the current chat and start a new one
    clearMessages();
    
    // On mobile, close the sidebar after creating a new trip
    if (isMobile) {
      toggleSidebar();
    }
  };

  return (
    <div className={cn(
      "flex flex-col h-full w-72 border-r bg-white dark:bg-slate-900 transition-colors duration-300 ease-in-out relative",
      className
    )}>
      {/* Sidebar header/branding */}
      <div className="flex items-center gap-3 px-4 py-4 border-b">
        <div className="h-9 w-9 rounded-lg bg-compass-500 flex items-center justify-center text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
          </svg>
        </div>
        <h1 className="font-semibold text-xl tracking-tight">Compass AI</h1>
        
        {/* Toggle sidebar button (now inside the sidebar) */}
        <button 
          onClick={toggleSidebar}
          className="ml-auto p-2 bg-white dark:bg-slate-800 rounded-md shadow-soft hover:bg-compass-50 dark:hover:bg-slate-700 transition-colors"
          aria-label="Close sidebar"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>
      
      {/* Sidebar content */}
      <div className="flex-1 overflow-y-auto scrollbar-hidden px-2 py-3 space-y-6">
        {/* Light/Dark mode toggle */}
        <div className="flex items-center justify-between px-3 py-2 mb-4">
          <span className="text-sm font-medium">Dark Mode</span>
          <button 
            onClick={toggleDarkMode}
            className={cn(
              "relative h-6 w-11 rounded-full transition-colors",
              isDarkMode ? "bg-compass-500" : "bg-slate-200 dark:bg-slate-700"
            )}
          >
            <span className="sr-only">Toggle dark mode</span>
            <span 
              className={cn(
                "absolute rounded-full h-5 w-5 top-0.5 left-0.5 transform transition-transform bg-white shadow",
                isDarkMode ? "translate-x-5" : "translate-x-0"
              )}
            />
            
            <span className={cn(
              "absolute inset-0 flex items-center justify-between p-1",
              isDarkMode ? "text-white" : "text-slate-400"
            )}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>

              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-0.5">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            </span>
          </button>
        </div>
        
        {/* Travel Booking Options - NEW SECTION */}
        <div className="px-1.5 space-y-1">
          <h3 className="text-xs font-medium uppercase text-muted-foreground px-3 mb-2">Travel Options</h3>
          
          <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-compass-50/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-3">
            <Hotel size={16} className="text-compass-600 dark:text-compass-400" />
            <span className="text-sm">Book Hotels</span>
          </button>
          
          <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-compass-50/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-3">
            <PlaneTakeoff size={16} className="text-compass-600 dark:text-compass-400" />
            <span className="text-sm">Book Flights</span>
          </button>
          
          <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-compass-50/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-3">
            <Plane size={16} className="text-compass-600 dark:text-compass-400" />
            <span className="text-sm">Flight Status</span>
          </button>
          
          <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-compass-50/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-3">
            <Luggage size={16} className="text-compass-600 dark:text-compass-400" />
            <span className="text-sm">Rental Cars</span>
          </button>
          
          <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-compass-50/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-3">
            <Map size={16} className="text-compass-600 dark:text-compass-400" />
            <span className="text-sm">Explore Destinations</span>
          </button>
        </div>
        
        {/* Recent Trips section */}
        <RecentTrips />
        
        {/* Favorites section */}
        <Favorites />
        
        {/* Simple divider */}
        <div className="h-px bg-border mx-3"></div>
        
        {/* Settings links */}
        <div className="space-y-1 px-1.5">
          <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-compass-50/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <span className="text-sm">Settings</span>
          </button>
          
          <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-compass-50/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <span className="text-sm">Manage Trips</span>
          </button>
          
          <button className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-compass-50/50 dark:hover:bg-slate-800/50 transition-colors flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
              <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
              <path d="M12 13v9" />
              <path d="M5 13v2a2 2 0 0 0 2 2h3" />
            </svg>
            <span className="text-sm">Help & Support</span>
          </button>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t p-4">
        <button 
          onClick={handleNewTrip}
          className="w-full py-2 px-3 bg-compass-50 dark:bg-slate-800 hover:bg-compass-100 dark:hover:bg-slate-700 text-compass-700 dark:text-compass-300 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          <span className="text-sm font-medium">New Trip</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
