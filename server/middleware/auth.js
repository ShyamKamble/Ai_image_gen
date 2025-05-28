import jwt from "jsonwebtoken";
import usermodel from "../models/usermodel.js";

const userauth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ response: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.jwt_sec);
        const user = await usermodel.findById(decoded.id);

        if (!user) {
            return res.status(401).json({ response: false, message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ response: false, message: "Not authorized" });
    }
};

export default userauth;