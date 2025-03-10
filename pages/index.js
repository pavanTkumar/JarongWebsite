import Head from 'next/head';
import HeroSection from '../components/sections/HeroSection';
import FeaturedDestinations from '../components/sections/FeaturedDestinations';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import CallToAction from '../components/sections/CallToAction';
import { client } from '../lib/sanity';

export default function Home({ featuredPackages, testimonials }) {
  return (
    <div>
      <Head>
        <title>JarongMedia - Travel Packages & Gambia Accommodation</title>
        <meta name="description" content="Book travel packages, flights, and hotel accommodations with JarongMedia. Experience our exclusive Gambia apartment and discover affiliate travel deals." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HeroSection />
      <FeaturedDestinations packages={featuredPackages} />
      <WhyChooseUs />
      <Testimonials testimonials={testimonials} />
      <CallToAction />
    </div>
  );
}

export async function getStaticProps() {
  // Fetch featured travel packages from Sanity
  const featuredPackages = await client.fetch(`
    *[_type == "travelPackage" && featured == true] | order(publishedAt desc)[0...6] {
      _id,
      title,
      slug,
      mainImage,
      description,
      price,
      duration,
      location,
      rating
    }
  `);

  // Fetch testimonials from Sanity
  const testimonials = await client.fetch(`
    *[_type == "bookingRequest" && status == "completed" && defined(testimonial)] | order(_createdAt desc)[0...6] {
      _id,
      name,
      location,
      testimonial,
      rating
    }
  `);

  return {
    props: {
      featuredPackages: featuredPackages || [],
      testimonials: testimonials || []
    },
    revalidate: 600 // Revalidate every 10 minutes
  };
}