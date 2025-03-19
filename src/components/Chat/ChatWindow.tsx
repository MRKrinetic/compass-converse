
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { cn } from '@/lib/utils';

interface ChatWindowProps {
  className?: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ className }) => {
  const { messages, isTyping } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom on new messages
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={cn(
      "flex flex-col h-full overflow-hidden",
      className
    )}>
      {/* Chat header */}
      <div className="flex items-center justify-between gap-4 px-4 py-3 border-b bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full overflow-hidden bg-compass-500 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium text-sm">Compass AI</h3>
            <p className="text-xs text-muted-foreground">Travel Assistant</p>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="2" />
              <path d="M12 19c-4.2 0-7-1.4-7-4V9" />
              <path d="M5 8V5c0-2.6 2.8-4 7-4s7 1.4 7 4v14c0 2.6-2.8 4-7 4-1.2 0-2.3-.1-3.3-.3" />
            </svg>
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="8" height="6" x="8" y="2" rx="1" />
              <rect width="8" height="6" x="8" y="14" rx="1" />
              <path d="M19 6v6M5 12V6" />
              <path d="M5 18v-6" />
              <path d="M19 18v-6" />
            </svg>
          </button>
          <button className="p-1.5 text-muted-foreground hover:text-foreground rounded-md transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15v3m0 3v-3m0 0h-3m3 0h3" />
              <rect width="18" height="18" x="3" y="3" rx="2" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message} />
        ))}
        
        {/* Typing indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="typing-indicator chat-bubble-ai ml-0 py-3 px-4">
              <div className="flex items-center gap-1.5">
                <span className="typing-dot animate-typing-dot-1"></span>
                <span className="typing-dot animate-typing-dot-2"></span>
                <span className="typing-dot animate-typing-dot-3"></span>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible element to scroll to */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area */}
      <div className="p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatWindow;
