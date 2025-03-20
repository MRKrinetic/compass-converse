
import React, { useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { SettingsButton } from '@/components/Settings/SettingsButton';
import ProfileCard from '@/components/Profile/ProfileCard';

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
        
        {/* User Profile Dropdown */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-compass-500 focus:ring-offset-2">
                <Avatar className="h-9 w-9 cursor-pointer transition-all hover:opacity-80">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-compass-100 text-compass-700">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 p-0" side="bottom" sideOffset={5}>
              <div className="p-2">
                <ProfileCard 
                  onSignIn={() => console.log('Sign in clicked')}
                  onSignUp={() => console.log('Sign up clicked')}
                  onProfile={() => console.log('Profile clicked')}
                />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <SettingsButton />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
                <span>My Trips</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M18 6H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h13l4-3.5L18 6Z" />
                  <path d="M12 13v9" />
                  <path d="M5 13v2a2 2 0 0 0 2 2h3" />
                </svg>
                <span>Help & Support</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
