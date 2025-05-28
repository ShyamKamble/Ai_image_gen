// Import necessary modules and controllers
import { register, login, credits, deductCredit } from "../controller/usercontrol.js";
import userauth from "../middleware/auth.js";
import express from "express";

// Initialize the router
const userRouter = express.Router();

// Define routes
userRouter.post("/register", register); // Route for user registration
userRouter.post("/login", login); // Route for user login
userRouter.post("/credits", credits);
userRouter.post("/auth", userauth, credits); // Route for getting user credits (protected by middleware)
userRouter.post("/deduct", userauth, deductCredit); // Route for deducting user credits (protected by middleware)

// Export the router
export default userRouter;