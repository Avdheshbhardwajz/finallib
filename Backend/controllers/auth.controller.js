const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const logger = require("../utils/logger");
const bcrypt = require("bcryptjs");
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
};

exports.registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      password: hashedPassword,
      roles: ["USER"], // Default role
    });

    await newUser.save();

    // Create and return JWT token
    const token = jwt.sign(
      { userId: newUser._id, roles: newUser.roles },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ token, username: newUser.username, roles: newUser.roles });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    const checkPassword = bcrypt.compare(password, user.password);
    if (user && checkPassword) {
      logger.info(`${user.username} logged in`);
      res.json({ token: generateToken(user._id), roles: user.roles });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
