// admin/sanity/schemas/contactMessage.js
export default {
    name: 'contactMessage',
    title: 'Contact Message',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'phone',
        title: 'Phone',
        type: 'string'
      },
      {
        name: 'subject',
        title: 'Subject',
        type: 'string',
        validation: Rule => Rule.required()
      },
      {
        name: 'message',
        title: 'Message',
        type: 'text',
        validation: Rule => Rule.required()
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            {title: 'Unread', value: 'unread'},
            {title: 'Read', value: 'read'},
            {title: 'Replied', value: 'replied'},
            {title: 'Archived', value: 'archived'}
          ]
        },
        initialValue: 'unread'
      },
      {
        name: 'notes',
        title: 'Internal Notes',
        type: 'text'
      },
      {
        name: 'submittedAt',
        title: 'Submitted At',
        type: 'datetime',
        readonly: true
      }
    ],
    preview: {
      select: {
        title: 'name',
        subtitle: 'subject'
      }
    }
  }