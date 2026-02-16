import mongoose from "mongoose";
import usermodel from "../models/usermodel";
import express from "express";
import { login } from "../controllers/authControllers";

const router = express.Router();

router.post('/login',login);