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
    const { firstName, lastName, email, phone, company, facilityType, footfall, installationAddress, postcode, specialNotes } = body || {};

    const web3key = process.env.WEB3FORMS_KEY || "7b504274-88bf-455a-9bd0-9023438c982b";

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": "https://www.vendismart.co.uk",
        "Referer": "https://www.vendismart.co.uk/request-a-machine.html",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
      },
      body: JSON.stringify({
        access_key: web3key,
        to_email: "partnerships@vendismart.co.uk",
        subject: `New Quotation Request: ${company || firstName}`,
        from_name: "VendiSmart Website Quotation",
        name: `${firstName || ''} ${lastName || ''}`.trim(),
        email: email,
        phone: phone,
        company: company,
        facility_type: facilityType,
        footfall: footfall,
        address: `${installationAddress || ''}, ${postcode || ''}`,
        message: `Company: ${company}\nFacility Type: ${facilityType}\nFootfall: ${footfall}\nAddress: ${installationAddress}, ${postcode}\nNotes: ${specialNotes}`
      })
    });

    const result = await response.json();
    return res.status(200).json({ success: true, result });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
