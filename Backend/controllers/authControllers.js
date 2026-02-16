import mongoose from "mongoose";
import User from "../models/usermodel";

export const login = async(req,res)=>{
    const data = req.user();
    const user = await User.find();
}