import { client } from '../../lib/sanity';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const formData = req.body;
    
    // Create contact message document in Sanity
    const doc = {
      _type: 'contactMessage',
      name: formData.name,
      email: formData.email,
      phone: formData.phone || '',
      subject: formData.subject,
      message: formData.message,
      status: 'unread',
      submittedAt: new Date().toISOString()
    };
    
    // Save to Sanity
    await client.create(doc);
    
    // Send response
    return res.status(200).json({ message: 'Contact form submitted successfully' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({ message: 'Error submitting contact form' });
  }
}