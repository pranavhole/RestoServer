const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  mobileNo: { type: String, required: true,unique: true  },
  password: { type: String, required: true },
  tables:[{type:mongoose.Schema.Types.ObjectId, ref:"Table"}],
  businessId:{type:mongoose.Schema.Types.ObjectId, ref:"Business"}
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
