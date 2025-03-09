import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2021-06-07',
  useCdn: process.env.NODE_ENV === 'production',
})

// Simple URL function that returns a string directly
export const urlFor = (source) => {
  if (!source || !source.asset) {
    return '/images/placeholder.jpg';
  }
  
  try {
    // Parse the asset reference
    const ref = source.asset._ref || '';
    const [, id, dimensions, extension] = ref.split('-');
    
    // Handle different extensions
    let format = extension;
    if (format === 'jpg') format = 'jpeg';
    
    // Build the URL directly
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/production/${id}-${dimensions}.${format}`;
  } catch (error) {
    console.error('Error formatting image URL:', error);
    return '/images/placeholder.jpg';
  }
}