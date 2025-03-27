import Head from 'next/head';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { client } from '../lib/sanity';
import { PortableText } from '@portabletext/react';
import { getSanityImageUrl } from '../lib/imageUtils';
import { useEffect } from 'react';

export default function About({ aboutData }) {
  useEffect(() => {
    console.log('About page data loaded:', aboutData);
  }, [aboutData]);

  // Extract team members from Sanity data or use fallback data
  const teamMembers = aboutData?.teamMembers || [
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

  // Extract mission values from Sanity or use fallback
  const missionValues = aboutData?.missionValues || [
    {
      icon: "globe",
      title: "Authentic Experiences",
      description: "We connect travelers with genuine local experiences that go beyond typical tourist attractions, creating meaningful cultural exchanges and deeper understanding."
    },
    {
      icon: "lock",
      title: "Trust & Reliability",
      description: "We build lasting relationships with our clients through transparent communication, attention to detail, and a commitment to exceeding expectations with every interaction."
    },
    {
      icon: "earth",
      title: "Sustainable Tourism",
      description: "We promote responsible travel practices that minimize environmental impact and ensure tourism benefits local communities and preserves cultural heritage."
    }
  ];

  // Process the company story - convert from Portable Text or use fallback
  const companyStory = aboutData?.companyStory || [
    {
      _key: "intro",
      _type: "block",
      children: [
        {
          _key: "text1",
          _type: "span",
          marks: [],
          text: "JarongMedia was born from a deep passion for travel and a desire to share the beauty of unique destinations, particularly the untapped wonders of Gambia and other African regions."
        }
      ],
      markDefs: [],
      style: "normal"
    },
    {
      _key: "para1",
      _type: "block",
      children: [
        {
          _key: "text2",
          _type: "span",
          marks: [],
          text: "What began as a personal journey to explore off-the-beaten-path locations evolved into a mission to create tailored travel experiences that connect travelers with authentic cultures, stunning landscapes, and unforgettable memories."
        }
      ],
      markDefs: [],
      style: "normal"
    }
  ];

  // Function to get icon based on name
  const getIconElement = (iconName) => {
    switch (iconName) {
      case 'globe':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        );
      case 'lock':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        );
      case 'earth':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        );
    }
  };

  return (
    <>
      <Head>
        <title>{aboutData?.title || 'About Us'} | JarongMedia</title>
        <meta name="description" content={aboutData?.subtitle || "Learn about JarongMedia, our story, mission, and the team behind our travel services. Discover why we're passionate about creating unforgettable travel experiences."} />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div 
            className="w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: aboutData?.mainImage ? 
              `url(${getSanityImageUrl(aboutData.mainImage)})` : 
              "url('/images/about/about-hero.jpg')" 
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {aboutData?.title || 'About JarongMedia'}
            </h1>
            <p className="text-xl text-white/90 mb-8">
              {aboutData?.subtitle || 'Our story, mission, and the passionate team behind your travel experiences'}
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
              {companyStory ? (
                <div className="prose prose-lg text-gray-600">
                  <PortableText value={companyStory} />
                </div>
              ) : (
                <>
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
                </>
              )}
            </motion.div>
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              {/* Animated SVG Logo */}
              <div className="relative h-96 rounded-xl overflow-hidden shadow-xl flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-3/4 h-3/4"
                >
                  <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    {/* Background */}
                    <motion.rect 
                      x="25" y="25" width="350" height="250" rx="25" 
                      fill="transparent" 
                      stroke="#2563EB" 
                      strokeWidth="4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                    />
                    
                    {/* Globe */}
                    <motion.circle 
                      cx="125" cy="150" r="50" 
                      fill="none" 
                      stroke="#2563EB" 
                      strokeWidth="3"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
                    />
                    
                    {/* Latitude lines */}
                    <motion.ellipse 
                      cx="125" cy="150" rx="50" ry="20" 
                      fill="none" 
                      stroke="#2563EB" 
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
                    />
                    
                    <motion.ellipse 
                      cx="125" cy="130" rx="38" ry="15" 
                      fill="none" 
                      stroke="#2563EB" 
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }}
                    />
                    
                    <motion.ellipse 
                      cx="125" cy="170" rx="38" ry="15" 
                      fill="none" 
                      stroke="#2563EB" 
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut", delay: 1.2 }}
                    />
                    
                    {/* Longitude line */}
                    <motion.line 
                      x1="125" y1="100" x2="125" y2="200" 
                      stroke="#2563EB" 
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeInOut", delay: 1.4 }}
                    />
                    
                    {/* Plane */}
                    <motion.path
                      d="M300,150 L270,140 L260,150 L270,160 L300,150 M300,150 L320,154 L325,150 L320,146 L300,150"
                      fill="#F59E0B"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut", delay: 1.6 }}
                    />
                    
                    {/* Flight path */}
                    <motion.path
                      d="M175,150 Q225,120 275,150"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, ease: "easeInOut", delay: 1.8 }}
                    />
                    
                    {/* Text */}
                    <motion.text
                      x="200" y="225" 
                      textAnchor="middle" 
                      fontSize="22" 
                      fontWeight="bold" 
                      fill="#1E40AF"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 2.2 }}
                    >
                      Jarong<tspan fill="#F59E0B">Media</tspan>
                    </motion.text>
                    
                    <motion.text
                      x="200" y="248" 
                      textAnchor="middle" 
                      fontSize="14" 
                      fill="#4B5563"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 2.5 }}
                    >
                      Travel Beyond Boundaries
                    </motion.text>
                  </svg>
                </motion.div>
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
              {aboutData?.missionStatement || 'To provide exceptional travel experiences that create lasting memories, foster cultural understanding, and promote sustainable tourism practices that benefit local communities.'}
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missionValues.map((value, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                  {getIconElement(value.icon)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </motion.div>
            ))}
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
              {aboutData?.teamSectionTitle || 'Meet Our Team'}
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {aboutData?.teamSectionSubtitle || 'The passionate travel enthusiasts dedicated to creating your perfect journey'}
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
                    style={{ 
                      backgroundImage: typeof member.image === 'string' 
                        ? `url(${member.image})` 
                        : `url(${getSanityImageUrl(member.image)})`
                    }}
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
              {aboutData?.ctaTitle || 'Start Your Journey With Us'}
            </motion.h2>
            <motion.p 
              className="text-white/90 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
            >
              {aboutData?.ctaText || 'Whether you're planning a relaxing getaway to Gambia, seeking adventure across Africa, or need assistance with flights and accommodations, we're here to make your travel dreams a reality.'}
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

export async function getStaticProps() {
  try {
    console.log('Fetching about page data...');
    
    // Fetch about page data from Sanity
    const aboutData = await client.fetch(`
      *[_type == "about"][0] {
        title,
        subtitle,
        mainImage,
        companyStory,
        companyStoryImage,
        missionStatement,
        missionValues,
        teamSectionTitle,
        teamSectionSubtitle,
        teamMembers[] {
          name,
          position,
          image,
          bio,
          order
        },
        ctaTitle,
        ctaText
      }
    `);
    
    if (aboutData) {
      console.log('About page data found in Sanity');
      
      // Sort team members by order if available
      if (aboutData.teamMembers?.length > 0) {
        aboutData.teamMembers.sort((a, b) => (a.order || 0) - (b.order || 0));
      }
    } else {
      console.log('No about page data found in Sanity');
    }

    return {
      props: {
        aboutData: aboutData || null
      },
      revalidate: 600 // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error('Error fetching about page data:', error);
    
    return {
      props: {
        aboutData: null
      },
      revalidate: 300 // Revalidate sooner on error
    };
  }
}