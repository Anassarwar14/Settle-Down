import React, { useEffect } from 'react';
import { FaGoogle } from "react-icons/fa";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom'

function OAuth() {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();

    async function handleGoogleClick() {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName, 
                    email: result.user.email, 
                    photo: result.user.photoURL
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.log("Could not sign in with google", error);
        }
    }

  return (
    <button onClick={handleGoogleClick} type='button' className='flex justify-center items-center bg-rose-600 text-white p-3 rounded-3xl mb-4 hover:opacity-95'>
        <FaGoogle />
        <span className='ml-2'>Continue with Google</span>
    </button>
  )
}

export default OAuth