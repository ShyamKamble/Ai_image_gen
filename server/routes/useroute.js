
import { register, login, credits, deductCredit } from "../controller/usercontrol.js";
import userauth from "../middleware/auth.js";
import express from "express";


const userRouter = express.Router();

userRouter.post("/register", register); 
userRouter.post("/login", login); 
userRouter.post("/credits", credits);
userRouter.post("/auth", userauth, credits); 
userRouter.post("/deduct", userauth, deductCredit); 


export default userRouter;