// pages/api/send-email.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    // Create reusable transporter
    // For production, use your SMTP credentials
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.example.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'your-email@example.com',
        pass: process.env.SMTP_PASSWORD || 'your-password',
      },
    });

    // If this is a development environment, log instead of sending
    if (process.env.NODE_ENV === 'development') {
      console.log('Email would be sent in production:', { type, data });
      
      // Return success for development
      return res.status(200).json({ 
        success: true, 
        message: 'Email simulation successful in development mode' 
      });
    }

    // Determine the email template based on the form type
    let emailContent;
    let adminSubject;
    let userSubject;
    
    switch (type) {
      case 'contact':
        adminSubject = `New Contact Form Submission: ${data.subject}`;
        userSubject = 'Your message has been received - JarongMedia';
        
        emailContent = {
          adminEmail: generateAdminContactEmail(data),
          userEmail: generateUserContactEmail(data),
        };
        break;
      
      case 'booking':
        adminSubject = `New Booking Request: ${data.bookingType}`;
        userSubject = 'Your booking request has been received - JarongMedia';
        
        emailContent = {
          adminEmail: generateAdminBookingEmail(data),
          userEmail: generateUserBookingEmail(data),
        };
        break;
      
      case 'apartment':
        adminSubject = 'New Gambia Apartment Booking Request';
        userSubject = 'Your Gambia apartment booking request has been received - JarongMedia';
        
        emailContent = {
          adminEmail: generateAdminApartmentEmail(data),
          userEmail: generateUserApartmentEmail(data),
        };
        break;
      
      case 'newsletter':
        adminSubject = 'New Newsletter Subscription';
        userSubject = 'Welcome to JarongMedia Newsletter';
        
        emailContent = {
          adminEmail: generateAdminNewsletterEmail(data),
          userEmail: generateUserNewsletterEmail(data),
        };
        break;
      
      default:
        adminSubject = 'New Form Submission';
        userSubject = 'Your submission has been received - JarongMedia';
        
        emailContent = {
          adminEmail: generateAdminDefaultEmail(data),
          userEmail: generateUserDefaultEmail(data),
        };
    }

    try {
      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"JarongMedia" <info@jarongmedia.com>',
        to: process.env.EMAIL_TO || 'admin@jarongmedia.com',
        subject: adminSubject,
        html: emailContent.adminEmail,
      });

      // Send confirmation email to user if email is provided
      if (data.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || '"JarongMedia" <info@jarongmedia.com>',
          to: data.email,
          subject: userSubject,
          html: emailContent.userEmail,
        });
      }
    } catch (mailError) {
      console.error('Error sending email:', mailError);
      // Continue even if email sending fails - we'll still have the data in Sanity
    }

    // Return success
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });
  } catch (error) {
    console.error('Email processing error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing form submission. Please try again.' 
    });
  }
}

// Email template generators
function generateAdminContactEmail(data) {
  return `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <h3>Message:</h3>
    <p>${data.message}</p>
    <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
  `;
}

function generateUserContactEmail(data) {
  return `
    <h2>Thank You for Contacting JarongMedia</h2>
    <p>Dear ${data.name},</p>
    <p>We have received your message and will get back to you as soon as possible.</p>
    <p>Here's a summary of your message:</p>
    <p><strong>Subject:</strong> ${data.subject}</p>
    <p><strong>Message:</strong> ${data.message}</p>
    <p>If you have any additional questions or information to provide, please reply to this email.</p>
    <p>Best regards,<br>JarongMedia Team</p>
  `;
}

