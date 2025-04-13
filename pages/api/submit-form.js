// File: pages/api/submit-form.js

import nodemailer from 'nodemailer';
import crypto from 'crypto';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    const formType = formData.formType || 'general'; // Identify form type
    
    // Generate a unique request ID
    const requestId = `JM-${Date.now().toString().substr(-6)}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    
    console.log(`Processing ${formType} form submission with ID: ${requestId}`);
    
    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'sales@jarongmedia.com',
        pass: process.env.SMTP_PASSWORD, // App password from Google Account
      },
    });
    
    // Set up email content based on form type
    let emailSubject = '';
    let emailContent = '';
    
    if (formType === 'booking' || formType === 'package') {
      emailSubject = `New Trip Plan Request - JarongMedia (Ref: ${requestId})`;
      // Create email template for trip planning
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">New Trip Plan Request!</h2>
          <p style="font-size: 16px; text-align: center;">
            <strong style="font-size: 18px; color: #3B82F6;">Request Reference: ${requestId}</strong>
          </p>
          <p style="font-size: 16px;">A customer has started planning their trip with JarongMedia.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Customer Information:</h3>
            <p style="color: #374151;"><strong>Name:</strong> ${formData.name || 'Not provided'}</p>
            <p style="color: #374151;"><strong>Email:</strong> ${formData.email || 'Not provided'}</p>
            <p style="color: #374151;"><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Trip Details:</h3>
            <p style="color: #374151;"><strong>Destination:</strong> ${formData.destination || formData.to || formData.hotelLocation || 'Not specified'}</p>
            <p style="color: #374151;"><strong>Travel Date:</strong> ${formData.travelDate || formData.departureDate || formData.checkIn || 'Not specified'}</p>
            <p style="color: #374151;"><strong>Return Date:</strong> ${formData.returnDate || formData.checkOut || 'Not specified'}</p>
            ${formData.returnDate ? `<p style="color: #374151;"><strong>Return Date:</strong> ${formData.returnDate}</p>` : ''}
            ${formData.bookingType ? `<p style="color: #374151;"><strong>Booking Type:</strong> ${formData.bookingType}</p>` : ''}
            ${formData.specialRequests ? `<p style="color: #374151;"><strong>Special Requests:</strong> ${formData.specialRequests}</p>` : ''}
          </div>
          
          ${formData.needCab || formData.needTransportation ? `
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Transportation Details:</h3>
            <p style="color: #374151;"><strong>Pickup Location:</strong> ${formData.pickupLocation || 'Not specified'}</p>
            <p style="color: #374151;"><strong>Destination:</strong> ${formData.cabDestination || 'Not specified'}</p>
            <p style="color: #374151;"><strong>Pickup Date:</strong> ${formData.cabDate || formData.transportDate || formData.departureDate || formData.checkIn || 'Not specified'}</p>
            <p style="color: #374151;"><strong>Vehicle Type:</strong> ${formData.vehicleType || 'Not specified'}</p>
            ${formData.transportNotes ? `<p style="color: #374151;"><strong>Additional Notes:</strong> ${formData.transportNotes}</p>` : ''}
          </div>
          ` : ''}
          
          <div style="margin-top: 20px; color: #4B5563; font-size: 14px;">
            <p>This is an automated notification from your website. Please contact the customer to complete their booking.</p>
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Request Reference:</strong> ${requestId}</p>
          </div>
        </div>
      `;
    } else if (formType === 'contact') {
      emailSubject = `New Contact Form Submission - JarongMedia (Ref: ${requestId})`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">New Contact Form Submission</h2>
          <p style="font-size: 16px; text-align: center;">
            <strong style="font-size: 18px; color: #3B82F6;">Request Reference: ${requestId}</strong>
          </p>
          <p style="font-size: 16px;">You've received a new message from your website contact form.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Contact Details:</h3>
            <p style="color: #374151;"><strong>Name:</strong> ${formData.name}</p>
            <p style="color: #374151;"><strong>Email:</strong> ${formData.email}</p>
            <p style="color: #374151;"><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p style="color: #374151;"><strong>Subject:</strong> ${formData.subject}</p>
            <p style="color: #374151;"><strong>Message:</strong></p>
            <p style="color: #374151; border-left: 3px solid #3B82F6; padding-left: 10px; margin-left: 10px;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 20px; color: #4B5563; font-size: 14px;">
            <p>This is an automated notification from your website. Please respond to the customer's inquiry at your earliest convenience.</p>
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Request Reference:</strong> ${requestId}</p>
          </div>
        </div>
      `;
    } else if (formType === 'newsletter') {
      emailSubject = `New Newsletter Subscription - JarongMedia (Ref: ${requestId})`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">New Newsletter Subscription</h2>
          <p style="font-size: 16px; text-align: center;">
            <strong style="font-size: 18px; color: #3B82F6;">Reference: ${requestId}</strong>
          </p>
          <p style="font-size: 16px;">A new user has subscribed to your newsletter.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="color: #374151;"><strong>Email:</strong> ${formData.email}</p>
            <p style="color: #374151;"><strong>Source:</strong> ${formData.source || 'Website'}</p>
            <p style="color: #374151;"><strong>Subscription Time:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="margin-top: 20px; color: #4B5563; font-size: 14px;">
            <p>This email has been automatically added to your newsletter list.</p>
            <p><strong>Reference ID:</strong> ${requestId}</p>
          </div>
        </div>
      `;
    } else if (formType === 'apartment') {
      emailSubject = `New Gambia Apartment Booking Request - JarongMedia (Ref: ${requestId})`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">New Apartment Booking Request!</h2>
          <p style="font-size: 16px; text-align: center;">
            <strong style="font-size: 18px; color: #3B82F6;">Booking Reference: ${requestId}</strong>
          </p>
          <p style="font-size: 16px;">A customer has requested to book your Gambia apartment.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Customer Information:</h3>
            <p style="color: #374151;"><strong>Name:</strong> ${formData.name || 'Not provided'}</p>
            <p style="color: #374151;"><strong>Email:</strong> ${formData.email || 'Not provided'}</p>
            <p style="color: #374151;"><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
          </div>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Booking Details:</h3>
            <p style="color: #374151;"><strong>Apartment:</strong> ${formData.apartmentTitle || 'Gambia Apartment'}</p>
            <p style="color: #374151;"><strong>Check-in Date:</strong> ${formData.checkIn || 'Not specified'}</p>
            <p style="color: #374151;"><strong>Check-out Date:</strong> ${formData.checkOut || 'Not specified'}</p>
            <p style="color: #374151;"><strong>Number of Guests:</strong> ${formData.guests || '1'}</p>
            ${formData.message ? `<p style="color: #374151;"><strong>Special Requests:</strong> ${formData.message}</p>` : ''}
          </div>
          
          ${formData.needCab ? `
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Transportation Details:</h3>
            <p style="color: #374151;"><strong>Pickup Location:</strong> ${formData.pickupLocation || 'Not specified'}</p>
            <p style="color: #374151;"><strong>Pickup Date:</strong> ${formData.cabDate || 'Not specified'}</p>
            ${formData.transportNotes ? `<p style="color: #374151;"><strong>Additional Notes:</strong> ${formData.transportNotes}</p>` : ''}
          </div>
          ` : ''}
          
          <div style="margin-top: 20px; color: #4B5563; font-size: 14px;">
            <p>This is an automated notification from your website. Please contact the customer to confirm availability and complete the booking.</p>
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Booking Reference:</strong> ${requestId}</p>
          </div>
        </div>
      `;
    } else {
      emailSubject = `New Form Submission - JarongMedia (Ref: ${requestId})`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">New Form Submission</h2>
          <p style="font-size: 16px; text-align: center;">
            <strong style="font-size: 18px; color: #3B82F6;">Reference: ${requestId}</strong>
          </p>
          <p style="font-size: 16px;">You've received a new submission from your website.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Form Details:</h3>
            ${Object.entries(formData)
              .filter(([key]) => key !== 'formType')
              .map(([key, value]) => `<p style="color: #374151;"><strong>${key}:</strong> ${value}</p>`)
              .join('')}
          </div>
          
          <div style="margin-top: 20px; color: #4B5563; font-size: 14px;">
            <p>This is an automated notification.</p>
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Reference ID:</strong> ${requestId}</p>
          </div>
        </div>
      `;
    }

    try {
      // Send email to the client/admin email
      const emailTo = process.env.CLIENT_EMAIL || 'sales@jarongmedia.com';
      
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"JarongMedia Website" <sales@jarongmedia.com>',
        to: emailTo,
        subject: emailSubject,
        html: emailContent,
        replyTo: formData.email || undefined // Reply to customer's email if provided
      });
      
      console.log('Email notification sent successfully');
      
      // Send confirmation email to user if applicable
      if (formData.email) {
        let userSubject = '';
        let userContent = '';
        
        if (formType === 'contact') {
          userSubject = `Thank you for contacting JarongMedia (Ref: ${requestId})`;
          userContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #3B82F6; text-align: center;">Thank You for Contacting Us</h2>
              <p style="font-size: 16px; text-align: center;">
                <strong style="font-size: 18px; color: #3B82F6;">Reference: ${requestId}</strong>
              </p>
              <p style="font-size: 16px;">Dear ${formData.name},</p>
              <p>Thank you for choosing JarongMedia. We have received your message and our team will review it promptly.</p>
              <p>One of our representatives will get back to you as soon as possible via email or phone.</p>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p style="color: #374151;"><strong>Your Message Summary:</strong></p>
                <p style="color: #374151;"><strong>Subject:</strong> ${formData.subject}</p>
                <p style="color: #374151;"><strong>Message:</strong> ${formData.message.substring(0, 100)}${formData.message.length > 100 ? '...' : ''}</p>
                <p style="color: #374151;"><strong>Reference:</strong> ${requestId}</p>
              </div>
              
              <p>For future reference, please note your request reference number: <strong>${requestId}</strong></p>
              <p>If you have any urgent inquiries, please don't hesitate to call us at +1-646-938-5734.</p>
              
              <div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 20px; color: #4B5563; font-size: 14px;">
                <p>Best regards,<br>The JarongMedia Team<br>+1-646-938-5734<br>sales@jarongmedia.com</p>
              </div>
            </div>
          `;
        } else if (formType === 'booking' || formType === 'package') {
          userSubject = `Your Travel Inquiry with JarongMedia (Ref: ${requestId})`;
          userContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #3B82F6; text-align: center;">Your Travel Plans Are on Their Way!</h2>
              <p style="font-size: 16px; text-align: center;">
                <strong style="font-size: 18px; color: #3B82F6;">Booking Reference: ${requestId}</strong>
              </p>
              <p style="font-size: 16px;">Dear ${formData.name || 'Valued Customer'},</p>
              <p>Thank you for choosing JarongMedia for your travel plans. We're excited to help you create the perfect trip!</p>
              <p>We have received your inquiry and one of our travel specialists will contact you shortly via email or phone to discuss your travel plans in more detail.</p>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1E3A8A; margin-top: 0;">Your Trip Information:</h3>
                <p style="color: #374151;"><strong>Destination:</strong> ${formData.destination || formData.to || formData.hotelLocation || formData.from || 'Not specified'}</p>
                <p style="color: #374151;"><strong>Travel Date:</strong> ${formData.travelDate || formData.departureDate || formData.checkIn || 'Not specified'}</p>
                <p style="color: #374151;"><strong>Travelers:</strong> ${formData.travelers || formData.passengers || formData.guests || '1'}</p>
                ${formData.returnDate || formData.checkOut ? `<p style="color: #374151;"><strong>Return Date:</strong> ${formData.returnDate || formData.checkOut}</p>` : ''}
                <p style="color: #374151;"><strong>Booking Reference:</strong> ${requestId}</p>
              </div>
              
              <p>Please save your booking reference number: <strong>${requestId}</strong> for future correspondence.</p>
              <p>In the meantime, feel free to explore our website for more travel inspiration or contact us if you have any questions.</p>
              <p>We look forward to helping you plan your journey!</p>
              
              <div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 20px; color: #4B5563; font-size: 14px;">
                <p>Best regards,<br>The JarongMedia Team<br>+1-646-938-5734<br>sales@jarongmedia.com</p>
              </div>
            </div>
          `;
        } else if (formType === 'apartment') {
          userSubject = `Your Gambia Apartment Booking Request - JarongMedia (Ref: ${requestId})`;
          userContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #3B82F6; text-align: center;">Thank You for Your Booking Request</h2>
              <p style="font-size: 16px; text-align: center;">
                <strong style="font-size: 18px; color: #3B82F6;">Booking Reference: ${requestId}</strong>
              </p>
              <p style="font-size: 16px;">Dear ${formData.name || 'Valued Customer'},</p>
              <p>Thank you for choosing JarongMedia for your Gambia accommodation. We have received your booking request and are checking availability for your selected dates.</p>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1E3A8A; margin-top: 0;">Your Booking Details:</h3>
                <p style="color: #374151;"><strong>Check-in Date:</strong> ${formData.checkIn || 'Not specified'}</p>
                <p style="color: #374151;"><strong>Check-out Date:</strong> ${formData.checkOut || 'Not specified'}</p>
                <p style="color: #374151;"><strong>Number of Guests:</strong> ${formData.guests || '1'}</p>
                <p style="color: #374151;"><strong>Booking Reference:</strong> ${requestId}</p>
              </div>
              
              <p>One of our team members will contact you shortly via email or phone to confirm availability and provide next steps for securing your booking.</p>
              <p>Please keep your booking reference number: <strong>${requestId}</strong> for all future correspondence.</p>
              <p>If you have any questions in the meantime, please don't hesitate to contact us at sales@jarongmedia.com or call us at +1-646-938-5734.</p>
              
              <div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 20px; color: #4B5563; font-size: 14px;">
                <p>Best regards,<br>The JarongMedia Team<br>+1-646-938-5734<br>sales@jarongmedia.com</p>
              </div>
            </div>
          `;
        } else if (formType === 'newsletter') {
          userSubject = `Welcome to JarongMedia Newsletter (Ref: ${requestId})`;
          userContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #3B82F6; text-align: center;">Thank You for Subscribing!</h2>
              <p style="font-size: 16px; text-align: center;">
                <strong style="font-size: 18px; color: #3B82F6;">Reference: ${requestId}</strong>
              </p>
              <p style="font-size: 16px;">Welcome to the JarongMedia community!</p>
              <p>Thank you for subscribing to our newsletter. You'll now receive regular updates about our latest travel deals, destination guides, and exclusive offers.</p>
              <p>Your subscription reference is: <strong>${requestId}</strong></p>
              <p>Stay connected with us on social media for more travel inspiration:</p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="https://facebook.com/jarongmedia" style="margin: 0 10px; text-decoration: none; color: #3B82F6;">Facebook</a> | 
                <a href="https://instagram.com/jarongmedia" style="margin: 0 10px; text-decoration: none; color: #3B82F6;">Instagram</a> | 
                <a href="https://twitter.com/jarongmedia" style="margin: 0 10px; text-decoration: none; color: #3B82F6;">Twitter</a>
              </div>
              
              <div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 20px; color: #4B5563; font-size: 14px;">
                <p>Best regards,<br>The JarongMedia Team<br>+1-646-938-5734<br>sales@jarongmedia.com</p>
                <p style="font-size: 12px; color: #6B7280; margin-top: 20px;">
                  If you didn't subscribe to our newsletter, you can safely ignore this email or 
                  <a href="https://www.jarongmedia.com/unsubscribe?email=${formData.email}" style="color: #3B82F6;">unsubscribe here</a>.
                </p>
              </div>
            </div>
          `;
        } else {
          userSubject = `We've Received Your Submission - JarongMedia (Ref: ${requestId})`;
          userContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #3B82F6; text-align: center;">Thank You for Your Submission</h2>
              <p style="font-size: 16px; text-align: center;">
                <strong style="font-size: 18px; color: #3B82F6;">Reference: ${requestId}</strong>
              </p>
              <p style="font-size: 16px;">Dear ${formData.name || 'Valued Customer'},</p>
              <p>Thank you for choosing JarongMedia. We've received your submission and our team will process it promptly.</p>
              <p>One of our representatives will contact you soon if any additional information is needed.</p>
              <p>Please keep your reference number: <strong>${requestId}</strong> for all future correspondence.</p>
              
              <div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 20px; color: #4B5563; font-size: 14px;">
                <p>Best regards,<br>The JarongMedia Team<br>+1-646-938-5734<br>sales@jarongmedia.com</p>
              </div>
            </div>
          `;
        }
        
        if (userSubject && userContent) {
          await transporter.sendMail({
            from: process.env.EMAIL_FROM || '"JarongMedia" <sales@jarongmedia.com>',
            to: formData.email,
            subject: userSubject,
            html: userContent
          });
          
          console.log('Confirmation email sent to user');
        }
      }
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Continue with success response even if email fails
      // This prevents user-facing errors if just the email fails
    }
    
    // Send success response
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      requestId: requestId
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing form submission. Please try again.' 
    });
  }
}