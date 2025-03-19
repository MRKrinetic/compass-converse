
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import ChatWindow from '@/components/Chat/ChatWindow';
import { ChatProvider } from '@/contexts/ChatContext';

const Index = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <ChatProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isSidebarOpen 
              ? 'w-72 opacity-100 translate-x-0' 
              : 'w-0 opacity-0 -translate-x-full'
          }`}
        >
          {isSidebarOpen && <Sidebar />}
        </div>
        
        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {/* Sidebar toggle button */}
          <button 
            onClick={toggleSidebar}
            className="absolute top-4 left-4 z-10 p-2 bg-white dark:bg-slate-800 rounded-md shadow-soft hover:bg-compass-50 dark:hover:bg-slate-700 transition-colors"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
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
              className={`transition-transform duration-300 ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`}
            >
              {isSidebarOpen ? (
                <>
                  <path d="m15 18-6-6 6-6" />
                </>
              ) : (
                <>
                  <path d="m9 18 6-6-6-6" />
                </>
              )}
            </svg>
          </button>
          
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Index;
