// admin/sanity/schemas/about.js - Check and fix syntax
export default {
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Page Subtitle',
      type: 'string'
    },
    {
      name: 'mainImage',
      title: 'Main Hero Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'companyStory',
      title: 'Company Story',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'companyStoryImage',
      title: 'Company Story Image',
      type: 'image',
      options: {
        hotspot: true
      }
    },
    {
      name: 'missionStatement',
      title: 'Mission Statement',
      type: 'text'
    },
    {
      name: 'missionValues',
      title: 'Mission Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', title: 'Icon Name', type: 'string' },
            { name: 'title', title: 'Value Title', type: 'string' },
            { name: 'description', title: 'Value Description', type: 'text' }
          ]
        }
      ]
    },
    {
      name: 'teamSectionTitle',
      title: 'Team Section Title',
      type: 'string',
      initialValue: 'Meet Our Team'
    },
    {
      name: 'teamSectionSubtitle',
      title: 'Team Section Subtitle',
      type: 'string',
      initialValue: 'The passionate travel enthusiasts dedicated to creating your perfect journey'
    },
    {
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string', validation: Rule => Rule.required() },
            { name: 'position', title: 'Position', type: 'string', validation: Rule => Rule.required() },
            { 
              name: 'image', 
              title: 'Profile Image', 
              type: 'image', 
              options: { hotspot: true },
              validation: Rule => Rule.required() 
            },
            { name: 'bio', title: 'Bio', type: 'text', validation: Rule => Rule.required() },
            { name: 'order', title: 'Display Order', type: 'number', initialValue: 0 }
          ],
          preview: {
            select: {
              title: 'name', 
              subtitle: 'position',
              media: 'image'
            }
          }
        }
      ]
    },
    {
      name: 'ctaTitle',
      title: 'CTA Section Title',
      type: 'string',
      initialValue: 'Start Your Journey With Us'
    },
    {
      name: 'ctaText',
      title: 'CTA Text',
      type: 'text',
      initialValue: 'Whether you are planning a relaxing getaway to Gambia, seeking adventure across Africa, or need assistance with flights and accommodations, we are here to make your travel dreams a reality.'
    }
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'About Page'
      };
    }
  }
};