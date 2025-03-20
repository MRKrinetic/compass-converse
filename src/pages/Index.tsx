
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import ChatWindow from '@/components/Chat/ChatWindow';
import { ChatProvider } from '@/contexts/ChatContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChatProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar with z-index to ensure it appears above content on mobile */}
        <div 
          className={`transition-all duration-300 ease-in-out z-30 ${
            isSidebarOpen 
              ? isMobile ? 'fixed top-0 left-0 h-full w-72 opacity-100 translate-x-0' : 'w-72 opacity-100 translate-x-0' 
              : 'w-0 opacity-0 -translate-x-full'
          }`}
        >
          {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
        </div>
        
        {/* Overlay for mobile when sidebar is open */}
        {isMobile && isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/30 z-20" 
            onClick={toggleSidebar}
            aria-hidden="true"
          />
        )}
        
        {/* Main chat area with proper padding when sidebar is open on desktop */}
        <div className={`flex-1 flex flex-col overflow-hidden relative ${
          isSidebarOpen && !isMobile ? 'ml-0' : ''
        }`}>
          {/* Sidebar toggle button - styled as a small tab on the left edge */}
          {!isSidebarOpen && (
            <button 
              onClick={toggleSidebar}
              className="absolute top-1/2 -translate-y-1/2 left-0 z-10 p-2 bg-white dark:bg-slate-800 rounded-r-md shadow-soft hover:bg-compass-50 dark:hover:bg-slate-700 transition-colors"
              aria-label="Open sidebar"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}
          
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Index;
