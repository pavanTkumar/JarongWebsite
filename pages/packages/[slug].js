import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { client } from '../../lib/sanity';
import Link from 'next/link';
import { getSanityImageUrl, getGalleryImageUrls } from '../../lib/imageUtils';

export default function PackageDetail({ packageData, similarPackages }) {
  const [formData, setFormData] = useState({
    formType: 'package',
    name: '',
    email: '',
    phone: '',
    travelers: '',
    travelDate: '',
    needTransportation: false,
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Add some debug logs
  useEffect(() => {
    console.log('Package data loaded:', packageData ? packageData.title : 'None');
    console.log('Similar packages loaded:', similarPackages?.length || 0);
  }, [packageData, similarPackages]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      // Add package info to the form data
      const bookingData = {
        ...formData,
        packageTitle: packageData.title,
        packageId: packageData._id,
        packagePrice: packageData.price,
      };
      
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          formType: 'package',
          name: '',
          email: '',
          phone: '',
          travelers: '',
          travelDate: '',
          needTransportation: false,
          message: ''
        });
      } else {
        setError(data.message || 'There was an error submitting your booking request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setError('There was an error submitting your booking request. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  if (!packageData) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Package not found</h1>
        <p className="text-gray-600 mb-8">The travel package you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/packages"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Browse All Packages
        </Link>
      </div>
    );
  }

  // Prepare image URLs
  const mainImage = packageData.mainImage ? getSanityImageUrl(packageData.mainImage) : '/images/placeholder.jpg';
  const galleryImages = packageData.galleryImages ? getGalleryImageUrls(packageData.galleryImages) : [];

  return (
    <>
      <Head>
        <title>{packageData.title} | JarongMedia</title>
        <meta name="description" content={packageData.description} />
      </Head>

      {/* Hero Section with Package Image */}
      <section className="relative pt-24 pb-16 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${mainImage})` }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {packageData.title}
            </h1>
            <div className="flex items-center text-white/90 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{packageData.location}</span>
            </div>
            <p className="text-xl text-white/90 mb-8">
              {packageData.description}
            </p>
            <div className="flex space-x-4 text-white">
              <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-lg">
                <span className="block text-white/70 text-sm">Duration</span>
                <span className="font-semibold">{packageData.duration}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-lg">
                <span className="block text-white/70 text-sm">Price</span>
                <span className="font-semibold">${packageData.price}</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm py-2 px-4 rounded-lg">
                <span className="block text-white/70 text-sm">Rating</span>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-amber-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-semibold">{packageData.rating || '4.5'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Details */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden h-48">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${image})` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {packageData.itinerary && packageData.itinerary.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Itinerary</h2>
                  <div className="space-y-6">
                    {packageData.itinerary.map((day, index) => (
                      <div key={index} className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{day.day}: {day.title}</h3>
                        <p className="text-gray-600">{day.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions & Exclusions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* Inclusions */}
                {packageData.inclusions && packageData.inclusions.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Inclusions</h2>
                    <ul className="space-y-2">
                      {packageData.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 mt-1 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Exclusions */}
                {packageData.exclusions && packageData.exclusions.length > 0 && (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Exclusions</h2>
                    <ul className="space-y-2">
                      {packageData.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <svg className="w-5 h-5 mt-1 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Booking Form */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-6 rounded-xl shadow-lg sticky top-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Book This Package</h2>
                {isSubmitted ? (
                  <div className="bg-green-50 p-6 rounded-xl text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
                    <p className="text-gray-600 mb-4">
                      Thank you for your interest in this package. We'll contact you shortly to confirm availability and details.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Make Another Booking
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                        {error}
                      </div>
                    )}
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Your Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Number of Travelers <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select</option>
                        <option value="1">1 Person</option>
                        <option value="2">2 People</option>
                        <option value="3">3 People</option>
                        <option value="4">4 People</option>
                        <option value="5+">5+ People</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Travel Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="needTransportation"
                          checked={formData.needTransportation}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-blue-500 rounded"
                        />
                        <span className="text-gray-700">I need transportation assistance</span>
                      </label>
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Special Requests
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                        placeholder="Any special requests or questions..."
                      ></textarea>
                    </div>
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                      >
                        {isSubmitting ? 'Processing...' : 'Request Booking'}
                      </button>
                    </div>
                  </form>
                )}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-gray-600 mb-4">Contact us for any questions about this package</p>
                  <a 
                    href="tel:+1234567890"
                    className="flex items-center text-blue-600 font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +1 (234) 567-8900
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Similar Packages</h2>
          
          {similarPackages && similarPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarPackages.map((pkg, index) => (
                <motion.div
                  key={pkg._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${pkg.mainImage ? getSanityImageUrl(pkg.mainImage) : '/images/placeholder.jpg'})` }}
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

                    <p className="text-gray-600 mb-4 line-clamp-2">{pkg.description}</p>

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
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-8">No similar packages found at the moment.</p>
            </div>
          )}
          
          <div className="text-center mt-8">
            <Link 
              href="/packages"
              className="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 mt-4"
            >
              View All Travel Packages
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  try {
    console.log('Fetching package with slug:', params.slug);
    
    // Fetch the specific package data
    const packageData = await client.fetch(`
      *[_type == "travelPackage" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        mainImage,
        galleryImages,
        description,
        price,
        duration,
        location,
        inclusions,
        exclusions,
        itinerary,
        rating
      }
    `, { slug: params.slug });

    if (!packageData) {
      console.log('No package found with slug:', params.slug);
      return {
        notFound: true
      };
    }

    console.log('Found package:', packageData.title);

    // Fetch similar packages
    // Get packages with the same location or similar price range
    const similarPackages = await client.fetch(`
      *[_type == "travelPackage" && slug.current != $slug && (
        location match $location || 
        (price >= $minPrice && price <= $maxPrice)
      )] | order(rating desc)[0...3] {
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
    `, { 
      slug: params.slug,
      location: `*${packageData.location}*`,
      minPrice: packageData.price * 0.7, // 30% cheaper
      maxPrice: packageData.price * 1.3, // 30% more expensive
    });

    console.log('Found similar packages:', similarPackages?.length || 0);

    return {
      props: {
        packageData,
        similarPackages: similarPackages || []
      },
      revalidate: 600 // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error('Error fetching package data:', error);
    
    return {
      notFound: true
    };
  }
}

export async function getStaticPaths() {
  try {
    // Get all package slugs
    const packages = await client.fetch(`
      *[_type == "travelPackage"] {
        "slug": slug.current
      }
    `);

    const paths = packages.map((pkg) => ({
      params: { slug: pkg.slug }
    }));

    console.log('Generated paths for packages:', paths.length);

    return {
      paths,
      fallback: 'blocking' // Show a loading state
    };
  } catch (error) {
    console.error('Error fetching package slugs:', error);
    
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}