function generateAdminBookingEmail(data) {
  let details = '';
  
  if (data.bookingType === 'flight') {
    details = `
      <p><strong>From:</strong> ${data.from}</p>
      <p><strong>To:</strong> ${data.to}</p>
      <p><strong>Departure Date:</strong> ${data.departureDate}</p>
      <p><strong>Return Date:</strong> ${data.returnDate || 'One way'}</p>
      <p><strong>Passengers:</strong> ${data.passengers}</p>
    `;
  } else if (data.bookingType === 'hotel') {
    details = `
      <p><strong>Location:</strong> ${data.hotelLocation}</p>
      <p><strong>Check-in Date:</strong> ${data.checkIn}</p>
      <p><strong>Check-out Date:</strong> ${data.checkOut}</p>
      <p><strong>Rooms:</strong> ${data.rooms}</p>
      <p><strong>Guests:</strong> ${data.guests}</p>
    `;
  } else if (data.bookingType === 'package') {
    details = `
      <p><strong>Package:</strong> ${data.packageTitle || 'Custom Package'}</p>
      <p><strong>Travel Date:</strong> ${data.travelDate}</p>
      <p><strong>Travelers:</strong> ${data.travelers}</p>
      <p><strong>Price:</strong> ${data.packagePrice || 'Custom'}</p>
    `;
  }
  
  let transportationDetails = '';
  if (data.needTransportation || data.needCab) {
    transportationDetails = `
      <h3>Transportation Details:</h3>
      <p><strong>Pickup Location:</strong> ${data.pickupLocation || 'Not specified'}</p>
      <p><strong>Destination:</strong> ${data.cabDestination || 'Not specified'}</p>
      <p><strong>Pickup Date:</strong> ${data.cabDate || data.transportDate || data.departureDate || data.checkIn || 'Not specified'}</p>
      <p><strong>Pickup Time:</strong> ${data.cabTime || data.transportTime || 'Not specified'}</p>
      <p><strong>Vehicle Type:</strong> ${data.vehicleType || 'Not specified'}</p>
      <p><strong>Additional Notes:</strong> ${data.transportNotes || 'None'}</p>
    `;
  }
  
  return `
    <h2>New ${data.bookingType ? data.bookingType.charAt(0).toUpperCase() + data.bookingType.slice(1) : 'Travel'} Booking Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    
    <h3>Booking Details:</h3>
    ${details}
    
    <p><strong>Special Requests:</strong> ${data.specialRequests || data.message || 'None'}</p>
    
    ${transportationDetails}
    
    <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
  `;
}

function generateUserBookingEmail(data) {
  let details = '';
  
  if (data.bookingType === 'flight') {
    details = `
      <p><strong>From:</strong> ${data.from}</p>
      <p><strong>To:</strong> ${data.to}</p>
      <p><strong>Departure Date:</strong> ${data.departureDate}</p>
      <p><strong>Return Date:</strong> ${data.returnDate || 'One way'}</p>
      <p><strong>Passengers:</strong> ${data.passengers}</p>
    `;
  } else if (data.bookingType === 'hotel') {
    details = `
      <p><strong>Location:</strong> ${data.hotelLocation}</p>
      <p><strong>Check-in Date:</strong> ${data.checkIn}</p>
      <p><strong>Check-out Date:</strong> ${data.checkOut}</p>
      <p><strong>Rooms:</strong> ${data.rooms}</p>
      <p><strong>Guests:</strong> ${data.guests}</p>
    `;
  } else if (data.bookingType === 'package') {
    details = `
      <p><strong>Package:</strong> ${data.packageTitle || 'Custom Package'}</p>
      <p><strong>Travel Date:</strong> ${data.travelDate}</p>
      <p><strong>Travelers:</strong> ${data.travelers}</p>
    `;
  }
  
  let transportationInfo = (data.needTransportation || data.needCab) ? 
    '<p>We\'ve noted your request for transportation assistance and will include this in our planning.</p>' : '';
  
  return `
    <h2>Your Booking Request Has Been Received</h2>
    <p>Dear ${data.name},</p>
    <p>Thank you for choosing JarongMedia for your travel needs. We have received your ${data.bookingType || 'travel'} booking request and our team is working to process it.</p>
    
    <h3>Your Booking Details:</h3>
    ${details}
    
    ${transportationInfo}
    
    <p>One of our travel specialists will contact you shortly to confirm availability and complete your booking.</p>
    <p>If you have any immediate questions, please feel free to contact us.</p>
    <p>Best regards,<br>JarongMedia Team</p>
  `;
}

