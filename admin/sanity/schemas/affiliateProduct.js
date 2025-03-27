// admin/sanity/schemas/affiliateProduct.js
export default {
  name: 'affiliateProduct',
  title: 'Affiliate Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: Rule => Rule.required()
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Insurance', value: 'insurance'},
          {title: 'Travel Gear', value: 'gear'},
          {title: 'Accommodation', value: 'accommodation'},
          {title: 'Transportation', value: 'transportation'},
          {title: 'Other', value: 'other'}
        ]
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'url',
      title: 'Affiliate URL',
      type: 'url',
      validation: Rule => Rule.required()
    },
    {
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: Rule => Rule.min(0).max(5).precision(1)
    },
    {
      name: 'discount',
      title: 'Discount Text',
      type: 'string',
      description: 'E.g., "15% OFF"'
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Feature this product on the homepage'
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
      title: 'Publish Date, New',
      name: 'publishDateDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }]
    },
    {
      title: 'Publish Date, Old',
      name: 'publishDateAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }]
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
      media: 'image',
      category: 'category'
    },
    prepare({ title, media, category }) {
      return {
        title,
        media,
        subtitle: category ? `Category: ${category.charAt(0).toUpperCase() + category.slice(1)}` : ''
      };
    }
  }
}