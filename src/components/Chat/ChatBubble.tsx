
import React from 'react';
import { cn } from '@/lib/utils';
import { ChatMessage } from '@/contexts/ChatContext';
import MapEmbed from '@/components/ui/MapEmbed';

interface ChatBubbleProps {
  message: ChatMessage;
  className?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, className }) => {
  const isUser = message.sender === 'user';

  // Handle different message types
  const renderMessageContent = () => {
    switch (message.type) {
      case 'map':
        return (
          <div className="space-y-3">
            <p className="text-sm">{message.content}</p>
            {message.metadata?.coordinates && (
              <MapEmbed 
                lat={message.metadata.coordinates.lat} 
                lng={message.metadata.coordinates.lng} 
                zoom={message.metadata.zoom || 13}
                className="mt-2"
              />
            )}
            {message.metadata?.placeName && (
              <p className="text-xs text-compass-700 dark:text-compass-300 mt-1">
                {message.metadata.placeName}
              </p>
            )}
          </div>
        );
        
      case 'weather':
        return (
          <div className="space-y-3">
            <p className="text-sm">{message.content}</p>
            {message.metadata?.weather && (
              <div className="flex items-center gap-4 p-3 bg-white/50 dark:bg-slate-700/50 rounded-lg mt-2">
                <div className="h-12 w-12 rounded-full bg-compass-100 dark:bg-compass-800 flex items-center justify-center">
                  <span className="text-xl">☁️</span>
                </div>
                <div>
                  <p className="font-semibold">{message.metadata.weather.temperature}° F</p>
                  <p className="text-sm text-compass-700 dark:text-compass-300">{message.metadata.weather.condition}</p>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'place':
        return (
          <div className="space-y-3">
            <p className="text-sm">{message.content}</p>
            {message.metadata?.placeName && (
              <div className="overflow-hidden rounded-lg bg-white/50 dark:bg-slate-700/50 mt-2">
                <div className="aspect-[16/9] w-full relative bg-compass-100 dark:bg-compass-900">
                  {message.metadata.placeImage ? (
                    <img 
                      src={message.metadata.placeImage} 
                      alt={message.metadata.placeName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span>Image unavailable</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{message.metadata.placeName}</h4>
                    {message.metadata.placeRating && (
                      <div className="flex items-center gap-1 text-compass-700 dark:text-compass-300">
                        <span>★</span>
                        <span className="text-sm">{message.metadata.placeRating}</span>
                      </div>
                    )}
                  </div>
                  <button className="mt-2 text-xs text-compass-600 dark:text-compass-400 hover:text-compass-700 dark:hover:text-compass-300 transition-colors">
                    Get directions →
                  </button>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'emergency':
        return (
          <div className="space-y-3">
            <p className="text-sm">{message.content}</p>
            {message.metadata?.emergency && (
              <div className="border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg mt-2">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"></path>
                    <path d="M12 18v.01"></path>
                  </svg>
                  <h4 className="font-medium">{message.metadata.emergency.service}</h4>
                </div>
                <p className="mt-1 text-sm">{message.metadata.emergency.address}</p>
                <a 
                  href={`tel:${message.metadata.emergency.phone}`}
                  className="mt-2 inline-block px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-sm rounded-md hover:bg-red-200 dark:hover:bg-red-900/60 transition-colors"
                >
                  {message.metadata.emergency.phone}
                </a>
              </div>
            )}
          </div>
        );
        
      case 'text':
      default:
        return (
          <p className="text-sm">{message.content}</p>
        );
    }
  };

  return (
    <div className={cn(
      "group animate-slide-up",
      isUser ? "flex justify-end" : "flex justify-start",
      className
    )}>
      <div className={cn(
        "max-w-[85%] md:max-w-[75%] relative",
        isUser ? "chat-bubble-user" : "chat-bubble-ai",
      )}>
        {renderMessageContent()}
        
        <div className={cn(
          "absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          isUser ? "-left-8 top-2" : "-right-8 top-2"
        )}>
          <button className="p-1.5 text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1" />
              <circle cx="19" cy="12" r="1" />
              <circle cx="5" cy="12" r="1" />
            </svg>
          </button>
        </div>
        
        <time 
          className={cn(
            "text-[10px] absolute -bottom-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200",
            isUser ? "right-1" : "left-1"
          )}
          dateTime={message.timestamp.toISOString()}
        >
          {message.timestamp.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
        </time>
      </div>
    </div>
  );
};

export default ChatBubble;
