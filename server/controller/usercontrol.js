//used for user login ,register,log out
import usermodel from "../models/usermodel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
const register =async(req,res)=>{
    console.log("Received body:", req.body);
    try{
        const {name,email,password}=req.body
        if(!name||!email||!password){
            return res.json({response:fail,message:"something is wrong "})
        }
        const salt=await bcrypt.genSalt(10);
        const hashpass=await bcrypt.hash(password,salt)
        const userdata={
            name,
            email,
            password:hashpass
        }
        const newuser=new usermodel(userdata)
        const user=await newuser.save()
        const token =jwt.sign({id:user._id},process.env.jwt_sec)
        res.json({response:true})
    }catch(error){
        console.log(error)
        res.json({response: false})
    }
}
// const login=async(req,res)=>{
// try{
// const {email,password}=req.body
// const user=await usermodel.findOne({email})
// if(!user){
//    return res.json({
//     message:"user dose not exsist"
//    })
// }
// const ismatch =await bcrypt.compare(password,user.password)
// if(!ismatch){
//     return res.json({
//         message:"chukicha message aahe tuza"
//     })
   
// }
// else{
//     const token =jwt.sign({id:user._id},process.env.jwt_sec)
//     return res.json({
//        message:"theek aahe "
//     })
//    }
// }
// catch(error){
// console.log("error has occured")
// return res.json({
//     message:error.message
// })
// }
// }
const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await usermodel.findOne({ email });
      if (!user || user.password !== password) {
        return res.json({ response: false, message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
      return res.json({ response: true, message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ response: false, message: "Server error" });
    }
  };
  
const credits=async()=>{
    try{
        const {userid}=req.body
        const user=await usermodel.findById(userid)
        res.json({response:true,credits:user.creditbalance,name:user.name})
    }
    catch (error){
        res.json({message:error.message})
    }
}
export { register, login ,credits};