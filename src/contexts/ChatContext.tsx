
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { toast } from "@/components/ui/use-toast";

// Define message types for the chat
export type MessageType = 'text' | 'map' | 'weather' | 'emergency' | 'place';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  type: MessageType;
  timestamp: Date;
  metadata?: {
    coordinates?: { lat: number; lng: number };
    zoom?: number;
    placeName?: string;
    placeImage?: string;
    placeRating?: number;
    weather?: {
      temperature: number;
      condition: string;
      icon: string;
    };
    emergency?: {
      service: string;
      phone: string;
      address: string;
    };
  };
}

interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// API endpoints for various services
const API_ENDPOINTS = {
  GPT: '/api/gpt', // Replace with your actual GPT API endpoint
  LOCATION: '/api/location', // Location search API
  WEATHER: '/api/weather', // Weather information API
  EMERGENCY: '/api/emergency', // Emergency services API
  PLACES: '/api/places', // Places of interest API
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // Initialize with a welcome message
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      content: "Hello! I'm Compass AI, your travel assistant. How can I help you today?",
      sender: 'ai',
      type: 'text',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  // Process the user message and determine which API to call
  const processMessage = async (userMessage: string) => {
    try {
      setIsTyping(true);
      
      // First, send to GPT API to analyze the user's intent
      const gptResponse = await fetch(API_ENDPOINTS.GPT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!gptResponse.ok) {
        throw new Error('Failed to connect to the AI service');
      }
      
      const gptData = await gptResponse.json();
      
      // Based on the intent identified by GPT, make additional API calls if needed
      let messageType: MessageType = 'text';
      let metadata = {};
      
      if (gptData.intent) {
        switch (gptData.intent) {
          case 'location_search':
            // Call location API
            const locationResponse = await fetch(API_ENDPOINTS.LOCATION, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query: gptData.locationQuery }),
            });
            
            if (locationResponse.ok) {
              const locationData = await locationResponse.json();
              messageType = 'map';
              metadata = {
                coordinates: locationData.coordinates,
                zoom: locationData.zoom || 13,
                placeName: locationData.name,
              };
            }
            break;
            
          case 'weather_check':
            // Call weather API
            const weatherResponse = await fetch(API_ENDPOINTS.WEATHER, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ location: gptData.location }),
            });
            
            if (weatherResponse.ok) {
              const weatherData = await weatherResponse.json();
              messageType = 'weather';
              metadata = {
                weather: {
                  temperature: weatherData.temperature,
                  condition: weatherData.condition,
                  icon: weatherData.icon,
                },
                coordinates: weatherData.coordinates,
              };
            }
            break;
            
          case 'place_info':
            // Call places API
            const placesResponse = await fetch(API_ENDPOINTS.PLACES, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ query: gptData.placeQuery }),
            });
            
            if (placesResponse.ok) {
              const placeData = await placesResponse.json();
              messageType = 'place';
              metadata = {
                placeName: placeData.name,
                placeImage: placeData.image,
                placeRating: placeData.rating,
                coordinates: placeData.coordinates,
              };
            }
            break;
            
          case 'emergency':
            // Call emergency services API
            const emergencyResponse = await fetch(API_ENDPOINTS.EMERGENCY, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ location: gptData.location }),
            });
            
            if (emergencyResponse.ok) {
              const emergencyData = await emergencyResponse.json();
              messageType = 'emergency';
              metadata = {
                emergency: {
                  service: emergencyData.service,
                  phone: emergencyData.phone,
                  address: emergencyData.address,
                },
                coordinates: emergencyData.coordinates,
              };
            }
            break;
            
          default:
            // Just use the text response from GPT
            messageType = 'text';
            break;
        }
      }
      
      const newAIMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        content: gptData.response,
        sender: 'ai',
        type: messageType,
        timestamp: new Date(),
        metadata,
      };
      
      setMessages(prev => [...prev, newAIMessage]);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        content: "I'm sorry, but I'm having trouble connecting to my services right now. Please try again later.",
        sender: 'ai',
        type: 'text',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      
      toast({
        title: "Connection Error",
        description: "Failed to connect to AI services.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Handle sending a new user message
  const sendMessage = useCallback((content: string) => {
    if (!content.trim()) return;
    
    const newUserMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      content,
      sender: 'user',
      type: 'text',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    processMessage(content);
  }, []);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    toast({
      title: "Chat cleared",
      description: "All messages have been cleared.",
    });
    
    // Add welcome message back
    setTimeout(() => {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: "Hello! I'm Compass AI, your travel assistant. How can I help you today?",
        sender: 'ai',
        type: 'text',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }, 300);
  }, []);

  return (
    <ChatContext.Provider value={{ messages, isTyping, sendMessage, clearMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
