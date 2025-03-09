import Head from 'next/head';
import { motion } from 'framer-motion';
import { client, urlFor } from '../../lib/sanity';
import Link from 'next/link';

export default function PackageDetail({ packageData }) {
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
            style={{ backgroundImage: `url(${packageData.mainImage ? urlFor(packageData.mainImage) : '/images/placeholder.jpg'})` }}
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
              {packageData.galleryImages && packageData.galleryImages.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {packageData.galleryImages.map((image, index) => (
                      <div key={index} className="rounded-lg overflow-hidden h-48">
                        <div 
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${urlFor(image)})` }}
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
                <form className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 234 567 8900"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Number of Travelers
                    </label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      Travel Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox h-5 w-5 text-blue-500 rounded"
                      />
                      <span className="text-gray-700">I need transportation assistance</span>
                    </label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                    >
                      Request Booking
                    </button>
                  </div>
                </form>
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
          
          {/* Add similar packages here - These would be fetched from Sanity in the getStaticProps function */}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
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
    return {
      notFound: true
    };
  }

  return {
    props: {
      packageData
    },
    revalidate: 600 // Revalidate every 10 minutes
  };
}

export async function getStaticPaths() {
  // Get all package slugs
  const packages = await client.fetch(`
    *[_type == "travelPackage"] {
      "slug": slug.current
    }
  `);

  const paths = packages.map((pkg) => ({
    params: { slug: pkg.slug }
  }));

  return {
    paths,
    fallback: 'blocking' // Show a loading state
  };
}