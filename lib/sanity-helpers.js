import { client, urlFor } from './sanity';

/**
 * Format a Sanity image URL with proper error handling
 * @param {Object} imageRef - Sanity image reference
 * @returns {String} Formatted image URL or placeholder
 */
export const getImageUrl = (imageRef) => {
  try {
    if (!imageRef) return '/images/placeholder.jpg';
    
    const url = urlFor(imageRef);
    return url || '/images/placeholder.jpg';
  } catch (error) {
    console.error('Error formatting image URL:', error);
    return '/images/placeholder.jpg';
  }
};

/**
 * Process gallery images from Sanity
 * @param {Array} galleryImages - Array of Sanity image references
 * @returns {Array} Array of formatted image URLs
 */
export const processGalleryImages = (galleryImages) => {
  if (!galleryImages || !Array.isArray(galleryImages) || galleryImages.length === 0) {
    return ['/images/placeholder.jpg'];
  }

  return galleryImages.map(image => getImageUrl(image));
};

/**
 * Format a date from ISO string to localized display format
 * @param {String} dateString - ISO date string
 * @param {Object} options - Format options
 * @returns {String} Formatted date string
 */
export const formatDate = (dateString, options = {}) => {
  if (!dateString) return '';
  
  const defaultOptions = {
    year: 'numeric',
    month: 'long', 
    day: 'numeric'
  };
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { ...defaultOptions, ...options });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Extract numeric value from duration string
 * @param {String} durationString - Duration string (e.g., "7 Days")
 * @returns {Number} Number of days
 */
export const getDurationDays = (durationString) => {
  if (!durationString) return 0;
  
  const match = durationString.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

/**
 * Submit booking data to Sanity
 * @param {Object} bookingData - Booking form data
 * @returns {Promise} Promise resolving to booking result
 */
export const submitBooking = async (bookingData) => {
  try {
    const response = await fetch('/api/booking', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting booking:', error);
    throw new Error('Failed to submit booking');
  }
};

/**
 * Submit contact form data to Sanity
 * @param {Object} contactData - Contact form data
 * @returns {Promise} Promise resolving to submission result
 */
export const submitContact = async (contactData) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit contact form');
  }
};