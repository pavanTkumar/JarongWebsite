import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { client, urlFor } from '../lib/sanity';

export default function TravelPackages({ packages }) {
  const [filteredPackages, setFilteredPackages] = useState(packages);
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Handle filtering and sorting
  const handleFilter = () => {
    let filtered = [...packages];

    // Filter by destination
    if (destination) {
      filtered = filtered.filter(pkg => 
        pkg.location.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Filter by duration
    if (duration) {
      filtered = filtered.filter(pkg => {
        const days = parseInt(pkg.duration.match(/\d+/)?.[0] || '0');
        if (duration === 'short') return days >= 1 && days <= 5;
        if (duration === 'medium') return days >= 6 && days <= 10;
        if (duration === 'long') return days >= 11;
        return true;
      });
    }

    // Sort results
    if (sortBy) {
      if (sortBy === 'price-low') {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price-high') {
        filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'duration') {
        filtered.sort((a, b) => {
          const daysA = parseInt(a.duration.match(/\d+/)?.[0] || '0');
          const daysB = parseInt(b.duration.match(/\d+/)?.[0] || '0');
          return daysA - daysB;
        });
      } else if (sortBy === 'rating') {
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
    }

    setFilteredPackages(filtered);
  };

  const resetFilters = () => {
    setDestination('');
    setDuration('');
    setSortBy('');
    setFilteredPackages(packages);
  };

  return (
    <>
      <Head>
        <title>Travel Packages | JarongMedia</title>
        <meta name="description" content="Explore our curated travel packages to destinations across Africa and beyond. Find your perfect vacation with JarongMedia." />
      </Head>

      {/* Hero Section */}
      <section className="relative py-24 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-[url('/images/packages-hero.jpg')] bg-cover bg-center"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Discover Our Travel Packages
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Curated experiences to the most breathtaking destinations around the world
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Sort Section */}
      <section className="py-8 bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h2 className="text-xl font-semibold text-gray-800">
                {filteredPackages.length} Travel Packages Available
              </h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <select 
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">All Destinations</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="americas">Americas</option>
                <option value="gambia">Gambia</option>
              </select>
              
              <select 
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="">All Durations</option>
                <option value="short">1-5 Days</option>
                <option value="medium">6-10 Days</option>
                <option value="long">11+ Days</option>
              </select>
              
              <select 
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="duration">Duration</option>
                <option value="rating">Rating</option>
              </select>

              <button 
                onClick={handleFilter}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Apply
              </button>
              
              <button 
                onClick={resetFilters}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg, index) => (
              <motion.div
                key={pkg._id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative h-64 overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ 
                      backgroundImage: pkg.mainImage 
                        ? `url(${urlFor(pkg.mainImage)})`
                        : "url('/images/placeholder.jpg')"
                    }}
                  ></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full text-sm font-medium text-blue-600">
                    {pkg.duration}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{pkg.title}</h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">{pkg.rating || '4.5'}</span>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{pkg.location}</span>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">{pkg.description}</p>

                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500">Starting from</span>
                      <p className="text-xl font-bold text-blue-600">${pkg.price}</p>
                    </div>
                    <Link 
                      href={`/packages/${pkg.slug?.current || pkg._id}`}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredPackages.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No packages found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters or check back later for new offerings.</p>
              <button 
                onClick={resetFilters}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Can't find what you're looking for?
                </h3>
                <p className="text-gray-600">
                  Contact us for a custom travel package tailored to your preferences.
                </p>
              </div>
              <Link 
                href="/contact"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 text-center min-w-[200px]"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  try {
    // Fetch all travel packages from Sanity
    const packages = await client.fetch(`
      *[_type == "travelPackage"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        description,
        price,
        duration,
        location,
        rating
      }
    `);

    return {
      props: {
        packages: packages || []
      },
      revalidate: 600 // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error('Error fetching packages:', error);
    
    return {
      props: {
        packages: []
      },
      revalidate: 600
    };
  }
}