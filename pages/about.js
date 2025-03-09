import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  // Team members data
  const teamMembers = [
    {
      name: "Alex Johnson",
      position: "Founder & CEO",
      image: "/images/about/team-1.jpg",
      bio: "Alex founded JarongMedia with a passion for bringing unique travel experiences to adventurous souls. With over 15 years in the travel industry, he's visited more than 50 countries."
    },
    {
      name: "Sarah Williams",
      position: "Travel Consultant",
      image: "/images/about/team-2.jpg",
      bio: "Sarah specializes in African destinations and has extensive knowledge of Gambia. She ensures every client receives a personalized travel experience."
    },
    {
      name: "Michael Chen",
      position: "Operations Manager",
      image: "/images/about/team-3.jpg",
      bio: "Michael oversees the day-to-day operations, ensuring smooth booking processes and excellent customer service for all clients."
    },
    {
      name: "Amina Diallo",
      position: "Gambia Property Manager",
      image: "/images/about/team-4.jpg",
      bio: "Amina manages our Gambia apartment and helps guests experience the best of local culture, cuisine, and attractions during their stay."
    }
  ];

  return (
    <>
      <Head>
        <title>About Us | JarongMedia</title>
        <meta name="description" content="Learn about JarongMedia, our story, mission, and the team behind our travel services. Discover why we're passionate about creating unforgettable travel experiences." />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-[url('/images/about/about-hero.jpg')] bg-cover bg-center"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              About JarongMedia
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Our story, mission, and the passionate team behind your travel experiences
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4">
                JarongMedia was born from a deep passion for travel and a desire to share the beauty of unique destinations, 
                particularly the untapped wonders of Gambia and other African regions.
              </p>
              <p className="text-gray-600 mb-4">
                What began as a personal journey to explore off-the-beaten-path locations 
                evolved into a mission to create tailored travel experiences that connect 
                travelers with authentic cultures, stunning landscapes, and unforgettable memories.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, we've grown from a small operation to a trusted travel partner 
                for clients from around the world, always maintaining our commitment to personalized 
                service and unique experiences.
              </p>
              <p className="text-gray-600">
                Today, we pride ourselves on our deep knowledge of our destinations, our attention 
                to detail, and our ability to craft travel experiences that go beyond the ordinary.
              </p>
            </motion.div>
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: "url('/images/about/our-story.jpg')" }}
                ></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Our Mission
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              To provide exceptional travel experiences that create lasting memories, 
              foster cultural understanding, and promote sustainable tourism practices 
              that benefit local communities.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Authentic Experiences</h3>
              <p className="text-gray-600">
                We connect travelers with genuine local experiences that go beyond typical tourist attractions, 
                creating meaningful cultural exchanges and deeper understanding.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6 text-amber-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trust & Reliability</h3>
              <p className="text-gray-600">
                We build lasting relationships with our clients through transparent communication, 
                attention to detail, and a commitment to exceeding expectations with every interaction.
              </p>
            </motion.div>
            
            <motion.div 
              className="bg-white p-8 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 text-green-600">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sustainable Tourism</h3>
              <p className="text-gray-600">
                We promote responsible travel practices that minimize environmental impact and 
                ensure tourism benefits local communities and preserves cultural heritage.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              The passionate travel enthusiasts dedicated to creating your perfect journey
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="h-64 overflow-hidden">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-all duration-700 hover:scale-110"
                    style={{ backgroundImage: `url(${member.image})` }}
                  ></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.position}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              Start Your Journey With Us
            </motion.h2>
            <motion.p 
              className="text-white/90 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Whether you're planning a relaxing getaway to Gambia, seeking adventure across Africa, 
              or need assistance with flights and accommodations, we're here to make your travel dreams a reality.
            </motion.p>
            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link 
                href="/packages"
                className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg transition-all transform hover:scale-105"
              >
                Explore Packages
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-3 bg-white/10 hover:bg-white/20 backdrop-blur text-white font-medium rounded-lg border border-white/20 transition-all transform hover:scale-105"
              >
                Contact Us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}