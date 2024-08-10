import React, { useState } from 'react';
import { renderMatches, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/slices/UserSlice';
import { backendPortURL } from '../../confiq';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [rememberMe, setRememberMe] = useState(false); // State to manage the "Remember Me" checkbox

  const loginValidation = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is Required'),
    password: Yup.string().required('Strong password is Required').min(6, 'Password is too short').max(10, 'Password is too long'),
  });

  const handleLogin = async (values) => {
    const { email, password } = values;
    console.log(email, password);

    try {
      // axios.defaults.withCredentials = true
      const response = await axios.post(`${backendPortURL}user/login`, { email, password }, { withCredentials: true });
      console.log("From login page", response.data);
      dispatch(setUser(response.data))
      localStorage.setItem("loggedInUserId", response.data._id)
      localStorage.setItem("loggedInUserEmail", response.data.email)
      localStorage.setItem("loggedInUserName", response.data.username)

      // Set a persistent cookie if "Remember Me" is checked
      // if (rememberMe) {
      //   document.cookie = `loggedInUser=${email}; expires=${new Date(Date.now() + 604800000)}; path=/`; // Cookie expires in 7 days
      // }

      // Redirect or handle post-login actions here
      if (response.status === 200) {
      // toast.success('Login Successfully',{ theme: "dark" });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      // toast.error('Please register first',{ theme: "dark" });
      console.log("Something went wrong", error);
      navigate("/signup")
    }
  };

  return (
    <div className="flex flex-col items-center pt-14 min-h-screen px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-4 text-[#144EE3]">Welcome Back</h1>
        <Formik initialValues={{ email: '', password: '' }} validationSchema={loginValidation} onSubmit={handleLogin}>
          {() => (
            <Form className="rounded-lg shadow-md p-6">
              <Field type="email" name="email" placeholder="Your Email" className="w-full px-4 py-3 mb-1 bg-transparent text-white ring-1 ring-[#144EE3] rounded-lg focus:outline-none focus:border-indigo-500" />
              <ErrorMessage name="email" component="div" className="text-red-400" />
              <Field type="password" name="password" placeholder="Your Password" className="w-full px-4 py-3 mt-3 mb-1 bg-transparent text-white ring-1 ring-[#144EE3] rounded-lg focus:outline-none focus:border-indigo-500" />
              <ErrorMessage name="password" component="div" className="text-red-400" />
              <div className="flex items-center justify-between gap-8 mt-3 mb-4">
                <label htmlFor="rememberMe" className="flex items-center">
                  <input type="checkbox" id="rememberMe" value={rememberMe} onChange={(prev)=> setRememberMe(!prev)} className="mr-2 leading-tight" />
                  <span className="text-xs sm:text-sm text-nowrap text-[#144EE3]">Remember me</span>
                </label>
                <span className="text-[#144EE3] text-xs sm:text-sm cursor-pointer text-nowrap">
                  Forgot Password?
                </span>
              </div>
              <button type="submit" className="w-full px-4 py-3 mt-3 text-lg text-white bg-[#144EE3] rounded-lg hover:bg-[#D75495] focus:outline-none">
                Log In
              </button>
              <div className="mt-4 flex text-center justify-center gap-3">
                <span className="text-3xl"><FcGoogle /></span>
                <span className="text-white text-lg cursor-pointer">Sign in with Google</span>
              </div>
            </Form>
          )}
        </Formik>
        <ToastContainer />

        <div className="mt-2.5 text-center">
          <p className="text-[#D75495]">Don't have an account?</p>
          <span className="text-[#144EE3] cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
