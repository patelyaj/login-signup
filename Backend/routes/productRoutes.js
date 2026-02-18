import mongoose from "mongoose";
// import user from "../models/userModel";
import express from "express";
import { addProduct } from "../controllers/productController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/addproduct", verifyToken ,addProduct);

export default router;