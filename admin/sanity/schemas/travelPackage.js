export default {
    name: 'travelPackage',
    title: 'Travel Package',
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
        name: 'price',
        title: 'Price',
        type: 'number',
        validation: Rule => Rule.required().positive()
      },
      {
        name: 'duration',
        title: 'Duration',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'location',
        title: 'Location',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'inclusions',
        title: 'Inclusions',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'exclusions',
        title: 'Exclusions',
        type: 'array',
        of: [{ type: 'string' }]
      },
      {
        name: 'itinerary',
        title: 'Itinerary',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              { name: 'day', title: 'Day', type: 'string' },
              { name: 'title', title: 'Title', type: 'string' },
              { name: 'description', title: 'Description', type: 'text' }
            ]
          }
        ]
      },
      {
        name: 'featured',
        title: 'Featured',
        type: 'boolean',
        description: 'Show this package on the homepage'
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        validation: Rule => Rule.min(0).max(5).precision(1)
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime'
      }
    ],
    preview: {
      select: {
        title: 'title',
        media: 'mainImage'
      }
    }
  }