const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const dotenv = require("dotenv");
dotenv.config();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await User.findOne({ username, role: "admin", password });
    if (!admin) {
      return res.status(400).json({ error: "Invalid credentials 1" });
    }

    const token = generateToken(admin);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("Finding user in database");
    const user = await User.findOne({ username, role: "user", password });

    if (!user) {
      console.log("User not found or role mismatch");
      return res.status(400).json({ error: "Invalid credentials 1" });
    }

    console.log("Generating token");
    const token = generateToken(user);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.userSignup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    const token = generateToken(newUser);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Error during user signup:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getuser = async (req, res) => {
  try {
    User.findById({ _id: req.user._id }).then((user) => {
      res.status(200).json({ user });
    });
  } catch (error) {
    res.status(500).json({ error: "server error 1" });
  }
};
