const { Resend } = require('resend');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { name, email, phone, type, message, file, fileName } = req.body;

    const htmlBody = `
      <h2>New ${type === 'employer' ? 'Search Inquiry' : type === 'candidate' ? 'Candidate Introduction' : 'Inquiry'}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Type:</strong> ${type}</p>
      <hr />
      <p>${message.replace(/\n/g, '<br />')}</p>
    `;

    const emailPayload = {
      from: 'MacKai West Form <onboarding@resend.dev>',
      to: 'twpark@udel.edu',
      subject: `MacKai West — ${type === 'employer' ? 'New search inquiry' : type === 'candidate' ? 'Candidate introduction' : 'Inquiry'} from ${name}`,
      html: htmlBody,
      reply_to: email,
    };

    if (file && fileName) {
      emailPayload.attachments = [
        {
          filename: fileName,
          content: file,
        },
      ];
    }

    await resend.emails.send(emailPayload);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
