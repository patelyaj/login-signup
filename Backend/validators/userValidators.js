import { z } from 'zod';

export const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    mobileno: z.coerce.number().min(1000000000, "Mobile number must be 10 digits").max(9999999999, "Mobile number must be 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});