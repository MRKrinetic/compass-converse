
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

// Mock AI responses for demo purposes
const mockResponses = [
  {
    text: "Hello! I'm Compass AI, your travel assistant. How can I help you today?",
    type: 'text',
  },
  {
    text: "Paris is a beautiful destination! Here's a map of the city center with some key attractions marked:",
    type: 'map',
    metadata: {
      coordinates: { lat: 48.8566, lng: 2.3522 },
      zoom: 13,
      placeName: 'Paris, France',
    },
  },
  {
    text: "Here's the current weather in New York City:",
    type: 'weather',
    metadata: {
      weather: {
        temperature: 72,
        condition: 'Partly Cloudy',
        icon: 'partly-cloudy',
      },
      coordinates: { lat: 40.7128, lng: -74.0060 },
    },
  },
  {
    text: "I found this hidden gem in Barcelona that not many tourists know about:",
    type: 'place',
    metadata: {
      placeName: 'El Xampanyet',
      placeImage: 'https://images.unsplash.com/photo-1560184611-ba28e1c896df?q=80&w=1974&auto=format&fit=crop',
      placeRating: 4.7,
      coordinates: { lat: 41.3851, lng: 2.1734 },
    },
  },
  {
    text: "In case of emergency, here's the nearest hospital to your location:",
    type: 'emergency',
    metadata: {
      emergency: {
        service: 'Central Hospital',
        phone: '+1-555-123-4567',
        address: '123 Medical Dr, City',
      },
      coordinates: { lat: 37.7749, lng: -122.4194 },
    },
  },
];

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

  // Generate a mock AI response based on user input
  const generateAIResponse = useCallback((userMessage: string) => {
    // Simulate AI "thinking" time
    setIsTyping(true);
    
    setTimeout(() => {
      // For demo purposes, we'll pick a random response from our mock data
      const responseIndex = Math.floor(Math.random() * mockResponses.length);
      const mockResponse = mockResponses[responseIndex];
      
      const messageType = mockResponse.type as MessageType;
      
      const newAIMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        content: mockResponse.text,
        sender: 'ai',
        type: messageType,
        timestamp: new Date(),
        metadata: mockResponse.metadata,
      };
      
      setMessages(prev => [...prev, newAIMessage]);
      setIsTyping(false);
    }, 1500); // Simulate typing delay
  }, []);

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
    generateAIResponse(content);
  }, [generateAIResponse]);

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
