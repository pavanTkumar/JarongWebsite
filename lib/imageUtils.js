// lib/imageUtils.js
/**
 * Enhanced image utilities for working with Sanity images
 */

/**
 * Generate a complete Sanity image URL from a Sanity image reference
 * @param {Object} source - The Sanity image object
 * @param {Object} options - Optional parameters (width, height, etc)
 * @returns {string} The complete image URL
 */
export function getSanityImageUrl(source, options = {}) {
    // Return default image if source is missing
    if (!source || !source.asset) {
      return '/images/placeholder.jpg';
    }
  
    try {
      // Handle both reference formats: _ref string or direct asset object
      const ref = source.asset._ref || source.asset._id || '';
      
      // Extract parts from reference
      const [_file, id, dimensions, extension] = ref.split('-');
      
      // Handle file extension
      let format = extension;
      if (format === 'jpg') format = 'jpeg';
      
      // Get project ID from environment or default
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jq3x5bz4';
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
      
      // Base URL
      let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
      
      // Apply transformations if options are provided
      const params = [];
      
      if (options.width) params.push(`w=${options.width}`);
      if (options.height) params.push(`h=${options.height}`);
      if (options.quality) params.push(`q=${options.quality}`);
      if (options.fit) params.push(`fit=${options.fit}`);
      
      // Append parameters if any exist
      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      
      return url;
    } catch (error) {
      console.error('Error formatting Sanity image URL:', error);
      return '/images/placeholder.jpg';
    }
  }
  
  /**
   * Enhanced function to safely get image URLs for gallery images
   * @param {Array} imageArray - Array of Sanity image objects
   * @returns {Array} Array of image URLs
   */
  export function getGalleryImageUrls(imageArray) {
    if (!imageArray || !Array.isArray(imageArray) || imageArray.length === 0) {
      return [
        '/images/placeholder.jpg',
        '/images/placeholder.jpg',
        '/images/placeholder.jpg',
      ];
    }
    
    return imageArray.map(img => getSanityImageUrl(img));
  }
  
  /**
   * Helper to get a fallback image if the Sanity image is missing
   * @param {Object} image - Sanity image object
   * @param {string} fallbackPath - Path to fallback image
   * @returns {string} Image URL
   */
  export function getImageWithFallback(image, fallbackPath = '/images/placeholder.jpg') {
    if (!image || !image.asset) {
      return fallbackPath;
    }
    
    return getSanityImageUrl(image);
  }