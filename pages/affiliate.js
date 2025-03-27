// pages/affiliate.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { client } from '../lib/sanity';
import { getSanityImageUrl } from '../lib/imageUtils';

export default function Affiliate({ affiliateProducts }) {
  const [debugMode, setDebugMode] = useState(false);
  
  useEffect(() => {
    // Log the data on client for debugging
    console.log('Affiliate products loaded:', affiliateProducts?.length || 0);
  }, [affiliateProducts]);
  
  // Categories for filtering
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'insurance', name: 'Travel Insurance' },
    { id: 'gear', name: 'Travel Gear' },
    { id: 'accommodation', name: 'Accommodation' },
    { id: 'transportation', name: 'Transportation' },
    { id: 'other', name: 'Other' }
  ];

  const [activeCategory, setActiveCategory] = useState('all');

  // Filter products based on selected category
  const filteredProducts = activeCategory === 'all'
    ? affiliateProducts
    : affiliateProducts.filter(product => product.category === activeCategory);

  // Properly process the product image
  const processProductImage = (product) => {
    // For debugging
    if (debugMode) {
      console.log('Processing image for product:', product.title, product.image);
    }
    
    // Check if image is already a string URL
    if (typeof product.image === 'string') {
      return product.image;
    }
    
    // Check if we have a valid image object from Sanity
    if (product.image && product.image.asset) {
      try {
        return getSanityImageUrl(product.image);
      } catch (error) {
        console.error('Error generating image URL for product:', product.title, error);
        return '/images/placeholder.jpg';
      }
    }
    
    // Fallback to placeholder
    return '/images/placeholder.jpg';
  };

  return (
    <>
      <Head>
        <title>Travel Partner Products | JarongMedia</title>
        <meta name="description" content="Discover our trusted travel partners and exclusive deals on essential travel services and products." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-cover bg-center bg-[url('/images/affiliate/affiliate-hero.jpg')]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Travel Partner Products
            </h1>
            <p className="text-xl text-white/90 mb-8">
              We've partnered with trusted travel brands to bring you exclusive deals on essential travel services and products
            </p>
          </div>
        </div>
      </section>

      {/* Debug Controls - only in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-yellow-50 p-4 border-b border-yellow-200">
          <div className="container mx-auto px-6 flex items-center justify-between">
            <span className="text-yellow-700">Developer Mode</span>
            <button 
              onClick={() => setDebugMode(!debugMode)}
              className="px-4 py-1 bg-yellow-200 hover:bg-yellow-300 text-yellow-800 rounded-md text-sm"
            >
              {debugMode ? 'Disable Debug' : 'Enable Debug'}
            </button>
          </div>
        </div>
      )}

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                // Debug info in console
                if (debugMode) {
                  console.log(`Processing product ${index}:`, product);
                }
                
                const imageUrl = processProductImage(product);
                
                if (debugMode) {
                  console.log(`Generated image URL for ${product.title}:`, imageUrl);
                }
                
                return (
                  <motion.div
                    key={product._id || index}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <div 
                        className="w-full h-56 bg-cover bg-center"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      ></div>
                      {product.discount && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-full font-semibold">
                          {product.discount}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{product.rating || '4.5'}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{product.description}</p>
                      
                      <a 
                        href={product.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-3 rounded-md transition-colors"
                      >
                        View Deal
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Please try a different category or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-blue-50 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Become an Affiliate Partner</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our affiliate program to promote your travel-related products or services to our audience. 
                Get access to our growing customer base and increase your sales.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 text-2xl font-bold mb-2">1</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Up</h3>
                <p className="text-gray-600">Complete our simple application form to join the affiliate program</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 text-2xl font-bold mb-2">2</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Get Approved</h3>
                <p className="text-gray-600">Our team will review your application and provide quick approval</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 text-2xl font-bold mb-2">3</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Start Earning</h3>
                <p className="text-gray-600">Begin promoting your products and earning commissions</p>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/contact"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all inline-block"
              >
                Apply to Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  // Fetch affiliate products from Sanity
  try {
    console.log('Starting to fetch affiliate products...');
    
    // Get the query start time
    const startTime = Date.now();
    
    const affiliateProducts = await client.fetch(`
      *[_type == "affiliateProduct"] | order(publishedAt desc) {
        _id,
        title,
        description,
        image,
        category,
        url,
        rating,
        discount,
        featured
      }
    `);
    
    // Calculate query duration
    const queryDuration = Date.now() - startTime;
    console.log(`Fetched ${affiliateProducts?.length || 0} affiliate products in ${queryDuration}ms`);
    
    // Debug the first product's image if available
    if (affiliateProducts && affiliateProducts.length > 0) {
      const firstProduct = affiliateProducts[0];
      console.log(`First product (${firstProduct.title}) image:`, 
        JSON.stringify(firstProduct.image || 'No image data')
      );
      
      // Log all product titles for debugging
      console.log('All product titles:', 
        affiliateProducts.map(p => p.title).join(', ')
      );
    }

    // Add some placeholder data if no products found
    const productsToReturn = affiliateProducts?.length > 0 ? affiliateProducts : [
      {
        _id: 'placeholder-1',
        title: 'Travel Insurance',
        description: 'Comprehensive travel insurance for your peace of mind. Coverage includes trip cancellation, medical emergencies, lost baggage, and more.',
        image: '/images/placeholder.jpg',
        category: 'insurance',
        url: '#',
        rating: 4.9,
        discount: '15% OFF'
      },
      {
        _id: 'placeholder-2',
        title: 'Travel Backpack',
        description: 'Durable, water-resistant backpack perfect for all your travel adventures. Multiple compartments and comfortable straps.',
        image: '/images/placeholder.jpg',
        category: 'gear',
        url: '#',
        rating: 4.8
      },
      {
        _id: 'placeholder-3',
        title: 'Hotel Discount',
        description: 'Special rates at partner hotels across Africa. Book through us and save up to 20% off regular rates.',
        image: '/images/placeholder.jpg',
        category: 'accommodation',
        url: '#',
        rating: 4.7,
        discount: '20% OFF'
      }
    ];

    return {
      props: {
        affiliateProducts: productsToReturn
      },
      revalidate: 600 // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error('Error fetching affiliate products:', error);
    
    // Return placeholders on error
    return {
      props: {
        affiliateProducts: [
          {
            _id: 'placeholder-1',
            title: 'Travel Insurance',
            description: 'Comprehensive travel insurance for your peace of mind. Coverage includes trip cancellation, medical emergencies, lost baggage, and more.',
            image: '/images/placeholder.jpg',
            category: 'insurance',
            url: '#',
            rating: 4.9,
            discount: '15% OFF'
          },
          {
            _id: 'placeholder-2',
            title: 'Travel Backpack',
            description: 'Durable, water-resistant backpack perfect for all your travel adventures. Multiple compartments and comfortable straps.',
            image: '/images/placeholder.jpg',
            category: 'gear',
            url: '#',
            rating: 4.8
          },
          {
            _id: 'placeholder-3',
            title: 'Hotel Discount',
            description: 'Special rates at partner hotels across Africa. Book through us and save up to 20% off regular rates.',
            image: '/images/placeholder.jpg',
            category: 'accommodation',
            url: '#',
            rating: 4.7,
            discount: '20% OFF'
          }
        ],
        errorFetchingProducts: true
      },
      revalidate: 300 // Revalidate sooner on error
    };
  }
}

  return (
    <>
      <Head>
        <title>Travel Partner Products | JarongMedia</title>
        <meta name="description" content="Discover our trusted travel partners and exclusive deals on essential travel services and products." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-cover bg-center bg-[url('/images/affiliate/affiliate-hero.jpg')]"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Travel Partner Products
            </h1>
            <p className="text-xl text-white/90 mb-8">
              We've partnered with trusted travel brands to bring you exclusive deals on essential travel services and products
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => {
                const imageUrl = processProductImage(product);
                
                return (
                  <motion.div
                    key={product._id || index}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="relative">
                      <div 
                        className="w-full h-56 bg-cover bg-center"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                      ></div>
                      {product.discount && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white py-1 px-3 rounded-full font-semibold">
                          {product.discount}
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h2 className="text-xl font-bold text-gray-900">{product.title}</h2>
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span>{product.rating || '4.5'}</span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6">{product.description}</p>
                      
                      <a 
                        href={product.url || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center py-3 rounded-md transition-colors"
                      >
                        View Deal
                      </a>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Please try a different category or check back later.</p>
            </div>
          )}
        </div>
      </section>

      {/* Become a Partner */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-blue-50 rounded-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Become an Affiliate Partner</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join our affiliate program to promote your travel-related products or services to our audience. 
                Get access to our growing customer base and increase your sales.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 text-2xl font-bold mb-2">1</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Sign Up</h3>
                <p className="text-gray-600">Complete our simple application form to join the affiliate program</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 text-2xl font-bold mb-2">2</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Get Approved</h3>
                <p className="text-gray-600">Our team will review your application and provide quick approval</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="text-blue-600 text-2xl font-bold mb-2">3</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Start Earning</h3>
                <p className="text-gray-600">Begin promoting your products and earning commissions</p>
              </div>
            </div>
            
            <div className="text-center">
              <Link 
                href="/contact"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all inline-block"
              >
                Apply to Become a Partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  // Fetch affiliate products from Sanity
  try {
    console.log('Starting to fetch affiliate products...');
    
    const affiliateProducts = await client.fetch(`
      *[_type == "affiliateProduct"] | order(publishedAt desc) {
        _id,
        title,
        description,
        image,
        category,
        url,
        rating,
        discount,
        featured
      }
    `);

    console.log('Fetched affiliate products:', affiliateProducts?.length || 0);
    
    // Debug the first product's image if available
    if (affiliateProducts && affiliateProducts.length > 0) {
      console.log('First product title:', affiliateProducts[0].title);
      console.log('First product image structure:', 
        JSON.stringify(affiliateProducts[0].image, null, 2)
      );
    }

    return {
      props: {
        affiliateProducts: affiliateProducts || []
      },
      revalidate: 600 // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error('Error fetching affiliate products:', error);
    
    // Return empty array with error tracking
    return {
      props: {
        affiliateProducts: [],
        errorFetchingProducts: true
      },
      revalidate: 300 // Revalidate sooner on error
    };
  }
}