import Head from 'next/head';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import { client } from '../../lib/sanity';
import { getSanityImageUrl } from '../../lib/imageUtils';

// Portable Text components for rendering Sanity's rich text
const ptComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <img
            src={getSanityImageUrl(value)}
            alt={value.alt || 'Blog image'}
            className="w-full h-auto"
          />
          {value.caption && (
            <div className="text-sm text-gray-600 italic text-center mt-2">
              {value.caption}
            </div>
          )}
        </div>
      );
    }
  },
  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a 
          href={value.href} 
          rel={rel} 
          className="text-blue-600 hover:underline"
          target={!value.href.startsWith('/') ? '_blank' : undefined}
        >
          {children}
        </a>
      );
    }
  }
};

export default function BlogPost({ post, morePosts }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running
  if (router.isFallback) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post not found</h1>
        <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link 
          href="/media"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  // Format the post date
  const publishedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <Head>
        <title>{post.title} | JarongMedia Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        {post.mainImage && <meta property="og:image" content={getSanityImageUrl(post.mainImage)} />}
      </Head>

      {/* Hero Section with Post Image */}
      <section className="relative pt-24 pb-16 bg-blue-900">
        <div className="absolute inset-0 z-0 opacity-40">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${post.mainImage ? getSanityImageUrl(post.mainImage) : '/images/placeholder.jpg'})` }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/90 z-0"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-4">
              <Link href="/media" className="text-white/80 hover:text-white transition-colors">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blog
                </span>
              </Link>
              <span className="text-white/60">•</span>
              <span className="text-white/80">{post.category.charAt(0).toUpperCase() + post.category.slice(1)}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-white/90">
              <div className="flex items-center">
                <span className="font-medium">{post.author}</span>
              </div>
              <span className="text-white/60">•</span>
              <span>{publishedDate}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <article className="prose prose-lg max-w-none">
                {post.content ? (
                  <PortableText
                    value={post.content}
                    components={ptComponents}
                  />
                ) : (
                  <div className="text-gray-600">
                    <p>{post.excerpt}</p>
                    <p className="italic mt-4">Full content is being prepared. Please check back soon.</p>
                  </div>
                )}
              </article>
              
              {/* Share and Tags Section */}
              <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <h4 className="text-gray-700 font-medium mb-2">Share this post:</h4>
                    <div className="flex space-x-4">
                      <a 
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          if (typeof window !== 'undefined') {
                            window.open(
                              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
                              'facebook-share',
                              'width=580,height=296'
                            );
                          }
                        }}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                        </svg>
                      </a>
                      <a 
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          if (typeof window !== 'undefined') {
                            window.open(
                              `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
                              'twitter-share',
                              'width=550,height=235'
                            );
                          }
                        }}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                      </a>
                      <a 
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&title=${encodeURIComponent(post.title)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-700 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          if (typeof window !== 'undefined') {
                            window.open(
                              `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`,
                              'linkedin-share',
                              'width=750,height=500'
                            );
                          }
                        }}
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-gray-700 font-medium mb-2">Category:</h4>
                    <Link
                      href={`/media?category=${post.category}`}
                      className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors"
                    >
                      {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 mb-8 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">More Blog Posts</h3>
                {morePosts && morePosts.length > 0 ? (
                  <div className="space-y-6">
                    {morePosts.map((post) => (
                      <div key={post._id} className="group">
                        <Link href={`/media/${post.slug?.current}`}>
                          <div className="flex items-start mb-2">
                            <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 mr-4">
                              <div 
                                className="w-full h-full bg-cover bg-center transition-all duration-300 group-hover:scale-110"
                                style={{ backgroundImage: `url(${post.mainImage ? getSanityImageUrl(post.mainImage) : '/images/placeholder.jpg'})` }}
                              ></div>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {post.title}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No other posts available at the moment.</p>
                )}
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Subscribe to Our Newsletter</h3>
                  <p className="text-gray-600 mb-4">Stay updated with our latest travel guides and tips.</p>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (typeof window !== 'undefined') {
                        // Submit newsletter subscription
                        fetch('/api/submit-form', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            formType: 'newsletter',
                            email: e.target.email.value,
                            source: 'blog'
                          }),
                        })
                        .then(response => response.json())
                        .then(data => {
                          if (data.success) {
                            alert('Thanks for subscribing to our newsletter!');
                            e.target.reset();
                          } else {
                            alert('There was an error submitting your subscription. Please try again.');
                          }
                        })
                        .catch(error => {
                          console.error('Error:', error);
                          alert('There was an error submitting your subscription. Please try again.');
                        });
                      }
                    }}
                    className="flex flex-col space-y-3"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="Your email address"
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps({ params }) {
  try {
    // Fetch the specific blog post data
    const post = await client.fetch(`
      *[_type == "blogPost" && slug.current == $slug][0] {
        _id,
        title,
        slug,
        author,
        mainImage,
        category,
        excerpt,
        content,
        publishedAt
      }
    `, { slug: params.slug });

    if (!post) {
      return {
        notFound: true
      };
    }

    // Fetch additional posts for the sidebar
    const morePosts = await client.fetch(`
      *[_type == "blogPost" && slug.current != $slug] | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        mainImage,
        publishedAt
      }
    `, { slug: params.slug });

    return {
      props: {
        post,
        morePosts
      },
      revalidate: 600 // Revalidate every 10 minutes
    };
  } catch (error) {
    console.error('Error fetching blog post data:', error);
    
    return {
      notFound: true
    };
  }
}

export async function getStaticPaths() {
  try {
    // Get all blog post slugs
    const posts = await client.fetch(`
      *[_type == "blogPost"] {
        "slug": slug.current
      }
    `);

    const paths = posts.map((post) => ({
      params: { slug: post.slug }
    }));

    return {
      paths,
      fallback: 'blocking' // Show a loading state
    };
  } catch (error) {
    console.error('Error fetching blog post slugs:', error);
    
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
}