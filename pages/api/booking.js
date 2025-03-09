import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    // Format transportation details if needed
    let transportationDetails = null;
    if (formData.needCab) {
      transportationDetails = {
        pickupLocation: formData.pickupLocation || '',
        destination: formData.cabDestination || '',
        pickupDate: formData.cabDate || formData.pickupDateTime?.split('T')[0] || '',
        pickupTime: formData.cabTime || (formData.pickupDateTime?.split('T')[1] || '').slice(0, 5) || '',
        vehicleType: formData.vehicleType || '',
        notes: formData.transportNotes || ''
      };
    }

    // Create booking request document in Sanity
    const bookingDoc = {
      _type: 'bookingRequest',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      bookingType: formData.bookingType || 'package',
      travelDates: {
        from: formData.departureDate || formData.checkIn || new Date().toISOString().split('T')[0],
        to: formData.returnDate || formData.checkOut || ''
      },
      travelers: {
        adults: parseInt(formData.adults || formData.guests || formData.passengers || '1', 10),
        children: parseInt(formData.children || '0', 10),
        infants: parseInt(formData.infants || '0', 10)
      },
      transportationNeeded: formData.needCab || false,
      transportationDetails: transportationDetails,
      specialRequests: formData.specialRequests || formData.message || '',
      status: 'new',
      submittedAt: new Date().toISOString()
    };

    // If this booking is for a specific package, add reference
    if (formData.packageId) {
      bookingDoc.packageReference = {
        _type: 'reference',
        _ref: formData.packageId
      };
    }

    // Create document in Sanity
    const result = await client.create(bookingDoc);

    return res.status(200).json({
      success: true,
      message: 'Booking request submitted successfully',
      bookingId: result._id
    });
  } catch (error) {
    console.error('Error submitting booking:', error);
    return res.status(500).json({ success: false, message: 'Error submitting booking request' });
  }
}