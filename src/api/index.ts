
// Export all API handlers for easy access
export * from './gpt';
export * from './location';
export * from './weather';
export * from './places';
export * from './emergency';

// API endpoint URL mapping
export const API_ENDPOINTS = {
  GPT: '/api/gpt',
  LOCATION: '/api/location',
  WEATHER: '/api/weather',
  EMERGENCY: '/api/emergency',
  PLACES: '/api/places',
};
