// admin/sanity/schemas/socialMedia.js
export default {
    name: 'socialMedia',
    title: 'Social Media',
    type: 'document',
    fields: [
      {
        name: 'platform',
        title: 'Platform',
        type: 'string',
        options: {
          list: [
            { title: 'Facebook', value: 'facebook' },
            { title: 'Instagram', value: 'instagram' },
            { title: 'Twitter/X', value: 'twitter' },
            { title: 'LinkedIn', value: 'linkedin' },
            { title: 'YouTube', value: 'youtube' },
            { title: 'TikTok', value: 'tiktok' },
            { title: 'Pinterest', value: 'pinterest' },
          ],
        },
        validation: Rule => Rule.required(),
      },
      {
        name: 'url',
        title: 'URL',
        type: 'url',
        validation: Rule => Rule.required().uri({
          scheme: ['http', 'https']
        }),
      },
      {
        name: 'displayName',
        title: 'Display Name (e.g. @username)',
        type: 'string',
      },
      {
        name: 'active',
        title: 'Active',
        type: 'boolean',
        initialValue: true,
        description: 'Toggle to show/hide this social media link on the website',
      },
      {
        name: 'order',
        title: 'Display Order',
        type: 'number',
        initialValue: 0,
      }
    ],
    preview: {
      select: {
        title: 'platform',
        subtitle: 'url',
      },
      prepare({ title, subtitle }) {
        return {
          title: title.charAt(0).toUpperCase() + title.slice(1),
          subtitle: subtitle,
        };
      },
    },
  };