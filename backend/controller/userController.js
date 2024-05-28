const User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Cookies = require('js-cookie');

const createToken = (_id) => {
  return jwt.sign({ _id: _id }, process.env.JWTSECRET, { expiresIn: "1h" }); // 1h baically 60 min or 3600 seconds
}

const logInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.logIn(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const signUpUser = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth, gender } = req.body;
  const image = req.file.filename;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const user = await User.signUp(firstName, lastName, email, password, dateOfBirth, gender, image);
    const token = createToken(user._id);

    req.session.user = { email: user.email }; // Creating a user session here

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const forgetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const saltValue = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, saltValue);

    user.password = hash;
    await user.save();

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  logInUser,
  signUpUser,
  forgetPassword
}

