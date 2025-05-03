import Head from "next/head";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { client, urlFor } from "../lib/sanity";

export default function Media({ blogPosts }) {
  // Categories for filtering
  const categories = [
    { id: "all", name: "All Posts" },
    { id: "destinations", name: "Destinations" },
    { id: "tips", name: "Travel Tips" },
    { id: "food", name: "Food & Cuisine" },
    { id: "culture", name: "Culture" },
    { id: "sustainable", name: "Sustainable Travel" },
  ];

  const [activeCategory, setActiveCategory] = useState("all");

  // Filter posts based on selected category
  const filteredPosts =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      <Head>
        <title>Travel Media & Blog | JarongMedia</title>
        <meta
          name="description"
          content="Explore our travel blog for tips, guides, and inspiration for your next adventure. Discover destination guides, travel photography, and cultural insights."
        />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="w-full h-full bg-[url('/images/media/media-hero.jpg')] bg-cover bg-center"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>

        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Travel Media & Blog
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Inspiration, tips, and stories to fuel your wanderlust and enhance
              your travel experiences
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 rounded-full transition-all ${
                  activeCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {filteredPosts.length > 0 && activeCategory === "all" && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-8 bg-gray-50 rounded-xl overflow-hidden">
              <div className="w-full lg:w-1/2 h-80 lg:h-auto overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-all duration-700 hover:scale-105"
                  style={{
                    backgroundImage: `url(${filteredPosts[0].mainImage ? urlFor(filteredPosts[0].mainImage) : "/images/placeholder.jpg"})`,
                  }}
                ></div>
              </div>
              <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-blue-600 font-medium">
                    {filteredPosts[0].category.charAt(0).toUpperCase() +
                      filteredPosts[0].category.slice(1)}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">
                    {new Date(filteredPosts[0].publishedAt).toLocaleDateString(
                      "en-US",
                      { year: "numeric", month: "long", day: "numeric" }
                    )}
                  </span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-gray-600 mb-6">{filteredPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-gray-700 font-medium">
                      {filteredPosts[0].author}
                    </span>
                  </div>
                  <Link
                    href={`/media/${filteredPosts[0].slug.current}`}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section
        className={`py-16 ${filteredPosts.length > 0 && activeCategory === "all" ? "bg-gray-50" : "bg-white"}`}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts
              .slice(activeCategory === "all" ? 1 : 0)
              .map((post, index) => (
                <motion.div
                  key={post._id}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link href={`/media/${post.slug.current}`}>
                    <div className="h-56 overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-all duration-700 hover:scale-110"
                        style={{
                          backgroundImage: `url(${post.mainImage ? urlFor(post.mainImage) : "/images/placeholder.jpg"})`,
                        }}
                      ></div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-blue-600 font-medium">
                        {post.category.charAt(0).toUpperCase() +
                          post.category.slice(1)}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long", day: "numeric" }
                        )}
                      </span>
                    </div>
                    <Link href={`/media/${post.slug.current}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-6">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-gray-700 text-sm">
                          {post.author}
                        </span>
                      </div>
                      <Link
                        href={`/media/${post.slug.current}`}
                        className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No posts found
              </h3>
              <p className="text-gray-600">
                Please try a different category or check back later.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter and Advertise With Us sections remain the same */}
    </>
  );
}

export async function getStaticProps() {
  // Fetch blog posts from Sanity
  const blogPosts = await client.fetch(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      author,
      mainImage,
      category,
      excerpt,
      publishedAt
    }
  `);

  return {
    props: {
      blogPosts: blogPosts || [],
    },
    revalidate: 600, // Revalidate every 10 minutes
  };
}
