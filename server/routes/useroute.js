import express from "express";
import {
  register,
  login,
  credits,
  deductCredit,
} from "../controller/usercontrol.js";
import userauth from "../middleware/auth.js";

const userRouter = express.Router();

// ✅ Public routes (no auth required)
userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.post("/credits", credits); // public version (with body.userid)
userRouter.post("/auth", userauth, credits); // protected version (uses JWT & req.user)
      
userRouter.post("/deduct", userauth, deductCredit);   // 🛡️ Secure: deduct 1 credit

export default userRouter;
