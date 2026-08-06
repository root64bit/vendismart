export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, phone, org, enquiry_type, message } = body || {};

    const web3key = process.env.WEB3FORMS_KEY || "02397f7c-ee04-4b29-8251-06130926a7e6";

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "https://www.vendismart.co.uk",
        "Referer": "https://www.vendismart.co.uk/contact.html",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      body: JSON.stringify({
        access_key: web3key,
        to_email: "partnerships@vendismart.co.uk",
        subject: `New Website Contact Message from ${name}`,
        from_name: "VendiSmart Contact Form",
        name: name,
        email: email,
        phone: phone,
        organization: org,
        enquiry_type: enquiry_type,
        message: message
      })
    });

    const result = await response.json();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
