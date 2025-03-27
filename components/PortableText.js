// components/PortableText.js
import { PortableText as SanityPortableText } from '@portabletext/react';
import { getSanityImageUrl } from '../lib/imageUtils';

const PortableTextComponent = ({ content }) => {
  if (!content) {
    return null;
  }

  // Define components for portable text
  const components = {
    types: {
      image: ({ value }) => {
        if (!value?.asset) {
          return null;
        }
        
        return (
          <div className="my-8 rounded-lg overflow-hidden">
            <img
              src={getSanityImageUrl(value)}
              alt={value.alt || 'Blog image'}
              className="w-full h-auto"
              loading="lazy"
            />
            {value.caption && (
              <p className="text-sm text-gray-600 italic text-center mt-2">{value.caption}</p>
            )}
          </div>
        );
      },
      callout: ({ value }) => {
        const bgColors = {
          info: 'bg-blue-50 border-blue-200 text-blue-800',
          warning: 'bg-amber-50 border-amber-200 text-amber-800',
          error: 'bg-red-50 border-red-200 text-red-800',
          success: 'bg-green-50 border-green-200 text-green-800',
          default: 'bg-gray-50 border-gray-200 text-gray-800'
        };
        
        const bgColor = bgColors[value.tone] || bgColors.default;
        
        return (
          <div className={`p-4 my-6 rounded-lg border ${bgColor}`}>
            {value.icon && <span className="text-2xl mr-2">{value.icon}</span>}
            <div>
              {value.title && <h4 className="font-bold mb-2">{value.title}</h4>}
              <div className="prose prose-sm">
                <SanityPortableText value={value.content} />
              </div>
            </div>
          </div>
        );
      }
    },
    marks: {
      link: ({ children, value }) => {
        const rel = value.href.startsWith('/') 
          ? undefined 
          : 'noreferrer noopener';
          
        return (
          <a
            href={value.href}
            target={value.blank ? '_blank' : undefined}
            rel={rel}
            className="text-blue-600 hover:underline"
          >
            {children}
          </a>
        );
      },
      internalLink: ({ children, value }) => {
        return (
          <a 
            href={`/${value.reference}`} 
            className="text-blue-600 hover:underline"
          >
            {children}
          </a>
        );
      },
      highlight: ({ children }) => (
        <span className="bg-yellow-100 px-1 rounded">{children}</span>
      )
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>
      ),
      normal: ({ children }) => (
        <p className="my-4 text-gray-800 leading-relaxed">{children}</p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-200 pl-4 py-2 my-6 text-gray-700 italic">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="text-gray-800">{children}</li>
      ),
      number: ({ children }) => (
        <li className="text-gray-800">{children}</li>
      ),
    },
  };

  return <SanityPortableText value={content} components={components} />;
};

export default PortableTextComponent;