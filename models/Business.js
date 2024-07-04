const mongoose = require('mongoose');

const BusinessSchema = new mongoose.Schema({
  display_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  company: { type: String, required: true },
  contact: { type: String, required: true },
  timezone: { type: String, default: "Asia/Calcutta GMT+05:30" },
  currency: { type: String, default: "INR" },
  companySize: { type: String, default: "10 - 20" },
  password: { type: String, required: true },
  business_id: { type: String },
  active: { type: Boolean },
  project_id: { type: String },
  user_name: { type: String },
  created_at: { type: Number },
  updated_at: { type: Number },
  type: { type: String },
});

module.exports = mongoose.model('Business', BusinessSchema);
