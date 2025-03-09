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
        of: [{ type: 'string' }]
      },
      {
        name: 'location',
        title: 'Location',
        type: 'object',
        fields: [
          { name: 'address', title: 'Address', type: 'string' },
          { name: 'city', title: 'City', type: 'string' },
          { name: 'country', title: 'Country', type: 'string' },
          { name: 'mapCoordinates', title: 'Map Coordinates', type: 'string' }
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