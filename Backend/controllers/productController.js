import User from '../models/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import cookieParser from 'cookie-parser';

export const addProduct = (req,res)=>{
    console.log('product succesfully visited');
}