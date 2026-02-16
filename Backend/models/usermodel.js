import mongoose from "mongoose";
import { number } from "zod";
// import 
const userSchema = mongoose.Schema({
    username : String,
    email : String,
    mobileno : Number,
    password : String
});

export default mongoose.model('user',userSchema);