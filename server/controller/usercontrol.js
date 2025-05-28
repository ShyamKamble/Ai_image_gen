import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Function to register a new user
const register = async (req, res) => {
  console.log("Received body:", req.body);

  try {
    const { name, email, password } = req.body;

    // Validate input fields
    if (!name || !email || !password) {
      return res.status(400).json({ response: false, message: "Missing fields" });
    }

    // Check if the email is already registered
    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ response: false, message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    // Create new user data
    const userdata = {
      name,
      email,
      password: hashpass,
      creditbalance: 5, // Default credits
    };

    // Save the user to the database
    const newUser = new usermodel(userdata);
    const user = await newUser.save();
    console.log("Saved user:", user);

    // Generate a JWT token for the user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ response: true, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ response: false, message: "Error during registration" });
  }
};

// Function to log in an existing user
// In usercontrol.js
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ response: false, message: "User not found" });
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(400).json({ response: false, message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    // Send name and credits in the response
    res.status(200).json({
      response: true,
      message: "Login successful",
      token,
      name: user.name,
      credits: user.creditbalance,
      userId: user._id
    });
  } catch (error) {
    res.status(500).json({ response: false, message: error.message });
  }
};

// Function to retrieve user credits
// Function to retrieve user credits
const credits = async (req, res) => {
  try {
    const { userid } = req.body;

    // Find the user by ID
    const user = await usermodel.findById(userid);
    if (!user) {
      return res.status(404).json({ response: false, message: "User not found" });
    }

    // Add response: true here!
    res.status(200).json({ response: true, credits: user.creditbalance, name: user.name });
  } catch (error) {
    console.error("Credits error:", error);
    res.status(500).json({ response: false, message: error.message });
  }
};

// Function to deduct 1 credit from the user
const deductCredit = async (req, res) => {
  try {
    const { userid } = req.body;

    // Find the user by ID
    const user = await usermodel.findById(userid);
    if (!user) {
      return res.status(404).json({ response: false, message: "User not found" });
    }

    // Check if the user has sufficient credits
    if (user.creditbalance <= 0) {
      return res.status(400).json({ response: false, redirect: true, message: "No credits left" });
    }

    // Deduct one credit and save the user
    user.creditbalance -= 1;
    await user.save();

    res.status(200).json({ response: true, credits: user.creditbalance });
  } catch (error) {
    console.error("Deduct credit error:", error);
    res.status(500).json({ response: false, message: error.message });
  }
};

export { register, login, credits, deductCredit };