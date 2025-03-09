// CallToAction.jsx - Modern Booking CTA
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const CallToAction = () => {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [travelers, setTravelers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, you would handle form submission here
    console.log({ destination, dates, travelers });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/cta-bg.jpg')",
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
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">How many travelers?</label>
                  <select
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                    value={travelers}
                    onChange={(e) => setTravelers(e.target.value)}
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
                <Link
                  href="/booking"
                  className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all transform hover:scale-105 shadow-lg text-center inline-block"
                >
                  Start Planning
                </Link>
              </div>
            </form>
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