// Signin.js
import React, { useState } from 'react';
import { auth } from '../Firebase/Config';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import nationalssf from './assets/images/nationalssf.jpg';
import { AiOutlineLoading } from 'react-icons/ai';

function Signin() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInCompleted, setIsSignInCompleted] = useState(false);
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setIsSignInCompleted(true);
      setTimeout(() => {
        navigate('/');
      }, 2500); // Navigate to home after 1.5 seconds
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex w-full bg-white">
      <img className="hidden lg:block w-1/2 h-full object-cover bg-cover bg-left" src={nationalssf} alt="SSF Kaniyath" />
      <div className="lg:w-1/2 w-full h-full flex flex-col items-start space-y-16 p-7 py-12 md:px-44 lg:px-24 xl:px-32 justify-center">
        <div className="flex flex-col text-start space-y-1.5">
          <p className="text-[#39b54a] text-3xl lg:text-4xl">Welcome to</p>
          <h1 className="text-[#00264a] text-5xl lg:text-6xl">SSF Kaniyath</h1>
        </div>
        <form onSubmit={handleSignin} className="w-full h-auto space-y-7">
          <div className="flex flex-col w-full space-y-2.5">
            <div className="relative flex flex-col items-center w-full justify-start h-full border bg-white rounded-md">
              <input
                className="pl-5 w-full border-0 rounded-md focus:outline-none bg-white text-base placeholder:text-base placeholder:font-thin"
                type='email'
                name={'email'}
                placeholder={'Email'}
                value={email}
                onChange={(e) => (setEmail(e.target.value))}
              />
            </div>
            <div className="relative flex flex-col items-center w-full justify-start h-full border bg-white rounded-md">
              <input
                className="pl-5 w-full border-0 rounded-md focus:outline-none bg-white text-base placeholder:text-base placeholder:font-thin"
                type='password'
                name='password'
                placeholder={'Phone Number ( as Password )'}
                value={password}
                onChange={(e) => (setPassword(e.target.value))}
              />
            </div>
          </div>
          <p className="text-[#808080] w-full ">
            Don't have an account ? <Link to="/Signup" ><span className="text-[#00264a]">Signup</span></Link>
          </p>
          {loading ? (
            <AiOutlineLoading className="w-full animate-spin text-[#39b54a] text-3xl mt-5" />
          ) : isSignInCompleted ? (
            <p className='text-center py-2.5 w-full text-[#39b54a] font-medium text-lg rounded-md mt-5'>Sign in completed ✓</p>
          ) : (
            <button type="submit" className="text-center bg-[#39b54a] py-2.5 w-full text-white font-medium text-lg rounded-md uppercase">
              Sign in
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signin;
