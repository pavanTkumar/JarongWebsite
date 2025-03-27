// lib/amenityUtils.js
/**
 * Helper to get appropriate emoji for amenity types
 */

// Common amenity types mapped to appropriate emojis
const amenityEmojis = {
    // Rooms & sleeping
    bedroom: '🛏️',
    bedrooms: '🛏️',
    "master bedroom": '🛌',
    bed: '🛌',
    beds: '🛌',
    
    // Bathroom
    bathroom: '🚿',
    bathrooms: '🚿',
    toilet: '🚽',
    bath: '🛁',
    shower: '🚿',
    
    // Kitchen & dining
    kitchen: '🍳',
    "fully equipped kitchen": '🍳',
    refrigerator: '🧊',
    fridge: '🧊',
    oven: '🔥',
    microwave: '📟',
    dishwasher: '🍽️',
    "coffee machine": '☕',
    dining: '🍽️',
    "dining area": '🍽️',
    
    // Comfort & utilities
    "air conditioning": '🌡️',
    "air conditioner": '🌡️',
    "air con": '🌡️',
    ac: '🌡️',
    fan: '💨',
    heating: '🔥',
    heater: '🔥',
    "washing machine": '🧺',
    washer: '🧺',
    dryer: '👕',
    iron: '🔥',
    
    // Entertainment & connectivity
    tv: '📺',
    television: '📺',
    "smart tv": '📺',
    wifi: '📶',
    "free wifi": '📶',
    internet: '📶',
    
    // Outdoor & views
    pool: '🏊',
    "swimming pool": '🏊‍♀️',
    balcony: '🏞️',
    terrace: '🪑',
    garden: '🌳',
    bbq: '🍖',
    view: '🏞️',
    "sea view": '🌊',
    "ocean view": '🌊',
    "beach view": '🏖️',
    
    // General amenities
    parking: '🚗',
    "free parking": '🚗',
    elevator: '🛗',
    security: '🔒',
    gym: '💪',
    fitness: '💪',
    reception: '🛎️',
    lobby: '🛋️',
    
    // Living spaces
    "living room": '🛋️',
    sofa: '🛋️',
    desk: '🖥️',
    workspace: '💼',
    
    // Guests
    guests: '👥',
    sleeps: '👥',
    "max guests": '👤',
  };
  
  /**
   * Get an appropriate emoji for an amenity based on its name
   * @param {string} amenityName - The name of the amenity
   * @returns {string} Emoji for the amenity
   */
  export function getAmenityEmoji(amenityName) {
    if (!amenityName) return '✓';
    
    // Convert to lowercase for better matching
    const normalizedName = amenityName.toLowerCase().trim();
    
    // Check direct match
    if (amenityEmojis[normalizedName]) {
      return amenityEmojis[normalizedName];
    }
    
    // Check substring match
    for (const [key, emoji] of Object.entries(amenityEmojis)) {
      if (normalizedName.includes(key)) {
        return emoji;
      }
    }
    
    // Handle numeric amenities (e.g., "2 Bedrooms")
    if (/\d+\s*(bedroom|bed|bathroom|guest|bath|toilet)/i.test(normalizedName)) {
      if (normalizedName.includes('bedroom') || normalizedName.includes('bed')) {
        return '🛏️';
      }
      if (normalizedName.includes('bathroom') || normalizedName.includes('bath') || normalizedName.includes('toilet')) {
        return '🚿';
      }
      if (normalizedName.includes('guest')) {
        return '👥';
      }
    }
    
    // Default emoji for unmatched amenities
    return '✓';
  }
  
  /**
   * Format an amenity name to be more presentable
   * @param {string} name - The raw amenity name
   * @returns {string} Formatted amenity name
   */
  export function formatAmenityName(name) {
    if (!name) return '';
    
    // Capitalize first letter of each word
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }
  
  /**
   * Process amenities with emojis for display
   * @param {Array} amenities - Array of amenity names
   * @returns {Array} Formatted amenities with emojis
   */
  export function processAmenities(amenities) {
    if (!amenities || !Array.isArray(amenities) || amenities.length === 0) {
      // Default amenities if none provided
      return [
        { icon: '🛏️', name: '3 Bedrooms' },
        { icon: '🚿', name: '2 Bathrooms' },
        { icon: '👥', name: 'Sleeps up to 6' },
        { icon: '🏊', name: 'Swimming Pool' },
        { icon: '🍳', name: 'Fully Equipped Kitchen' },
        { icon: '🚗', name: 'Free Parking' },
        { icon: '🌡️', name: 'Air Conditioning' },
        { icon: '📶', name: 'Free WiFi' },
        { icon: '📺', name: 'Smart TV' },
        { icon: '🧺', name: 'Washing Machine' },
        { icon: '🏞️', name: 'Sea View' },
        { icon: '🛋️', name: 'Living Room' },
      ];
    }
    
    // Process each amenity with appropriate emoji
    return amenities.map(amenity => ({
      icon: getAmenityEmoji(amenity),
      name: formatAmenityName(amenity)
    }));
  }