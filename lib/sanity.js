import { createClient } from 'next-sanity';

// Initialize the Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jq3x5bz4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2021-06-07',
  useCdn: process.env.NODE_ENV === 'production',
});

/**
 * Helper function to build Sanity image URLs
 * @param {Object} source - Sanity image source object
 * @returns {String|null} - Formatted image URL or null if invalid
 */
export const urlFor = (source) => {
  if (!source || !source.asset) {
    return '/images/placeholder.jpg';
  }
  
  try {
    // Handle different Sanity image formats
    if (source.asset._ref) {
      // For image references
      const ref = source.asset._ref;
      const [, id, dimensions, extension] = ref.split('-');
      let format = extension;
      if (format === 'jpg') format = 'jpeg';
      
      // Build the URL directly
      return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jq3x5bz4'}/production/${id}-${dimensions}.${format}`;
    } else if (source.asset._id) {
      // For direct image IDs
      const id = source.asset._id.replace('image-', '');
      const [base, dimensions, extension] = id.split('-');
      let format = extension;
      if (format === 'jpg') format = 'jpeg';
      
      return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jq3x5bz4'}/production/${base}-${dimensions}.${format}`;
    }
    
    // Fallback to placeholder
    return '/images/placeholder.jpg';
  } catch (error) {
    console.error('Error formatting image URL:', error);
    return '/images/placeholder.jpg';
  }
};