const User = require('../models/User');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Use environment variable for production

exports.signup = async (req, res) => {
  const { name, email, mobile, password } = req.body;
  try {
    const newUser = new User({ name, emailId:email, mobileNo:mobile, password });
    await newUser.save();
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '36h' });
    res.status(201).json({ message: 'User signed up successfully' , token});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ emailId:email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '36h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
