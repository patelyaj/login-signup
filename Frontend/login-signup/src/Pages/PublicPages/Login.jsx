import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../../redux/Features/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from "react-toastify";
function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email format")
                .required("Email is required"),

            password: Yup.string()
                .min(6, "Minimum 6 characters required")
                .required("Password is required")
        }),

        onSubmit: async (values) => {
            try {
                await dispatch(loginUser(values)).unwrap();

                toast.success("Login successful ✅");

                navigate("/dashboard");

            } catch (error) {

                toast.error(error || "Login failed ❌");

            }
        }
    });
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>

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

<br />
                <button type="submit">Login</button>

            </form>
            <div>
                Don't have an accoount ? <Link to={'/signup'}>Sign up</Link>
            </div>
        </div>
    );
}

export default Login;