// admin/sanity/schemas/newsletter.js
export default {
    name: 'newsletter',
    title: 'Newsletter Subscription',
    type: 'document',
    fields: [
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: Rule => Rule.required().email()
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            {title: 'Active', value: 'active'},
            {title: 'Unsubscribed', value: 'unsubscribed'}
          ]
        },
        initialValue: 'active'
      },
      {
        name: 'source',
        title: 'Source',
        type: 'string',
        description: 'Where the subscription came from',
        options: {
          list: [
            {title: 'Footer', value: 'footer'},
            {title: 'Pop-up', value: 'popup'},
            {title: 'Blog', value: 'blog'},
            {title: 'Other', value: 'other'}
          ]
        },
        initialValue: 'footer'
      },
      {
        name: 'submittedAt',
        title: 'Submitted At',
        type: 'datetime',
        initialValue: () => new Date().toISOString(),
        readOnly: true
      },
      {
        name: 'lastModified',
        title: 'Last Modified',
        type: 'datetime',
        initialValue: () => new Date().toISOString()
      }
    ],
    orderings: [
      {
        title: 'Email',
        name: 'emailAsc',
        by: [{ field: 'email', direction: 'asc' }]
      },
      {
        title: 'Subscription Date, Latest',
        name: 'dateDesc',
        by: [{ field: 'submittedAt', direction: 'desc' }]
      }
    ],
    preview: {
      select: {
        title: 'email',
        status: 'status',
        date: 'submittedAt'
      },
      prepare({ title, status, date }) {
        const statusLabel = status === 'active' ? '✅ Active' : '❌ Unsubscribed';
        const formattedDate = date ? new Date(date).toLocaleDateString() : '';
        
        return {
          title,
          subtitle: `${statusLabel} • ${formattedDate}`
        };
      }
    }
  }