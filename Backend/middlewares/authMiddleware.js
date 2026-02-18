import jwt from 'jsonwebtoken';
import connectDb from '../config/configDb.js';
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';

configDotenv();

export const verifyToken = async(req,res,next)=>{
   try {
     const token = req.cookies.jwt;
 
     if(!token){
         return res.status(401).json({
             error :"Nottt authorized"
         });
     }

     console.log('first')
 
     const decode = jwt.verify(token,process.env.JWT_SECRET);
 
     console.log(decode);
 
     // ✅ TEMP RESPONSE (for testing)
     return res.json({
       message: "Token verified successfully ✅",
       decode
    });

    // later you will use this:
    // next();
    // next()
   } catch (error) {
    console.log("error in verify token api")
    return res.status(401).json({
             error :"Nottt authorized"
         });
   }

}