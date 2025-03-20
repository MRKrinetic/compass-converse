
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

export interface Trip {
  id: string;
  title: string;
  date: string;
  icon: string;
  messages: ChatMessage[];
}

interface ActiveTrip {
  id: string | null;
  savedTrips: Trip[];
}

interface ChatContextType {
  messages: ChatMessage[];
  isTyping: boolean;
  sendMessage: (content: string) => void;
  clearMessages: () => void;
  activeTrip: ActiveTrip;
  saveTrip: (title?: string) => void;
  loadTrip: (tripId: string) => void;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: { name: string; email: string } | null;
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
  VOICE: '/api/voice', // Voice recording API
};

// Mock user data
const MOCK_USER = {
  name: "Krishna",
  email: "krishna@gmail.com",
  password: "4017"
};

// Get saved trips from localStorage
const getSavedTrips = (): Trip[] => {
  const savedTrips = localStorage.getItem('savedTrips');
  return savedTrips ? JSON.parse(savedTrips) : [];
};

// Save trips to localStorage
const saveTripsToStorage = (trips: Trip[]) => {
  localStorage.setItem('savedTrips', JSON.stringify(trips));
};

// Get auth state from localStorage
const getAuthState = () => {
  const authState = localStorage.getItem('isAuthenticated');
  return authState === 'true';
};

// Get user from localStorage
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [activeTrip, setActiveTrip] = useState<ActiveTrip>({
    id: null,
    savedTrips: getSavedTrips()
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(getAuthState());
  const [user, setUser] = useState<{ name: string; email: string } | null>(getUser());

  // Initialize with a welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: "Hello! I'm Compass AI, your travel assistant. How can I help you today?",
        sender: 'ai',
        type: 'text',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [messages.length]);

  // Login function
  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would be an API call
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      setIsAuthenticated(true);
      setUser({ name: MOCK_USER.name, email: MOCK_USER.email });
      
      // Save to localStorage
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify({ 
        name: MOCK_USER.name, 
        email: MOCK_USER.email 
      }));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${MOCK_USER.name}!`,
      });
      
      return true;
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      
      return false;
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    
    // Remove from localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
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

  // Save current conversation as a trip
  const saveTrip = useCallback((customTitle?: string) => {
    // Only save the chat if there are user messages
    const hasUserMessages = messages.some(m => m.sender === 'user');
    
    if (hasUserMessages) {
      // Extract title from first user message or use custom title
      const firstUserMessage = messages.find(m => m.sender === 'user');
      const title = customTitle || (firstUserMessage ? 
        firstUserMessage.content.slice(0, 30) + (firstUserMessage.content.length > 30 ? '...' : '') : 
        `Trip on ${new Date().toLocaleDateString()}`);
      
      // Generate a random icon
      const icons = ['🗼', '🏖️', '🗽', '🥖', '🏔️', '🌋', '🏜️', '🏞️', '🏙️', '🌆'];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      
      // Create new trip
      const newTrip: Trip = {
        id: `trip-${Date.now()}`,
        title,
        date: `${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        icon: randomIcon,
        messages: [...messages],
      };
      
      // Add to saved trips
      const updatedTrips = [...activeTrip.savedTrips, newTrip];
      setActiveTrip({
        id: null,
        savedTrips: updatedTrips
      });
      
      // Save to localStorage
      saveTripsToStorage(updatedTrips);
      
      toast({
        title: "Trip Saved",
        description: `Your conversation has been saved as "${title}"`,
      });
      
      // Clear current chat
      clearMessages();
    } else {
      toast({
        title: "Nothing to save",
        description: "Start a conversation first before saving a trip.",
      });
    }
  }, [messages, activeTrip.savedTrips]);

  // Load a saved trip
  const loadTrip = useCallback((tripId: string) => {
    const trip = activeTrip.savedTrips.find(t => t.id === tripId);
    
    if (trip) {
      setMessages(trip.messages);
      setActiveTrip({
        ...activeTrip,
        id: tripId
      });
      
      toast({
        title: "Trip Loaded",
        description: `Loaded trip: ${trip.title}`,
      });
    }
  }, [activeTrip]);

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([]);
    setActiveTrip({
      ...activeTrip,
      id: null
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
  }, [activeTrip]);

  return (
    <ChatContext.Provider 
      value={{ 
        messages, 
        isTyping, 
        sendMessage, 
        clearMessages, 
        activeTrip, 
        saveTrip,
        loadTrip,
        isAuthenticated,
        login,
        logout,
        user
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
