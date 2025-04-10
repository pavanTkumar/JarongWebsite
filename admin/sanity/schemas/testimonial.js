// admin/sanity/schemas/testimonial.js
export default {
    name: 'testimonial',
    title: 'Testimonial',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Customer Name',
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
        name: 'image',
        title: 'Customer Image',
        type: 'image',
        options: {
          hotspot: true
        }
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        options: {
          list: [1, 2, 3, 4, 5]
        },
        validation: Rule => Rule.required().min(1).max(5)
      },
      {
        name: 'text',
        title: 'Testimonial Text',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        validation: Rule => Rule.integer()
      },
      {
        name: 'active',
        title: 'Active',
        type: 'boolean',
        initialValue: true
      }
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'location',
        media: 'image'
      }
    }
  }