import { response } from 'express'
import jwt from'jsonwebtoken'
// const userauth=async(req,res,next)=>{
//     const {token}=req.headers
//     if(!token){
//         return res.json({response:false,message:"login again"})
//     }
//     try{
//         const tokendec=jwt.verify(token,process.env.jwt_sec)
//         if(tokendec.id){
//             req.body.userid=tokendec.id
//         }
//         else{
//             return res.json({response:false,message:"not auth"})
//         }
//         next()
//     }
   
//     catch(error){
//         res.json({response:false,messag:error.messag})
//     }
// }
const userauth = async (req, res) => {
    const token = req.headers.authorization; // <- Read token from Authorization header
    if (!token) {
      return res.status(401).json({ response: false, message: "Token not provided" });
    }
  
    try {
      const decoded = jwt.verify(token, "secret");
      const user = await usermodel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ response: false, message: "User not found" });
      }
      return res.json({ response: true, credits: user.creditbalance, name: user.name });
    } catch (err) {
      return res.status(401).json({ response: false, message: "Invalid token" });
    }
  };
export default userauth