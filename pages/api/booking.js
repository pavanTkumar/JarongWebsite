import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    // Create booking request document in Sanity
    const doc = {
      _type: 'bookingRequest',
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bookingType: formData.bookingType,
      travelDates: {
        from: formData.departureDate || formData.checkIn,
        to: formData.returnDate || formData.checkOut
      },
      travelers: {
        adults: parseInt(formData.adults || formData.guests || '1'),
        children: parseInt(formData.children || '0'),
        infants: parseInt(formData.infants || '0')
      },
      transportationNeeded: formData.needCab || false,
      specialRequests: formData.specialRequests || '',
      status: 'new',
      submittedAt: new Date().toISOString()
    };
    
    // Add transportation details if needed
    if (formData.needCab) {
      doc.transportationDetails = {
        pickupLocation: formData.pickupLocation || '',
        destination: formData.cabDestination || '',
        pickupDate: formData.cabDate || formData.departureDate || formData.checkIn || '',
        pickupTime: formData.cabTime || '',
        vehicleType: formData.vehicleType || '',
        notes: formData.transportNotes || ''
      };
    }
    
    // Save to Sanity
    await client.create(doc);
    
    // Send response
    return res.status(200).json({ message: 'Booking request submitted successfully' });
  } catch (error) {
    console.error('Error processing booking:', error);
    return res.status(500).json({ message: 'Error submitting booking request' });
  }
}