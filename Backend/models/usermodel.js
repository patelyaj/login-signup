import mongoose from "mongoose";
import { number } from "zod";
// import 
const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobileno: { type: Number, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('user', userSchema);