function generateAdminApartmentEmail(data) {
  let transportationDetails = '';
  if (data.needCab) {
    transportationDetails = `
      <h3>Transportation Request:</h3>
      <p><strong>Pickup Location:</strong> ${data.pickupLocation || 'Not specified'}</p>
      <p><strong>Pickup Date:</strong> ${data.cabDate || 'Not specified'}</p>
      <p><strong>Additional Notes:</strong> ${data.transportNotes || 'None'}</p>
    `;
  }
  
  return `
    <h2>New Gambia Apartment Booking Request</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
    
    <h3>Booking Details:</h3>
    <p><strong>Check-in Date:</strong> ${data.checkIn}</p>
    <p><strong>Check-out Date:</strong> ${data.checkOut}</p>
    <p><strong>Number of Guests:</strong> ${data.guests}</p>
    <p><strong>Special Requests:</strong> ${data.message || 'None'}</p>
    
    ${transportationDetails}
    
    <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
  `;
}

function generateUserApartmentEmail(data) {
  let transportationInfo = data.needCab ? 
    '<p>We\'ve noted your request for transportation assistance and will arrange this for you.</p>' : '';
  
  return `
    <h2>Your Gambia Apartment Booking Request Has Been Received</h2>
    <p>Dear ${data.name},</p>
    <p>Thank you for your interest in our Gambia apartment. We have received your booking request and our team is checking availability for your selected dates.</p>
    
    <h3>Your Booking Details:</h3>
    <p><strong>Check-in Date:</strong> ${data.checkIn}</p>
    <p><strong>Check-out Date:</strong> ${data.checkOut}</p>
    <p><strong>Number of Guests:</strong> ${data.guests}</p>
    
    ${transportationInfo}
    
    <p>A member of our team will contact you shortly to confirm availability and provide next steps for securing your booking.</p>
    <p>If you have any questions in the meantime, please don't hesitate to contact us.</p>
    <p>Best regards,<br>JarongMedia Team</p>
  `;
}

function generateAdminNewsletterEmail(data) {
  return `
    <h2>New Newsletter Subscription</h2>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Source:</strong> ${data.source || 'Website'}</p>
    <p><em>Subscribed on: ${new Date().toLocaleString()}</em></p>
  `;
}

function generateUserNewsletterEmail(data) {
  return `
    <h2>Welcome to JarongMedia Newsletter</h2>
    <p>Thank you for subscribing to our newsletter!</p>
    <p>You'll now receive regular updates about our latest travel deals, destination guides, and exclusive offers.</p>
    <p>Stay connected with us on social media for more travel inspiration:</p>
    <p>
      <a href="https://facebook.com/jarongmedia">Facebook</a> | 
      <a href="https://instagram.com/jarongmedia">Instagram</a> | 
      <a href="https://twitter.com/jarongmedia">Twitter</a>
    </p>
    <p>Best regards,<br>JarongMedia Team</p>
    <p><small>If you didn't subscribe to our newsletter, you can safely ignore this email or <a href="https://www.jarongmedia.com/unsubscribe?email=${data.email}">unsubscribe here</a>.</small></p>
  `;
}

function generateAdminDefaultEmail(data) {
  const formDataHtml = Object.entries(data)
    .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
    .join('');
  
  return `
    <h2>New Form Submission</h2>
    ${formDataHtml}
    <p><em>Submitted on: ${new Date().toLocaleString()}</em></p>
  `;
}

function generateUserDefaultEmail(data) {
  return `
    <h2>Your Submission Has Been Received</h2>
    <p>Dear ${data.name || 'Customer'},</p>
    <p>Thank you for your submission. We have received your information and will process it accordingly.</p>
    <p>Our team will review your submission and contact you if any additional information is needed.</p>
    <p>Best regards,<br>JarongMedia Team</p>
  `;
}