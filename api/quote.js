export default async function handler(req, res) {
  // Set CORS headers
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
    const { firstName, lastName, email, phone, company, facilityType, footfall, installationAddress, postcode, specialNotes } = body || {};

    const web3key = process.env.WEB3FORMS_KEY || "a1b2c3d4-e5f6-7890-abcd-1234567890ab"; // Placeholder / user key

    // Forward to Web3Forms API
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: web3key,
        to_email: "partnerships@vendismart.co.uk",
        subject: `New Quotation Request: ${company || firstName}`,
        from_name: "VendiSmart Quotation Form",
        name: `${firstName || ''} ${lastName || ''}`.trim(),
        email: email,
        phone: phone,
        company: company,
        facility_type: facilityType,
        footfall: footfall,
        address: `${installationAddress || ''}, ${postcode || ''}`,
        notes: specialNotes
      })
    });

    const result = await response.json();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
