import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/Features/authSlice';
import { toast } from "react-toastify";
function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            mobileno: "",
            email: "",
            password: "",
        },

        validationSchema: Yup.object({

            username: Yup.string()
                .min(3, "At least 3 characters")    
                .required("Username is required"),

            mobileno: Yup.string()
                .matches(/^[0-9]{10}$/, "Must be exactly 10 digits")
                .required("Mobile number required"),

            email: Yup.string()
                .email("Invalid email")
                .required("Email required"),

            password: Yup.string()
                .min(6, "Minimum 6 characters")
                .required("Password required"),

        }),

        onSubmit: async (values) => {
            try {
                await dispatch(registerUser(values)).unwrap();

                toast.success("Signup successful 🎉");

                navigate("/dashboard");

            } catch (error) {

                toast.error(error || "Signup failed ❌");

            }
        }

    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

                <input
                    placeholder="enter username"
                    {...formik.getFieldProps("username")}
                />
                {formik.touched.username && formik.errors.username && (
                    <p style={{color:"red"}}>{formik.errors.username}</p>
                )}

                <input
                    placeholder="enter mobile number"
                    {...formik.getFieldProps("mobileno")}
                />
                {formik.touched.mobileno && formik.errors.mobileno && (
                    <p style={{color:"red"}}>{formik.errors.mobileno}</p>
                )}

                <input
                    type="email"
                    placeholder="enter email"
                    {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                    <p style={{color:"red"}}>{formik.errors.email}</p>
                )}

                <input
                    type="password"
                    placeholder="enter password"
                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password && (
                    <p style={{color:"red"}}>{formik.errors.password}</p>
                )}

                

                <button type="submit">Signup</button>

            </form>
            <div>already have an account ? <Link to={'/login'}>login</Link></div>
        </div>
    );
}

export default Signup;