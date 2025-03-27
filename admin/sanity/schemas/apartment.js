// admin/sanity/schemas/apartment.js
export default {
  name: 'apartment',
  title: 'Apartment',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }]
    },
    {
      name: 'pricePerNight',
      title: 'Price Per Night',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'pricePerWeek',
      title: 'Price Per Week',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'pricePerMonth',
      title: 'Price Per Month',
      type: 'number',
      validation: Rule => Rule.required().positive()
    },
    {
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: Rule => Rule.required().positive().integer()
    },
    {
      name: 'bathrooms',
      title: 'Bathrooms',
      type: 'number',
      validation: Rule => Rule.required().positive().integer()
    },
    {
      name: 'maxGuests',
      title: 'Max Guests',
      type: 'number',
      validation: Rule => Rule.required().positive().integer()
    },
    {
      name: 'amenities',
      title: 'Amenities',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        { name: 'address', title: 'Address', type: 'string' },
        { name: 'city', title: 'City', type: 'string' },
        { name: 'country', title: 'Country', type: 'string' },
        { name: 'mapCoordinates', title: 'Map Coordinates', type: 'string', description: 'Format: latitude,longitude (e.g. 13.4565,-16.7789)' },
        { name: 'description', title: 'Location Description', type: 'text' },
        { 
          name: 'highlights', 
          title: 'Location Highlights', 
          type: 'array', 
          of: [{ type: 'string' }],
          description: 'Key points about the location (e.g. "5 minutes to beach")'
        }
      ]
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this apartment on the homepage'
    },
    {
      name: 'houseRules',
      title: 'House Rules',
      type: 'array',
      of: [{ type: 'string' }]
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  orderings: [
    {
      title: 'Price, Lowest First',
      name: 'priceAsc',
      by: [{ field: 'pricePerNight', direction: 'asc' }]
    },
    {
      title: 'Price, Highest First',
      name: 'priceDesc',
      by: [{ field: 'pricePerNight', direction: 'desc' }]
    },
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      location: 'location.city',
      bedrooms: 'bedrooms',
      price: 'pricePerNight'
    },
    prepare({ title, media, location, bedrooms, price }) {
      return {
        title,
        media,
        subtitle: `${location ? location + ' • ' : ''}${bedrooms || 0} BR • $${price || 0}/night`
      };
    }
  }
}