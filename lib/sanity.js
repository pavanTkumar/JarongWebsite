// lib/sanity.js
import { createClient } from 'next-sanity';

// Initialize the Sanity client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jq3x5bz4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2023-05-03',
  useCdn: process.env.NODE_ENV === 'production',
});

/**
 * Build image URL from Sanity image reference
 * @param {Object} source - Sanity image object
 * @returns {String} - Constructed URL
 */
export function urlFor(source) {
  if (!source || !source.asset) {
    console.warn('Invalid image source:', source);
    return '/images/placeholder.jpg';
  }
  
  try {
    // Extract reference parts
    const ref = source.asset._ref || '';
    if (!ref) return '/images/placeholder.jpg';
    
    // Parse reference parts
    const [prefix, id, dimensions, extension] = ref.split('-');
    if (!id || !dimensions) return '/images/placeholder.jpg';
    
    // Format extension
    const format = extension === 'jpg' ? 'jpeg' : (extension || 'jpeg');
    
    // Build URL
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jq3x5bz4';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    
    const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
    
    // For debugging
    console.log('Generated image URL:', url);
    
    return url;
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '/images/placeholder.jpg';
  }
}