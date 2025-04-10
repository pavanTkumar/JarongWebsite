// components/sections/Testimonials.jsx
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({ testimonials = [] }) => {
  // Use the testimonials passed from props, but have fallbacks ready
  // in case the array is empty
  const defaultTestimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, USA",
      image: "/images/testimonial/testimonial-1.jpg",
      rating: 5,
      text: "Our trip to Gambia was amazing! The apartment was exactly as pictured, and the local experiences JarongMedia arranged were unforgettable. Will definitely book with them again.",
    },
    {
      id: 2,
      name: "Michael Chen",
      location: "Toronto, Canada",
      image: "/images/testimonial/testimonial-2.jpg",
      rating: 5,
      text: "I was hesitant to book with a new agency, but JarongMedia exceeded all my expectations. Their attention to detail and personalized service made our family vacation perfect.",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      location: "Madrid, Spain",
      image: "/images/testimonial/testimonial-3.jpg",
      rating: 5,
      text: "The African safari package was incredible - from the accommodations to the guides, everything was top-notch. The team was responsive and helpful throughout our journey.",
    },
  ];

  // Use provided testimonials if available, otherwise use defaults
  const displayTestimonials = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            className="text-blue-600 font-semibold tracking-wider uppercase text-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            TESTIMONIALS
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            What Our Travelers Say
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Read about real experiences from our satisfied customers around the world
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id || index}
              className="bg-white p-8 rounded-xl shadow-lg relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-lg">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${testimonial.image || '/images/testimonial/testimonial-1.jpg'})` }}
                  ></div>
                </div>
              </div>
              
              <div className="pt-6 text-center mb-4">
                <div className="flex justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < (testimonial.rating || 5) ? 'text-amber-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
              
              <div className="mt-4">
                <svg className="w-10 h-10 text-blue-100 mb-2 mx-auto" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M10 8c-2.2 0-4 1.8-4 4v2c0 2.2 1.8 4 4 4h2v4h4v-4c0-2.2-1.8-4-4-4h-2v-2h4V8h-4zm12 0c-2.2 0-4 1.8-4 4v2c0 2.2 1.8 4 4 4h2v4h4v-4c0-2.2-1.8-4-4-4h-2v-2h4V8h-4z" />
                </svg>
                <p className="text-gray-600 text-center italic">{testimonial.text || testimonial.testimonial}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;