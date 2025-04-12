// pages/index.js
import Head from 'next/head';
import HeroSection from '../components/sections/HeroSection';
import FeaturedDestinations from '../components/sections/FeaturedDestinations';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import CallToAction from '../components/sections/CallToAction';
import { client } from '../lib/sanity';

export default function Home({ featuredPackages = [], testimonials = [], socialLinks = [] }) {
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
  try {
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
      *[_type == "testimonial" && active == true] | order(order asc)[0...6] {
        _id,
        name,
        location,
        image,
        text,
        rating
      }
    `);
    
    // Fetch social media links
    const socialLinks = await client.fetch(`
      *[_type == "socialMedia" && active == true] | order(order asc) {
        _id,
        platform,
        url,
        displayName
      }
    `);

    return {
      props: {
        featuredPackages: featuredPackages || [],
        testimonials: testimonials || [],
        socialLinks: socialLinks || []
      },
      revalidate: 600 // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        featuredPackages: [],
        testimonials: [],
        socialLinks: []
      },
      revalidate: 300
    };
  }
}