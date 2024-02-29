import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase/Config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import samvidhanyatra from './assets/images/samvidhanyatra.jpg'
import { AiOutlineLoading } from 'react-icons/ai';
import { BsArrowDownCircle } from 'react-icons/bs';

function Signup() {
  const [loading, setLoading] = useState(false);
  const [isSignUpCompleted, setIsSignUpCompleted] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [standard, setStandard] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const result = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(result.user, {
        displayName: fullName,
        email: email,
      });

      const path = collection(db, 'members')
      await addDoc(path, {
        fullName,
        Email: email,
        Password: password,
        Status: status,
        Address: address,
        Age: age,
        Std: standard,
        userUID: result.user.uid,
        Created: new Date()
      })

      setIsSignUpCompleted(true);
      setTimeout(() => {
        navigate('/');
      }, 2500); // Navigate to home after 2.5 seconds
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-auto flex flex-col w-full bg-[#00264a]'>
      <div style={{ backgroundImage: `url(${samvidhanyatra})` }} className='bg-no-repeat bg-cover text-[#d3e3fd] flex flex-col items-center justify-center bg-center relative bg-[#071a2b] overflow-hidden w-full p-7 md:px-44 lg:px-24 xl:px-64 py-16 md:py-24 lg:py-32'>
        <div className='z-10 flex flex-col items-center gap-2 '>
          <p className='text-[#39b54a] font-semibold text-3xl lg:text-4xl'>Welcome to</p>
          <h1 className='text-5xl font-bold text-center lg:text-7xl'>SSF Kaniyath</h1>
          <a href='#SignupForm' className='pt-8 text-xl md:text-2xl lg:text-3xl  shadow-lg  animate-bounce '><BsArrowDownCircle /></a>
        </div>
        <div className='absolute inset-0 w-full h-full bg-[#071a2b] opacity-70'></div>
      </div>
      <div className='h-full w-full flex flex-col item-center gap-12 lg:gap-20 p-7 py-20 md:p-20 lg:px-44 justify-center'>
        {/* <div className='flex flex-col text-start lg:text-center space-y-1.5'>
          <p className='text-[#39b54a] text-3xl lg:text-4xl'>Welcome to</p>
          <h1 className='text-[#fff] text-5xl xl:text-6xl'>SSF Kaniyath </h1>
        </div> */}
        <form id='SignupForm' onSubmit={handleSignup} className='w-full h-auto space-y-7'>
          <div className='text-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-auto w-full h-full gap-5'>
            <input required className="w-full  py-2 border-0 border-b-2 border-[#d3e3fdb3] outline-none  bg-transparent placeholder:font-normal placeholder:opacity-50 placeholder:text-[#d3e3fd]" type="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input required className="w-full  py-2 border-0 border-b-2 border-[#d3e3fdb3] outline-none  bg-transparent placeholder:font-normal placeholder:opacity-50 placeholder:text-[#d3e3fd] " type="password" placeholder='Phone Number ( as Password )' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select required className="w-full  py-2 border-0 border-b-2 border-[#d3e3fdb3] outline-none  bg-transparent placeholder:font-normal placeholder:opacity-50 placeholder:text-[#d3e3fd]" placeholder="Select your standard" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value='' label="Select Committee Status"></option>
              <option value='President' label="President">President</option>
              <option value='G.Secretary' label="G.Secretary">Secretary</option>
              <option value='F.secretary' label="F.secretary">F.secretary</option>
              <option value='Mazhavil' label="Mazhavil">Mazhavil</option>
              <option value='GD' label="GD">GD</option>
              <option value='QD' label="QD">QD</option>
              <option value='WEFI' label="WEFI">WEFI</option>
              <option value='IT' label="IT">IT</option>
              <option value='Teen star' label="Teen star">Teen star</option>
              <option value='secretariat Member' label="secretariat Member">Secretariat member</option>
              <option value='Member' label="Member">Member</option>
            </select>
            <input required className="w-full  py-2 border-0 border-b-2 border-[#d3e3fdb3] outline-none  bg-transparent placeholder:font-normal placeholder:opacity-50 placeholder:text-[#d3e3fd]" type="text" placeholder='Full name' name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            {/* <input required className="placeholder:text-white w-full border-b-4 border-0 bg-[#00264a] outline-none text-base placeholder:text-base placeholder:font-thin " type="text" placeholder='Contact number' name="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} /> */}
            <input required className="w-full  py-2 border-0 border-b-2 border-[#d3e3fdb3] outline-none  bg-transparent placeholder:font-normal placeholder:opacity-50 placeholder:text-[#d3e3fd]" type="number" placeholder='Age' name="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <select required className="w-full  py-2 border-0 border-b-2 border-[#d3e3fdb3] outline-none  bg-transparent placeholder:font-normal placeholder:opacity-50 placeholder:text-[#d3e3fd]" placeholder="Select your standard" value={standard} onChange={(e) => setStandard(e.target.value)}>
              <option value='' label="Select Standard"></option>
              <option value='1' label="1">1</option>
              <option value='2' label="2">2</option>
              <option value='3' label="3">3</option>
              <option value='4' label="4">4</option>
              <option value='5' label="5">5</option>
              <option value='6' label="6">6</option>
              <option value='7' label="7">7</option>
              <option value='8' label="8">8</option>
              <option value='9' label="9">9</option>
              <option value='10' label="10">10</option>
              <option value='+1' label="+1">+1</option>
              <option value='+2' label="+2">+2</option>
              <option value='Degree 1st' label="Degree 1st">Degree 1st</option>
              <option value='Degree 2nd' label="Degree 2nd">Degree 2nd</option>
              <option value='Degree 3rd' label="Degree 3rd">Degree 3rd</option>
              <option value='PG' label="PG">PG</option>
              <option value='Other' label="Other">Other</option>
            </select>
            <textarea required className="lg:col-span-2 xl:col-span-3 w-full  py-2 border-0 border-b-2 border-[#d3e3fdb3] outline-none  bg-transparent placeholder:font-normal placeholder:opacity-50 placeholder:text-[#d3e3fd]" placeholder='Address' name="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <div className='w-full flex flex-col gap-5 md:flex-row items-center justify-between'>
            {loading ? (
              <AiOutlineLoading className='w-auto animate-spin text-[#fff] text-2xl mr-2' />
            ) : isSignUpCompleted ? (
              <p className='w-auto text-[#fff] font-medium'>
                Sign up completed ✓
              </p>
            ) : (
              <button
                type='submit'
                className='bg-[#39b54a] py-1.5 px-4 w-full md:w-auto  text-white font-medium rounded-md uppercase hover:bg-[#4caf50] transition duration-300'
              >
                Sign up
              </button>
            )}
            <Link to='/Signin'>
              <p className='text-[#d3e3fd78]'>
                Already have an account ? <span className='text-[#d3e3fd] tracking-wider'>Sign in</span>
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
