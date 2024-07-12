import React from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className='max-w-sm sm:max-w-md mx-auto py-3 sm:py-5 px-8 rounded-2xl mt-4 sm:mt-7 shadow-md sm:shadow-xl shadow-gray-300  bg-white'>
      <h1 className='text-center text-4xl font-light mb-7 mt-3 text-zinc-800'>Sign Up</h1>
      <form className='flex flex-col gap-5'>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg focus:outline-none focus:border-teal-400 transition ease-in duration-200' id='username' />
        <input type='email' placeholder='Email' className='border p-3 rounded-lg focus:outline-none focus:border-teal-400 transition ease-in duration-200' id='email' />
        <input type='password' placeholder='Password' className='border p-3 rounded-lg focus:outline-none focus:border-teal-400 transition ease-in duration-200' id='password' />
        <button type='submit' className='border border-teal-500 transition ease-in duration-150 hover:bg-teal-500 text-teal-700 hover:text-white rounded-3xl p-3'>Sign Up</button>
        <button type='' className='flex justify-center items-center bg-rose-600 text-white p-3 rounded-3xl mb-4 hover:opacity-95'><FaGoogle /><span className='ml-2'>Continue with Google</span></button>
      </form>
      <p className='text-sm text-zinc-600 inline mr-2 ml-2'>Have an Account?</p>
      <Link to={"/sign-in"}>
        <span className='text-sm text-fuchsia-500 hover:underline hover:decoration-1 hover:underline-offset-4'>Sign In</span>
      </Link>
    </div>
  )
}

export default SignUp