// File: pages/api/submit-form.js

import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    const formType = formData.formType || 'general'; // Identify form type
    
    console.log(`Processing ${formType} form submission`);
    
    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER || 'your-email@gmail.com', // replace with actual email in .env
        pass: process.env.SMTP_PASSWORD || 'your-app-password', // replace with actual password in .env
      },
    });
    
    // Set up email content based on form type
    let emailSubject = '';
    let emailContent = '';
    
    if (formType === 'booking' || formType === 'package') {
      emailSubject = 'New Trip Plan Request - JarongMedia';
      // Create email template for trip planning
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">New Trip Plan Request!</h2>
          <p style="font-size: 16px;">A customer has started planning their trip with JarongMedia.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Trip Details:</h3>
            <p><strong>Destination:</strong> ${formData.destination || formData.to || 'Not specified'}</p>
            <p><strong>Travel Date:</strong> ${formData.travelDate || formData.departureDate || 'Not specified'}</p>
            <p><strong>Travelers:</strong> ${formData.travelers || formData.passengers || '1'}</p>
            ${formData.returnDate ? `<p><strong>Return Date:</strong> ${formData.returnDate}</p>` : ''}
            ${formData.specialRequests ? `<p><strong>Special Requests:</strong> ${formData.specialRequests}</p>` : ''}
          </div>
          
          <div style="margin-top: 20px; color: #4B5563; font-size: 14px;">
            <p>This is an automated notification. Please contact the customer to complete their booking.</p>
            <p>Note: The customer has only provided preliminary information and will need to complete their booking.</p>
          </div>
        </div>
      `;
    } else if (formType === 'contact') {
      emailSubject = 'New Contact Form Submission - JarongMedia';
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">New Contact Form Submission</h2>
          <p style="font-size: 16px;">You've received a new message from your website contact form.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Contact Details:</h3>
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone || 'Not provided'}</p>
            <p><strong>Subject:</strong> ${formData.subject}</p>
            <p><strong>Message:</strong></p>
            <p style="border-left: 3px solid #3B82F6; padding-left: 10px; margin-left: 10px;">${formData.message}</p>
          </div>
          
          <div style="margin-top: 20px; color: #4B5563; font-size: 14px;">
            <p>This is an automated notification. Please respond to the customer's inquiry at your earliest convenience.</p>
          </div>
        </div>
      `;
    } else if (formType === 'newsletter') {
      emailSubject = 'New Newsletter Subscription - JarongMedia';
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">New Newsletter Subscription</h2>
          <p style="font-size: 16px;">A new user has subscribed to your newsletter.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Source:</strong> ${formData.source || 'Website'}</p>
          </div>
          
          <div style="margin-top: 20px; color: #4B5563; font-size: 14px;">
            <p>This email has been automatically added to your newsletter list.</p>
          </div>
        </div>
      `;
    } else {
      emailSubject = 'New Form Submission - JarongMedia';
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #3B82F6; text-align: center;">New Form Submission</h2>
          <p style="font-size: 16px;">You've received a new submission from your website.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1E3A8A; margin-top: 0;">Form Details:</h3>
            ${Object.entries(formData)
              .filter(([key]) => key !== 'formType')
              .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
              .join('')}
          </div>
          
          <div style="margin-top: 20px; color: #4B5563; font-size: 14px;">
            <p>This is an automated notification.</p>
          </div>
        </div>
      `;
    }

    try {
      // Send email to the client/admin email
      const emailTo = process.env.CLIENT_EMAIL || 'client@example.com'; // Replace with actual email in .env
      
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || '"JarongMedia Website" <noreply@jarongmedia.com>',
        to: emailTo,
        subject: emailSubject,
        html: emailContent,
        replyTo: formData.email || undefined // Reply to customer's email if provided
      });
      
      console.log('Email notification sent successfully');
      
      // Send confirmation email to user if applicable
      if (formData.email && (formType === 'contact' || formType === 'booking' || formType === 'package')) {
        const userSubject = formType === 'contact' 
          ? 'Thank you for contacting JarongMedia' 
          : 'Your Travel Inquiry with JarongMedia';
        
        const userContent = formType === 'contact'
          ? `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #3B82F6; text-align: center;">Thank You for Contacting Us</h2>
              <p style="font-size: 16px;">Dear ${formData.name},</p>
              <p>Thank you for reaching out to JarongMedia. We have received your message and will get back to you as soon as possible.</p>
              <p>For your reference, here's a copy of your message:</p>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <p><strong>Subject:</strong> ${formData.subject}</p>
                <p><strong>Message:</strong></p>
                <p style="border-left: 3px solid #3B82F6; padding-left: 10px; margin-left: 10px;">${formData.message}</p>
              </div>
              
              <p>If you have any urgent inquiries, please don't hesitate to call us at +1-234-567-8900.</p>
              
              <div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 20px; color: #4B5563; font-size: 14px;">
                <p>Best regards,<br>The JarongMedia Team</p>
              </div>
            </div>
          `
          : `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
              <h2 style="color: #3B82F6; text-align: center;">Your Travel Plans Are on Their Way!</h2>
              <p style="font-size: 16px;">Thank you for starting your travel planning with JarongMedia.</p>
              <p>We've received your initial inquiry and our travel specialists will be in touch with you shortly to discuss your travel plans in more detail.</p>
              
              <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #1E3A8A; margin-top: 0;">Your Trip Information:</h3>
                <p><strong>Destination:</strong> ${formData.destination || formData.to || 'Not specified'}</p>
                <p><strong>Travel Date:</strong> ${formData.travelDate || formData.departureDate || 'Not specified'}</p>
                <p><strong>Travelers:</strong> ${formData.travelers || formData.passengers || '1'}</p>
              </div>
              
              <p>In the meantime, feel free to explore our website for more travel inspiration!</p>
              
              <div style="margin-top: 20px; border-top: 1px solid #e0e0e0; padding-top: 20px; color: #4B5563; font-size: 14px;">
                <p>Best regards,<br>The JarongMedia Team</p>
              </div>
            </div>
          `;
        
        await transporter.sendMail({
          from: process.env.EMAIL_FROM || '"JarongMedia" <noreply@jarongmedia.com>',
          to: formData.email,
          subject: userSubject,
          html: userContent
        });
        
        console.log('Confirmation email sent to user');
      }
    } catch (emailError) {
      console.error('Error sending email notification:', emailError);
      // Continue with success response even if email fails
      // This prevents user-facing errors if just the email fails
    }
    
    // Send success response
    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully'
    });
  } catch (error) {
    console.error('Form submission error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing form submission. Please try again.' 
    });
  }
}