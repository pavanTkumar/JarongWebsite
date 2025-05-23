// pages/gambia-apartment.js
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { client } from '../lib/sanity';
import { getSanityImageUrl, getGalleryImageUrls } from '../lib/imageUtils';
import { processAmenities } from '../lib/amenityUtils';

export default function GambiaApartment({ apartments }) {
  const [selectedApartment, setSelectedApartment] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    console.log("Apartments data in component:", apartments);
  }, [apartments]);
  
  // Reset selected image when switching apartments
  useEffect(() => {
    setSelectedImage(0);
  }, [selectedApartment]);
  
  // For debugging
  if (!apartments || apartments.length === 0) {
    console.error("No apartments data available");
  }
  
  // Get the currently selected apartment
  const currentApartment = apartments?.[selectedApartment] || {};
  
  // Prepare amenities using our utility function
  const amenities = processAmenities(currentApartment?.amenities);
  
  // Properly handle images from Sanity with appropriate fallbacks
  const mainImage = currentApartment?.mainImage 
    ? getSanityImageUrl(currentApartment.mainImage) 
    : '/images/placeholder.jpg';
  
  // Process gallery images from Sanity
  let galleryImages = [];
  
  if (currentApartment?.galleryImages && currentApartment.galleryImages.length > 0) {
    // Use actual gallery images from Sanity
    galleryImages = getGalleryImageUrls(currentApartment.galleryImages);
    if (galleryImages.length === 0) {
      galleryImages = [mainImage]; // Fall back to main image if gallery processing failed
    }
  } else if (currentApartment?.mainImage) {
    // If no gallery but has main image, use that
    galleryImages = [mainImage];
  } else {
    // Only use placeholder as absolute last resort
    galleryImages = ['/images/placeholder.jpg'];
  }

  // Handle booking form
  const [formData, setFormData] = useState({
    formType: 'apartment', // Add form type for routing
    name: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    guests: '',
    message: '',
    needCab: false,
    pickupLocation: '',
    cabDate: '',
    pickupDateTime: '',
    transportNotes: '',
    bookingType: 'apartment',
    apartmentId: currentApartment?._id || '',
    apartmentTitle: currentApartment?.title || 'Gambia Apartment'
  });
  
  // Update form apartment reference when selected apartment changes
  useEffect(() => {
    if (currentApartment) {
      setFormData(prev => ({
        ...prev,
        apartmentId: currentApartment._id || '',
        apartmentTitle: currentApartment.title || 'Gambia Apartment'
      }));
    }
  }, [currentApartment]);

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
      // Use our centralized form handler
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          formType: 'apartment',
          name: '',
          email: '',
          phone: '',
          checkIn: '',
          checkOut: '',
          guests: '',
          message: '',
          needCab: false,
          pickupLocation: '',
          cabDate: '',
          pickupDateTime: '',
          transportNotes: '',
          bookingType: 'apartment',
          apartmentId: currentApartment?._id || '',
          apartmentTitle: currentApartment?.title || 'Gambia Apartment'
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

  // Get apartment details and use appropriate defaults if not available
  const apartmentTitle = currentApartment?.title || 'Luxury Apartment in Gambia';
  const apartmentDescription = currentApartment?.description || 
    'Experience the beauty and tranquility of Gambia from our exclusive private apartment with modern amenities and convenient access to local attractions.';
  const bedroomCount = currentApartment?.bedrooms || 3;
  const bathroomCount = currentApartment?.bathrooms || 2;
  const guestCount = currentApartment?.maxGuests || 6;
  const pricePerNight = currentApartment?.pricePerNight || 150;
  const location = currentApartment?.location?.city || 'Gambia';

  return (
    <>
      <Head>
        <title>{apartmentTitle} | JarongMedia</title>
        <meta name="description" content={apartmentDescription} />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${mainImage})` }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {apartmentTitle}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {apartmentDescription}
            </p>
            <Link 
              href="#booking"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all transform hover:scale-105 inline-block"
            >
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>
      
      {/* Apartment Selector - Only show if multiple apartments */}
      {apartments && apartments.length > 1 && (
        <section className="py-8 bg-white shadow-md sticky top-0 z-30">
          <div className="container mx-auto px-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Our Gambia Apartments</h2>
            <div className="flex flex-wrap gap-4">
              {apartments.map((apt, index) => (
                <button
                  key={apt._id || index}
                  onClick={() => setSelectedApartment(index)}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    selectedApartment === index
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {apt.title || `Apartment ${index + 1}`}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Apartment Gallery</h2>
            <p className="text-gray-600">Browse through images of our beautiful {location} apartment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main large image */}
            <div className="rounded-xl overflow-hidden h-[400px] shadow-lg">
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-500"
                style={{ backgroundImage: `url(${galleryImages[selectedImage]})` }}
              ></div>
            </div>
            
            {/* Thumbnails and description */}
            <div className="space-y-6">
              <div className="grid grid-cols-5 gap-2">
                {galleryImages.map((image, index) => (
                  <div 
                    key={index}
                    className={`cursor-pointer rounded-lg overflow-hidden h-20 ${selectedImage === index ? 'ring-2 ring-amber-500' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <div 
                      className="w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${image})` }}
                    ></div>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">About This Property</h3>
                <p className="text-gray-600 mb-4">
                  {apartmentDescription}
                </p>
                <p className="text-gray-600 mb-4">
                  The apartment features {bedroomCount} bedrooms, {bathroomCount} bathrooms, 
                  {currentApartment?.amenities?.includes('Fully Equipped Kitchen') || currentApartment?.amenities?.includes('Kitchen') ? 
                    ' a fully equipped kitchen, ' : ' '} 
                  and a spacious living area
                  {currentApartment?.location?.address ? ` located at ${currentApartment.location.address}` : ''}.
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-amber-500 font-bold text-3xl">${pricePerNight}</div>
                  <div className="text-gray-600">per night</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Apartment Amenities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our {location} apartment comes fully equipped with everything you need for a comfortable and luxurious stay
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <span className="text-3xl mr-4">{amenity.icon}</span>
                <span className="text-gray-800">{amenity.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Excellent Location</h2>
              <p className="text-gray-600 mb-4">
                {currentApartment?.location?.description || 
                 `Our apartment is ideally situated in ${location}, 
                  offering both privacy and convenient access to local attractions.`}
              </p>
              <ul className="space-y-3 mb-6">
                {(currentApartment?.location?.highlights || [
                  '5 minutes walk to the beach',
                  '15 minutes to local markets and restaurants',
                  '30 minutes from Banjul International Airport',
                  'Close to wildlife reserves and cultural sites'
                ]).map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="w-5 h-5 mt-1 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
              <Link 
                href="#booking"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all inline-block"
              >
                Check Availability
              </Link>
            </div>
            <div className="w-full md:w-1/2 rounded-xl overflow-hidden h-[400px] shadow-lg relative">
              {/* Map image or interactive map */}
              {currentApartment?.location?.mapCoordinates ? (
                <iframe 
                  src={`https://maps.google.com/maps?q=${currentApartment.location.mapCoordinates}&z=15&output=embed`} 
                  width="100%" 
                  height="100%" 
                  frameBorder="0" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  aria-hidden="false" 
                  tabIndex="0"
                ></iframe>
              ) : (
                <div className="relative w-full h-full">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${mainImage})` }}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{currentApartment?.location?.address || `${location}, Gambia`}</h3>
                      <p className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {currentApartment?.location?.city || location}, {currentApartment?.location?.country || 'Gambia'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section id="booking" className="py-16 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Book Your Stay</h2>
              
              {isSubmitted ? (
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your interest in our {location} apartment. We've received your booking request and will get back to you shortly to confirm availability.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        placeholder="Harry"
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
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="+1 123-456-7890"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Check-in Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Check-out Date <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-2">
                        Number of Guests <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option value="">Select</option>
                        {[...Array(guestCount)].map((_, i) => (
                          <option key={i+1} value={i+1}>
                            {i+1} {i === 0 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="needCab"
                        checked={formData.needCab}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-amber-500 rounded"
                      />
                      <span className="text-gray-700">I need airport/transportation assistance</span>
                    </label>
                  </div>

                  {formData.needCab && (
                    <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Transportation Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Pickup Location
                          </label>
                          <input
                            type="text"
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Banjul International Airport"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Pickup Date
                          </label>
                          <input
                            type="date"
                            name="cabDate"
                            value={formData.cabDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Additional Transportation Notes
                        </label>
                        <textarea
                          name="transportNotes"
                          value={formData.transportNotes}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                          placeholder="Flight number, number of luggage items, etc."
                        ></textarea>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Special Requests or Questions
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      placeholder="Any special requests or questions..."
                    ></textarea>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all transform hover:scale-105 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Booking Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  try {
    // Log the beginning of the fetch process
    console.log('Starting to fetch apartment data from Sanity...');
    
    // Fetch all apartments with "Gambia" in the location
    const apartments = await client.fetch(`
      *[_type == "apartment" && location.country match "Gambia"] | order(featured desc) {
        _id,
        title,
        slug,
        description,
        mainImage,
        galleryImages,
        pricePerNight,
        pricePerWeek,
        pricePerMonth,
        bedrooms,
        bathrooms,
        maxGuests,
        amenities,
        location,
        houseRules,
        featured
      }
    `);
    
    console.log('Gambia apartments query completed, found:', apartments?.length);
    
    // If no apartments are found, use fallback data
    if (!apartments || apartments.length === 0) {
      console.log('No Gambia apartments found, using fallback data');
      
      // Create fallback data for a single apartment
      const fallbackApartment = {
        title: "Luxury Apartment in Gambia",
        description: "Experience the beauty of Gambia from our exclusive private apartment with stunning views and modern amenities. Perfect for vacations with family or friends.",
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 6,
        pricePerNight: 150,
        amenities: [
          "Free WiFi", 
          "Swimming Pool", 
          "Air Conditioning", 
          "Full Kitchen", 
          "Washing Machine", 
          "Smart TV", 
          "Balcony"
        ],
        location: {
          address: "Central Location, Banjul",
          city: "Banjul",
          country: "Gambia",
          highlights: [
            "5 minutes walk to attractions",
            "15 minutes to local markets and restaurants",
            "30 minutes from Banjul International Airport",
            "Close to wildlife reserves and cultural sites"
          ]
        }
      };
      
      // Return the fallback data as an array with one item
      return {
        props: {
          apartments: [fallbackApartment]
        },
        revalidate: 600
      };
    }
    
    // Return the list of apartments
    return {
      props: {
        apartments
      },
      revalidate: 600 // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error('Error fetching apartment data:', error);
    
    // Return fallback data in case of error
    return {
      props: {
        apartments: [{
          title: "Luxury Apartment in Gambia",
          description: "Experience the beauty of Gambia from our exclusive private apartment with stunning views and modern amenities. Perfect for vacations with family or friends.",
          bedrooms: 3,
          bathrooms: 2,
          maxGuests: 6,
          pricePerNight: 150,
          amenities: [
            "Free WiFi", 
            "Swimming Pool", 
            "Air Conditioning", 
            "Full Kitchen", 
            "Washing Machine", 
            "Smart TV", 
            "Balcony"
          ],
          location: {
            address: "Central Location, Banjul",
            city: "Banjul",
            country: "Gambia",
            highlights: [
              "5 minutes walk to attractions",
              "15 minutes to local markets and restaurants",
              "30 minutes from Banjul International Airport",
              "Close to wildlife reserves and cultural sites"
            ]
          }
        }]
      },
      revalidate: 600
    };
  }
}