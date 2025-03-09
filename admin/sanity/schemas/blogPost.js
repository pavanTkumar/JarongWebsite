export default {
    name: 'blogPost',
    title: 'Blog Post',
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
        name: 'author',
        title: 'Author',
        type: 'string',
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
        name: 'category',
        title: 'Category',
        type: 'string',
        options: {
          list: [
            {title: 'Destinations', value: 'destinations'},
            {title: 'Travel Tips', value: 'tips'},
            {title: 'Food & Cuisine', value: 'food'},
            {title: 'Culture', value: 'culture'},
            {title: 'Sustainable Travel', value: 'sustainable'}
          ]
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'excerpt',
        title: 'Excerpt',
        type: 'text',
        validation: Rule => Rule.required().max(200)
      },
      {
        name: 'content',
        title: 'Content',
        type: 'array',
        of: [
          {
            type: 'block'
          },
          {
            type: 'image',
            options: { hotspot: true }
          }
        ]
      },
      {
        name: 'publishedAt',
        title: 'Published At',
        type: 'datetime',
        validation: Rule => Rule.required()
      },
      {
        name: 'featured',
        title: 'Featured',
        type: 'boolean',
        description: 'Feature this post on the homepage'
      }
    ],
    preview: {
      select: {
        title: 'title',
        author: 'author',
        media: 'mainImage'
      },
      prepare(selection) {
        const {title, author, media} = selection
        return {
          title: title,
          subtitle: `By ${author}`,
          media: media
        }
      }
    }
  }