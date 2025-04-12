// context/SocialMediaContext.js
import { createContext, useContext, useState } from 'react';

// Create context
const SocialMediaContext = createContext([]);

// Social media provider component
export function SocialMediaProvider({ children, initialSocialLinks = [] }) {
  const [socialLinks, setSocialLinks] = useState(initialSocialLinks);

  return (
    <SocialMediaContext.Provider value={socialLinks}>
      {children}
    </SocialMediaContext.Provider>
  );
}

// Custom hook for using social media links
export function useSocialMedia() {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    console.warn('useSocialMedia must be used within a SocialMediaProvider');
    return [];
  }
  return context;
}