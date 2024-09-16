const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Register new user
const signup = async (req, res) => {
  const { Firstname, Lastname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    Firstname,
    Lastname,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      Firstname: user.Firstname,
      Lastname:user.Lastname,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// Auth user & get token
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};
 /*
  const googleCallback = (req, res) => {
    const token = generateToken(req.user._id);
    res.redirect(`http://localhost:8080?token=${token}`);
  };
*/
module.exports = { signup, login };
