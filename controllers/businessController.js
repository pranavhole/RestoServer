const Business = require('../models/Business');
const User = require('../models/User');
const axios = require('axios');

exports.createBusiness = async (req, res) => {
  let { display_name, email, company, contact, password } = req.body;

  // Ensure the contact number starts with +91
  if (!contact.startsWith('+91')) {
    contact = `+91${contact}`;
  }

  console.log(req.user);
  try {
    // Make request to AiSensy API
    const response = await axios.post('https://apis.aisensy.com/partner-apis/v1/partner/65e9fcb8abfa6918944c960e/business', {
      display_name,
      email,
      company,
      contact,
      timezone: "Asia/Calcutta GMT+05:30",
      currency: "INR",
      companySize: "10 - 20",
      password
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-AiSensy-Partner-API-Key': '6ccf3e5a38a31d7f40be9_65e9fcb8abfa6918944c960e'
      }
    });

    // Extract the relevant data from the response
    const businessData = response.data;

    // Create a new Business instance
    const newBusiness = new Business({
      display_name: businessData.display_name,
      email: businessData.email,
      company: businessData.company,
      contact: businessData.contact,
      timezone: businessData.timezone,
      currency: businessData.currency,
      companySize: businessData.companySize,
      password, // Store hashed password (make sure you handle this properly)
      business_id: businessData.business_id,
      active: businessData.active,
      user_name: businessData.user_name,
      created_at: businessData.created_at,
      updated_at: businessData.updated_at,
      type: businessData.type,
      // Reference to the user creating the business
    });

    // Save the new Business instance to the database
    await newBusiness.save();

    // Update the user's businessId
    const user = await User.findById(req.user._id);
    user.businessId = newBusiness._id;
    await user.save();

    res.status(201).json({ message: 'Business created and saved successfully', business: newBusiness });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};
exports.getBusness=async (req,res)=>{
  try {
    const user = await User.findById(req.user._id);
    const { name } = req.body;
    // Find the business associated with the user
    const business = await Business.findOne({ user: user._id });
    res.status(200).json( business );
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
}
exports.createProjectUnderBusiness = async (req, res) => {
  try {
    // Fetch the user from the database using the ID from the request
    const user = await User.findById(req.user._id);
    const { name } = req.body;
    // Find the business associated with the user
    const business = await Business.findOne({ user: user._id });
    const business_id = business.business_id;
    // Make a POST request to the external API to create a new project
    const response = await axios.post(`https://apis.aisensy.com/partner-apis/v1/partner/65e9fcb8abfa6918944c960e/business/${business_id}/project`, {
      name
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-AiSensy-Partner-API-Key': '6ccf3e5a38a31d7f40be9_65e9fcb8abfa6918944c960e'
      }
    });

    // Extract the project ID from the response
    const projectId = response.data.id;

    // Update the business with the new project ID
    business.project_id = projectId;
    await business.save();

    // Send a success response to the client
    res.status(200).json({ message: 'Project created and business updated successfully', projectId });

  } catch (error) {
    // Log the error and send an error response to the client
    console.error('Error creating project under business:', error.response ? error.response.data : error.message);
    res.status(500).json({ error });
  }
};

exports.generateWabaLink = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const business = await Business.findOne({ user: user._id });
    const businessId = business.business_id;
    const assistantId = business.project_id;
    const response = await axios.post('https://apis.aisensy.com/partner-apis/v1/partner/65e9fcb8abfa6918944c960e/generate-waba-link', {
      businessId,
      assistantId
    }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-AiSensy-Partner-API-Key': '6ccf3e5a38a31d7f40be9_65e9fcb8abfa6918944c960e'
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
