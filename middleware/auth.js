const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  const authHeader2 = req.header('Authorization');
  console.log(authHeader2);
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header missing');
    }

    const token = authHeader;
    const decoded = jwt.verify(token, 'your_jwt_secret'); // replace 'your_jwt_secret' with your actual secret key
    const user = await User.findById( decoded.userId);

    if (!user) {
      throw new Error('User not found');
    }
req.id=decoded.userId
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    const authHeader = req.header('Authorization');
    const token = authHeader;
    const decoded = jwt.verify(token, 'your_jwt_secret'); 
    console.log(decoded.userId);
    const user = await User.findById( decoded.userId);
    res.status(401).json({ error,user });
  }
};

module.exports = auth;
