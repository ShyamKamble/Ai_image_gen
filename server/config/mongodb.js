//this is used to connect mongodb with backend
import mongoose from "mongoose";
const connectdb=async()=>{
    mongoose.connection.on('connected', () => {
        console.log("✅ DB connected");
    });
    
    await mongoose.connect(`${process.env.MONGODB_URI}/project`)
}
export default connectdb