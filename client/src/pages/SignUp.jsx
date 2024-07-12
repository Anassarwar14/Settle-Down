import React, { useState } from 'react';
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      }); 
      setError(null);
  }

  async function handleSubmit(e){
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
      const data = await res.json();
      if (data.success === false){
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    }
    catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }


  return (
    <div className='max-w-sm sm:max-w-md mx-auto py-3 sm:py-5 px-8 rounded-2xl mt-4 sm:mt-7 shadow-xl shadow-gray-300 bg-white'>
      <h1 className='text-center text-4xl font-light mb-7 mt-3 text-zinc-800'>Sign Up</h1>
      <form className='flex flex-col gap-5' onSubmit={ handleSubmit }>
        <input type='text' placeholder='Username' className='border p-3 rounded-lg focus:outline-none focus:border-teal-400 transition ease-in duration-200' id='username' onChange={handleChange}/>
        <input type='email' placeholder='Email' className='border p-3 rounded-lg focus:outline-none focus:border-teal-400 transition ease-in duration-200' id='email' onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg focus:outline-none focus:border-teal-400 transition ease-in duration-200' id='password' onChange={handleChange}/>
        {error && <p className='text-red-600 text-sm ml-2'>{error}</p>}
        <button type='submit' disabled={loading} className='border border-teal-500 transition ease-in duration-150 hover:bg-teal-500 text-teal-700 hover:text-white rounded-3xl p-3'>
          {loading ? 
          <div className='flex items-center justify-center'>
            <svg aria-hidden="true" role="status" className=" w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg> Loading...
          </div> : "Sign Up"}
        </button>
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