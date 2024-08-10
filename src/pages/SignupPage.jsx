import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { backendPortURL } from '../../confiq';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is Required'),
  password: Yup.string().required('Strong password is Required').min(6).max(10),
  name: Yup.string().required('Username is Required')
});

const SignupPage = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values)  =>{
    const { name, email, password} = values

    try{
      let user = await axios.post(`${backendPortURL}user/register`, {
        username: name,
        email,
        password
      })
      toast.success('Registration Successfully',{ theme: "dark" });
      // console.log(user)
      navigate('/login')
    }catch{
      console.log("Something went wrong.")
      toast.error('Something Went Wrong, Please try again',{ theme: "dark" });
    }
  }


  return (
    <div className='flex flex-col items-center pt-10  min-h-screen px-4'>
      <div className='w-full max-w-md'>

        <h1 className='text-3xl font-bold text-center mb-4 text-[#144EE3]'>URL-Shortener</h1>
        <p className='text-lg text-center mb-6 text-[#D75495]'>Sign up now to unlock exclusive offers!</p>
        <div className=' rounded-lg shadow-md p-6'>
          <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validationSchema={SignupSchema} onSubmit={handleSubmit}
        
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Name'
                  className='w-full px-4 py-3 mb-1 text-white bg-transparent ring-1 ring-[#144EE3] rounded-lg focus:outline-none'
                />
                <ErrorMessage name='username' component='div' className='text-red-400' />

                <Field
                  type='email'
                  id='email'
                  name='email'
                  placeholder='Your Email'
                  className='w-full px-4 py-3 mt-3 mb-1 text-white bg-transparent ring-1 ring-[#144EE3] rounded-lg focus:outline-none '
                />
                <ErrorMessage name='email' component='div' className='text-red-400' />

                <Field
                  type='password'
                  id='password'
                  name='password'
                  placeholder='Choose a Password'
                  className='w-full px-4 py-3 mt-3 mb-1 text-white bg-transparent ring-1 ring-[#144EE3]  rounded-lg focus:outline-none'
                />
                <ErrorMessage name='password' component='div' className='text-red-400' />

                <button
                  type='submit'
                  className='w-full px-4 py-3 mt-3 text-lg text-white bg-[#144EE3] rounded-lg hover:bg-[#D75495] focus:outline-none'
                >
                  Sign up
                </button>
              </Form>
            )}
          </Formik>
          <ToastContainer />

        </div>
        <div className='mt-2.5 text-center'>
          <p className='text-[#D75495]'>Already have an account?</p>
          <span className='text-[#144EE3] cursor-pointer' onClick={() => navigate('/login')}>
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;