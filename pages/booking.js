// pages/booking.js
import Head from 'next/head';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Booking() {
  // Form state for flight and hotel bookings
  const [formData, setFormData] = useState({
    formType: 'booking', // Add form type for routing
    bookingType: 'flight',
    name: '',
    email: '',
    phone: '',
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: '',
    hotelLocation: '',
    checkIn: '',
    checkOut: '',
    rooms: '',
    guests: '',
    specialRequests: '',
    needCab: false,
    pickupLocation: '',
    cabDate: '',
    cabTime: '',
    vehicleType: '',
    transportNotes: ''
  });

  // Form submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

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
      // Use the centralized form handler
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
        // Reset the form with only formType and bookingType preserved
        const resetForm = {
          formType: 'booking',
          bookingType: formData.bookingType,
          name: '',
          email: '',
          phone: '',
          from: '',
          to: '',
          departureDate: '',
          returnDate: '',
          passengers: '',
          hotelLocation: '',
          checkIn: '',
          checkOut: '',
          rooms: '',
          guests: '',
          specialRequests: '',
          needCab: false,
          pickupLocation: '',
          cabDate: '',
          cabTime: '',
          vehicleType: '',
          transportNotes: ''
        };
        
        setFormData(resetForm);
        
        // Reset submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError(data.message || 'There was an error submitting your booking request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      setError('There was an error submitting your booking request. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Book Flights & Hotels | JarongMedia</title>
        <meta name="description" content="Book flights and hotels with JarongMedia. We offer competitive prices and personalized service for all your travel needs." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-[url('/images/booking/booking-hero.jpg')] bg-cover bg-center"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Book Flights & Hotels
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Let us handle your travel arrangements with our personalized booking service
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="flex border-b border-gray-200">
              <button
                className={`w-1/2 py-4 text-center font-medium text-lg ${
                  formData.bookingType === 'flight' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, bookingType: 'flight' }))}
              >
                Book a Flight
              </button>
              <button
                className={`w-1/2 py-4 text-center font-medium text-lg ${
                  formData.bookingType === 'hotel' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setFormData(prev => ({ ...prev, bookingType: 'hotel' }))}
              >
                Book a Hotel
              </button>
            </div>
            
            <div className="p-8 md:p-12">
              {isSubmitted ? (
                <div className="bg-green-50 p-6 rounded-xl text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Request Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for your booking request. We've received your information and will contact you shortly to confirm the details and complete your booking.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
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
                  
                  {/* Common Fields */}
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
                        placeholder="Harry@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                      placeholder="+1 123-456-7890"
                    />
                  </div>
                  
                  {/* Flight Booking Fields */}
                  {formData.bookingType === 'flight' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            From <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="from"
                            value={formData.from}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="City or Airport"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            To <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="to"
                            value={formData.to}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            placeholder="City or Airport"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Departure Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="departureDate"
                            value={formData.departureDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Return Date
                          </label>
                          <input
                            type="date"
                            name="returnDate"
                            value={formData.returnDate}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Number of Passengers <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="passengers"
                          value={formData.passengers}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="">Select</option>
                          <option value="1">1 Passenger</option>
                          <option value="2">2 Passengers</option>
                          <option value="3">3 Passengers</option>
                          <option value="4">4 Passengers</option>
                          <option value="5+">5+ Passengers</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {/* Hotel Booking Fields */}
                  {formData.bookingType === 'hotel' && (
                    <>
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Destination/Hotel Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="hotelLocation"
                          value={formData.hotelLocation}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                          placeholder="City or Specific Hotel"
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Number of Rooms <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="rooms"
                            value={formData.rooms}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          >
                            <option value="">Select</option>
                            <option value="1">1 Room</option>
                            <option value="2">2 Rooms</option>
                            <option value="3">3 Rooms</option>
                            <option value="4+">4+ Rooms</option>
                          </select>
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
                            <option value="1">1 Guest</option>
                            <option value="2">2 Guests</option>
                            <option value="3">3 Guests</option>
                            <option value="4">4 Guests</option>
                            <option value="5+">5+ Guests</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {/* Common Bottom Fields */}
                  <div>
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Special Requests or Additional Information
                    </label>
                    <textarea
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      placeholder="Any special requests, preferences, or additional information..."
                    ></textarea>
                  </div>
                  
                  <div className="mt-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="needCab"
                        checked={formData.needCab || false}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-blue-500 rounded"
                      />
                      <span className="text-gray-700">I need airport/local transportation</span>
                    </label>
                  </div>

                  {/* Conditional cab details section */}
                  {formData.needCab && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Transportation Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Pickup Location
                          </label>
                          <input
                            type="text"
                            name="pickupLocation"
                            value={formData.pickupLocation || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Airport, Hotel name"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Destination
                          </label>
                          <input
                            type="text"
                            name="cabDestination"
                            value={formData.cabDestination || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Hotel, Tourist site"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Pickup Date
                          </label>
                          <input
                            type="date"
                            name="cabDate"
                            value={formData.cabDate || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm font-medium mb-2">
                            Pickup Time
                          </label>
                          <input
                            type="time"
                            name="cabTime"
                            value={formData.cabTime || ''}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Vehicle Preference
                        </label>
                        <select
                          name="vehicleType"
                          value={formData.vehicleType || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select Vehicle Type</option>
                          <option value="economy">Economy Car</option>
                          <option value="standard">Standard Car</option>
                          <option value="suv">SUV</option>
                          <option value="van">Van/Minibus</option>
                          <option value="luxury">Luxury Vehicle</option>
                        </select>
                      </div>
                      <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-medium mb-2">
                          Additional Transportation Notes
                        </label>
                        <textarea
                          name="transportNotes"
                          value={formData.transportNotes || ''}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                          placeholder="Flight number, number of passengers, luggage items, etc."
                        ></textarea>
                      </div>
                    </div>
                  )}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all transform hover:scale-105 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Submitting...' : formData.bookingType === 'flight' ? 'Submit Flight Request' : 'Submit Hotel Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Book With JarongMedia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer a personalized booking experience with competitive prices and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="p-6 rounded-xl bg-blue-50 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Best Price Guarantee</h3>
              <p className="text-gray-600">
                We work with a network of suppliers to ensure you get the most competitive prices for flights and hotels.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-xl bg-blue-50 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Personal Travel Consultant</h3>
              <p className="text-gray-600">
                Get a dedicated travel consultant who will handle your booking from start to finish, ensuring all your needs are met.
              </p>
            </motion.div>
            
            <motion.div
              className="p-6 rounded-xl bg-blue-50 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <svg className="w-12 h-12 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Secure Booking Process</h3>
              <p className="text-gray-600">
                Your information is protected with industry-standard security measures, and we handle all booking details with care.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}