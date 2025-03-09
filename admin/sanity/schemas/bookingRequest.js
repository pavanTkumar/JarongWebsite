export default {
    name: 'bookingRequest',
    title: 'Booking Request',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Customer Name',
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
        name: 'bookingType',
        title: 'Booking Type',
        type: 'string',
        options: {
          list: [
            {title: 'Flight', value: 'flight'},
            {title: 'Hotel', value: 'hotel'},
            {title: 'Apartment', value: 'apartment'},
            {title: 'Package', value: 'package'},
            {title: 'Custom', value: 'custom'}
          ]
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'travelDates',
        title: 'Travel Dates',
        type: 'object',
        fields: [
          {name: 'from', title: 'From', type: 'date'},
          {name: 'to', title: 'To', type: 'date'}
        ]
      },
      {
        name: 'travelers',
        title: 'Travelers',
        type: 'object',
        fields: [
          {name: 'adults', title: 'Adults', type: 'number'},
          {name: 'children', title: 'Children', type: 'number'},
          {name: 'infants', title: 'Infants', type: 'number'}
        ]
      },
      {
        name: 'transportationNeeded',
        title: 'Transportation Needed',
        type: 'boolean'
      },
      {
        name: 'transportationDetails',
        title: 'Transportation Details',
        type: 'object',
        fields: [
          {name: 'pickupLocation', title: 'Pickup Location', type: 'string'},
          {name: 'destination', title: 'Destination', type: 'string'},
          {name: 'pickupDate', title: 'Pickup Date', type: 'date'},
          {name: 'pickupTime', title: 'Pickup Time', type: 'string'},
          {name: 'vehicleType', title: 'Vehicle Type', type: 'string'},
          {name: 'notes', title: 'Notes', type: 'text'}
        ]
      },
      {
        name: 'specialRequests',
        title: 'Special Requests',
        type: 'text'
      },
      {
        name: 'status',
        title: 'Status',
        type: 'string',
        options: {
          list: [
            {title: 'New', value: 'new'},
            {title: 'In Progress', value: 'inProgress'},
            {title: 'Confirmed', value: 'confirmed'},
            {title: 'Cancelled', value: 'cancelled'},
            {title: 'Completed', value: 'completed'}
          ]
        },
        initialValue: 'new'
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
        subtitle: 'bookingType'
      },
      prepare(selection) {
        const {title, subtitle} = selection
        return {
          title: title,
          subtitle: `${subtitle} booking`
        }
      }
    }
  }