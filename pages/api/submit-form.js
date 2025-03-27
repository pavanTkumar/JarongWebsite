// pages/api/submit-form.js
import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    const formType = formData.formType || 'general'; // Identify form type
    
    // Save data to Sanity based on form type
    let sanityDoc = {};
    let sanityResult;
    
    switch (formType) {
      case 'contact':
        sanityDoc = {
          _type: 'contactMessage',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          subject: formData.subject,
          message: formData.message,
          status: 'unread',
          submittedAt: new Date().toISOString()
        };
        break;
        
      case 'booking':
        sanityDoc = {
          _type: 'bookingRequest',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          bookingType: formData.bookingType,
          travelDates: {
            from: formData.departureDate || formData.checkIn || '',
            to: formData.returnDate || formData.checkOut || ''
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
          sanityDoc.transportationDetails = {
            pickupLocation: formData.pickupLocation || '',
            destination: formData.cabDestination || '',
            pickupDate: formData.cabDate || formData.departureDate || formData.checkIn || '',
            pickupTime: formData.cabTime || '',
            vehicleType: formData.vehicleType || '',
            notes: formData.transportNotes || ''
          };
        }
        break;
        
      case 'apartment':
        sanityDoc = {
          _type: 'bookingRequest',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          bookingType: 'apartment',
          travelDates: {
            from: formData.checkIn,
            to: formData.checkOut
          },
          travelers: {
            adults: parseInt(formData.guests || '1'),
            children: 0,
            infants: 0
          },
          transportationNeeded: formData.needCab || false,
          specialRequests: formData.message || '',
          status: 'new',
          submittedAt: new Date().toISOString()
        };
        
        // Add transportation details if needed
        if (formData.needCab) {
          sanityDoc.transportationDetails = {
            pickupLocation: formData.pickupLocation || '',
            destination: 'Gambia Apartment',
            pickupDate: formData.cabDate || formData.checkIn || '',
            pickupTime: formData.pickupTime || '',
            notes: formData.transportNotes || ''
          };
        }
        break;
        
      case 'newsletter':
        sanityDoc = {
          _type: 'newsletter',
          email: formData.email,
          submittedAt: new Date().toISOString()
        };
        break;
        
      default:
        // General form handling
        sanityDoc = {
          _type: 'formSubmission',
          ...formData,
          submittedAt: new Date().toISOString()
        };
    }
    
    // Save to Sanity
    try {
      sanityResult = await client.create(sanityDoc);
      console.log('Document saved to Sanity:', sanityResult._id);
    } catch (sanityError) {
      console.error('Error saving to Sanity:', sanityError);
      // Continue processing even if Sanity save fails
    }
    
    // Send email notifications
    try {
      // Prepare data for email API
      const emailData = {
        type: formType,
        data: formData
      };
      
      // Call email API
      const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });
      
      const emailResult = await emailResponse.json();
      
      if (!emailResult.success) {
        console.warn('Email notification failed:', emailResult.message);
      }
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      // Continue processing even if email sending fails
    }
    
    // Send success response
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      docId: sanityResult?._id
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing form submission. Please try again.' 
    });
  }
}