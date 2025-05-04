import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    name:{type:String, required:true },
    email:{type:String, required:true ,unique:true},
    password:{type:String, required:true},
    creditbalance:{type:Number,default:3}
})
const usermodel=mongoose.models.user||mongoose.model("user",userschema)
export default usermodel