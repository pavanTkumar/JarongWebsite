// HeroSection.jsx - Fixed Link components
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Hero Background - Properly positioned */}
      <div className="absolute inset-0 z-0">
        {/* If you have Next.js Image properly set up */}
        <div 
          className="w-full h-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
          style={{ filter: "brightness(0.8)" }}
        />
        {/* Modern gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-transparent to-purple-900/30"></div>
      </div>
      
      {/* Content Container - Properly spaced */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 h-screen flex flex-col justify-center">
        {/* Hero Content - Clean typography */}
        <div className="max-w-3xl">
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Discover the World's Hidden <span className="text-amber-400 block mt-2">Treasures</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/90 font-light mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Curated travel experiences with a personal touch. From exotic Gambia getaways to worldwide adventures.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link
              href="/packages"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all transform hover:translate-y-[-3px] hover:shadow-lg"
            >
              Explore Destinations
            </Link>
            <Link
              href="/booking"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-medium rounded-lg border border-white/20 transition-all transform hover:translate-y-[-3px] hover:shadow-lg"
            >
              Book Your Journey
            </Link>
          </motion.div>
        </div>
        
        {/* Travel Statistics - Clean, properly spaced cards */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10">
            <p className="text-amber-400 text-3xl font-bold">1200+</p>
            <p className="text-white">Happy Travelers</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10">
            <p className="text-amber-400 text-3xl font-bold">30+</p>
            <p className="text-white">Destinations</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10">
            <p className="text-amber-400 text-3xl font-bold">15+</p>
            <p className="text-white">Years Experience</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-5 border border-white/10">
            <p className="text-amber-400 text-3xl font-bold">98%</p>
            <p className="text-white">Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;