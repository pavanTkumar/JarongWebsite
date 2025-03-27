// lib/sanity.js
// Replace your current sanity.js file with this one

import { createClient } from 'next-sanity'

// Create the client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jq3x5bz4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2021-06-07',
  useCdn: process.env.NODE_ENV === 'production',
})

// Simple, reliable URL builder function for Sanity images
export const urlFor = (source) => {
  if (!source || !source.asset) {
    return '';
  }
  
  try {
    // Get the reference
    const ref = source.asset._ref || '';
    
    // Split reference to get parts
    const [_file, id, dimensions, extension] = ref.split('-');
    
    // Set format
    let format = extension;
    if (format === 'jpg') format = 'jpeg';
    
    // Get project details
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'jq3x5bz4';
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
    
    // Return the full URL
    return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`;
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '';
  }
}