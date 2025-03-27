// lib/imageUtils.js
/**
 * Enhanced image utilities for working with Sanity images
 * This provides debug logs to help identify issues with image loading
 */

/**
 * Generate a complete Sanity image URL from a Sanity image reference
 * @param {Object} source - The Sanity image object
 * @param {Object} options - Optional parameters (width, height, etc)
 * @returns {string} The complete image URL
 */
export function getSanityImageUrl(source, options = {}) {
    // For debugging - log what we received
    console.log('Processing image source:', JSON.stringify(source));
  
    // Return default image if source is missing
    if (!source) {
      console.warn('Image source is null or undefined');
      return '/images/placeholder.jpg';
    }
    
    if (!source.asset) {
      console.warn('Image source has no asset property:', source);
      return '/images/placeholder.jpg';
    }
  
    try {
      // Handle both reference formats: _ref string or direct asset object
      let ref = '';
      
      if (typeof source.asset === 'string') {
        // Sometimes the asset might be a direct string reference
        ref = source.asset;
        console.log('Direct string asset reference:', ref);
      } else if (source.asset._ref) {
        ref = source.asset._ref;
        console.log('Asset _ref:', ref);
      } else if (source.asset._id) {
        ref = source.asset._id;
        console.log('Asset _id:', ref);
      } else {
        console.warn('Asset has neither _ref nor _id:', source.asset);
        return '/images/placeholder.jpg';
      }
      
      // Handle direct URL if provided (some Sanity setups might include this)
      if (source.url) {
        console.log('Direct URL found in image source', source.url);
        return source.url;
      }
      
      // Extract parts from reference
      const parts = ref.split('-');
      
      if (parts.length < 3) {
        console.warn('Invalid reference format:', ref);
        return '/images/placeholder.jpg';
      }
      
      // Typical format: image-a1b2c3d4e5f6-800x600-jpg
      let id, dimensions, extension;
      
      if (parts[0] === 'image') {
        id = parts[1];
        dimensions = parts[2];
        extension = parts[3] || 'jpg'; // Default to jpg if missing
      } else {
        // Handle non-standard reference formats
        id = parts[0];
        dimensions = parts[1];
        extension = parts[2] || 'jpg';
      }
      
      console.log('Parsed image parts:', { id, dimensions, extension });
      
      // Handle file extension
      let format = extension;
      if (format === 'jpg') format = 'jpeg';
      
      // Get project ID from environment or default
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jq3x5bz4';
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
      
      // Base URL
      let url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
      console.log('Generated image URL:', url);
      
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
      console.error('Error formatting Sanity image URL:', error, 'Source:', JSON.stringify(source));
      return '/images/placeholder.jpg';
    }
  }
  
  /**
   * Enhanced function to safely get image URLs for gallery images
   * @param {Array} imageArray - Array of Sanity image objects
   * @returns {Array} Array of image URLs
   */
  export function getGalleryImageUrls(imageArray) {
    if (!imageArray) {
      console.warn('Gallery images array is null or undefined');
      return [];
    }
    
    if (!Array.isArray(imageArray)) {
      console.warn('Gallery images is not an array:', typeof imageArray);
      return [];
    }
    
    if (imageArray.length === 0) {
      console.warn('Gallery images array is empty');
      return [];
    }
    
    console.log(`Processing ${imageArray.length} gallery images`);
    
    // Filter out invalid entries first, then process
    return imageArray
      .filter(img => img && (img.asset || typeof img === 'string'))
      .map(img => {
        try {
          return getSanityImageUrl(img);
        } catch (error) {
          console.error('Error processing gallery image:', error);
          return '/images/placeholder.jpg';
        }
      });
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