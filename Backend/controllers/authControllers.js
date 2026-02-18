import User from '../models/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../utils/generateToken.js';
import cookieParser from 'cookie-parser';
// post registe user
export const registerUser = async (req, res) => {

    console.log("req reached api called",req.body);
    // Validate user input

    // Show loading state

    // Send signup API request

    try {
        const { username,  mobileno,email, password } = req.body;
        console.log(username);

            // Validation
        if (!username || !email || !password || !mobileno) {
            console.log("one field not found");
            return res.status(400).json({ error: "Please fill in all fields" });
        }
    
        // Check if user already exists
        // console.log(req.body);
        const userExists = await User.findOne({ $or: [{ email }, { mobileno }] });    
        if (userExists) {
            return res.status(400).json({ error: "User with this email or mobile already exists" });
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        // Create user in database
        const newUser = new User({
                username,
                email,
                mobileno,
                password: hashPassword, 
            });
        console.log("new user ",newUser);
        // Generate JWT
        if(newUser){
            await newUser.save();
            
            // Attach token as HttpOnly cookie
            generateTokenAndSetCookie(newUser._id,res);
            // Send success response
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                mobileno: newUser.mobileno,
                // token : 
            });
            console.log('registered user');
        }
        else {
                res.status(400).json({ error: "Unable to save user in db" });
            }
    } catch (error) {
        console.log('error salting password and creating user in db');
        res.status(500).json({ error: "Internal Server Error" });
    }

    // Receive user data

    // Update global auth state

    // Redirect to dashboard
};

// post login request
export const loginUser = async (req, res) => {
    // Validate user input

    // Show loading state

    // Send login API request
    try {
        const {email,password} = req.body;
        console.log(email,password);
        ////////////////////////////////////////////
        ////////////////////////////////////////////
        // login ruser not found but hNDLING ON ui is remaining

        if (!email || !password) {
            return res.status(400).json({ error: "Please provide both email and password" });
        }
    
        // Check if user exists in database
        const user = await User.findOne({ email });
    
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    
        if (!user || !isPasswordCorrect) {
            console.log('user not found');
            return res.status(400).json({ error: "Invalid username or password" });
        }
    
        generateTokenAndSetCookie(user._id,res);
    
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            mobileno: user.mobileno,
        })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};