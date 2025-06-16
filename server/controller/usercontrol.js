import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const register = async (req, res) => {
  console.log("Received body:", req.body);

  try {
    const { name, email, password } = req.body;

   
    if (!name || !email || !password) {
      return res.status(400).json({ response: false, message: "Missing fields" });
    }

    const existingUser = await usermodel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ response: false, message: "Email already exists" });
    }

    
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(password, salt);

    
    const userdata = {
      name,
      email,
      password: hashpass,
      creditbalance: 5, 
    };

    const newUser = new usermodel(userdata);
    const user = await newUser.save();
    console.log("Saved user:", user);

   
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(201).json({ response: true, token });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ response: false, message: "Error during registration" });
  }
};


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


const credits = async (req, res) => {
  try {
    // Use req.user (from middleware) if available, else fallback to body.userid
    const userid = req.user?._id || req.body.userid;

    if (!userid) {
      return res.status(400).json({ response: false, message: "User ID is required" });
    }

    const user = await usermodel.findById(userid);
    if (!user) {
      return res.status(404).json({ response: false, message: "User not found" });
    }

    res.status(200).json({
      response: true,
      credits: user.creditbalance,
      name: user.name,
    });
  } catch (error) {
    console.error("Credits error:", error);
    res.status(500).json({ response: false, message: "Internal server error" });
  }
};


const deductCredit = async (req, res) => {
  try {
    const userid = req.user._id; // ✅ From auth middleware
    
    const user = await usermodel.findById(userid);
    if (!user) {
      return res.status(404).json({ response: false, message: "User not found" });
    }

    if (user.creditbalance <= 0) {
      return res.status(400).json({ response: false, redirect: true, message: "No credits left" });
    }

    user.creditbalance -= 1;
    await user.save();

    res.status(200).json({ response: true, credits: user.creditbalance });
  } catch (error) {
    console.error("Deduct credit error:", error);
    res.status(500).json({ response: false, message: error.message });
  }
};


export { register, login, credits, deductCredit };