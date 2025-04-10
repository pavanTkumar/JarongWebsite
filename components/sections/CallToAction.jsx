// CallToAction.jsx - Modern Booking CTA
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CallToAction = () => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare form data for API
    const formData = {
      name: "Quick Booking", // Default name for quick bookings
      email: "pending@example.com", // Will be updated later in booking page
      bookingType: 'package',
      specialRequests: `Destination: ${destination}, Travel dates: ${dates}, Travelers: ${travelers}`,
      passengers: travelers || "1" // Default to 1 if not selected
    };
    
    try {
      const response = await fetch('/api/booking', {
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
        setDestination('');
        setDates('');
        setTravelers('');
        
        // Reset the submission status after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        alert('There was an error submitting your booking request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('There was an error submitting your booking request. Please try again.');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/backgrounds/cta-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.4)"
        }}
      ></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-purple-900/60 z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-white/90 text-xl">
              Start planning your dream journey today
            </p>
          </motion.div>
          
          <motion.div 
            className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {isSubmitted ? (
              <div className="bg-green-50/20 backdrop-blur-md p-6 rounded-xl text-center">
                <div className="w-16 h-16 bg-green-100/30 rounded-full flex items-center justify-center text-green-600 mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Booking Started!</h3>
                <p className="text-white/90 mb-4">
                  Your booking request has been submitted successfully! You'll be redirected to complete your booking.
                </p>
                <Link
                  href="/booking"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all"
                >
                  Complete Your Booking
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Where would you like to go?</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">When are you planning to travel?</label>
                    <input
                      type="text"
                      className="w-full p-3 bg-white/20 border border-white/30 rounded-lg placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      placeholder="Travel dates"
                      value={dates}
                      onChange={(e) => setDates(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">How many travelers?</label>
                    <select
                      className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      required
                    >
                      <option value="" className="bg-blue-900">Select travelers</option>
                      <option value="1" className="bg-blue-900">1 traveler</option>
                      <option value="2" className="bg-blue-900">2 travelers</option>
                      <option value="3-5" className="bg-blue-900">3-5 travelers</option>
                      <option value="6+" className="bg-blue-900">6+ travelers</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg text-center inline-block ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Processing...' : 'Start Planning'}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
          
          <motion.div 
            className="mt-12 flex justify-center items-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center text-white">
              <svg className="w-6 h-6 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No booking fees</span>
            </div>
            <div className="hidden md:flex items-center text-white">
              <svg className="w-6 h-6 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Free cancellation</span>
            </div>
            <div className="hidden md:flex items-center text-white">
              <svg className="w-6 h-6 mr-2 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Best price guarantee</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;