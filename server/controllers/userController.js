const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getToken = (id, username) => {
  return jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ error: "User already exists." });
    }
    const user = await User.create({ username, password });
    const token = getToken(user._id, user.username);
    res.status(201).json({ token,username:user.username });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    const token = getToken(user._id, user.username);
    res.status(200).json({ token,username:user.username });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { register, login };
