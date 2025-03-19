
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
          {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
        </div>
        
        {/* Main chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <ChatWindow />
        </div>
      </div>
    </ChatProvider>
  );
};

export default Index;
