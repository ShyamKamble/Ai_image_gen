import {register,login,credits} from "../controller/usercontrol.js"
import userauth from "../middleware/auth.js"
import express from"express"
const userRouter=express.Router()
userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/auth",userauth,credits)
export default userRouter