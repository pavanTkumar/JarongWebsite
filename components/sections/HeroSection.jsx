// components/sections/HeroSection.jsx
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Hero Background with darker overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-[url('/images/hero-bg.jpg')] bg-cover bg-center"
          style={{ filter: "brightness(0.6)" }} //* Changed from 0.8 to 0.6 for darker background */}
        />
        {/* Modern gradient overlay - with increased opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-blue-900/40 to-purple-900/50"></div>
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-6 pt-32 pb-20 h-fit md:h-screen flex flex-col justify-center">
        {/* Hero Content */}
        <div className="max-w-3xl">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Discover the World's Hidden{" "}
            <span className="text-amber-400 block mt-2">Treasures</span>
          </motion.h1>

          <motion.p
            className="text-xl text-white/90 font-light mb-10 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Welcome to our agency! We specialize in advertising and travel
            services. To learn more about our offerings, simply click on the
            relevant buttons on the top. Alternatively, you can find our contact
            information at the top right-hand corner and reach out to us via
            email or phone. We will respond to your inquiry promptly.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4 mb-10 md:mb-0"
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

        {/* Travel Statistics - more visible on dark background */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="bg-white/15 backdrop-blur rounded-xl p-5 border border-white/15">
            {" "}
            {/* Increased opacity */}
            <p className="text-amber-400 text-3xl font-bold">1200+</p>
            <p className="text-white">Happy Travelers</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-5 border border-white/15">
            <p className="text-amber-400 text-3xl font-bold">30+</p>
            <p className="text-white">Destinations</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-5 border border-white/15">
            <p className="text-amber-400 text-3xl font-bold">15+</p>
            <p className="text-white">Years Experience</p>
          </div>
          <div className="bg-white/15 backdrop-blur rounded-xl p-5 border border-white/15">
            <p className="text-amber-400 text-3xl font-bold">98%</p>
            <p className="text-white">Satisfaction</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
