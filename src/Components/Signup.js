import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase/Config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import samvidhanyatra from './assets/images/samvidhanyatra.jpg'
import { AiOutlineLoading } from 'react-icons/ai';

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

      const userCollectionRef = collection(db, 'members');
      await addDoc(userCollectionRef, {
        fullName,
        Email: email,
        Password: password,
        Status: status,
        Address: address,
        Age: age,
        Std: standard,
        userUID: result.user.uid,
      });

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
      <img className='h-96 w-full object-cover bg-cover bg-left' src={samvidhanyatra} alt="hi" />
      <div className='h-full w-full flex flex-col item-center gap-12 lg:gap-20 p-7 py-20 md:p-20 lg:px-44 justify-center'>
        <div className='flex flex-col text-start lg:text-center space-y-1.5'>
          <p className='text-[#39b54a] text-3xl lg:text-4xl'>Welcome to</p>
          <h1 className='text-[#fff] text-5xl xl:text-6xl'>SSF Kaniyath </h1>
        </div>
        <form onSubmit={handleSignup} className='w-full h-auto space-y-7'>
          <div className='text-white grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-auto w-full h-full gap-5'>
            <input required className="placeholder:text-white w-full border-b-4 border-0 outline-none bg-[#00264a] text-base placeholder:text-base placeholder:font-thin" type="email" name="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input required className="placeholder:text-white w-full border-b-4 border-0 bg-[#00264a] outline-none text-base placeholder:text-base placeholder:font-thin " type="password" placeholder='Phone Number ( as Password )' name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <select required className="w-full border-b-4 border-0 bg-[#00264a] outline-none text-base placeholder:text-base placeholder:font-thin" placeholder="Select your standard" value={status} onChange={(e) => setStatus(e.target.value)}>
              <option label="Select Committee Status"></option>
              <option label="President">President</option>
              <option label="G.Secretary">Secretary</option>
              <option label="F.secretary">F.secretary</option>
              <option label="Mazhavil">Mazhavil</option>
              <option label="GD">GD</option>
              <option label="QD">QD</option>
              <option label="WEFI">WEFI</option>
              <option label="IT">IT</option>
              <option label="Teen star">Teen star</option>
              <option label="secretariat Member">Secretariat member</option>
              <option label="Member">Member</option>
            </select>
            <input required className="placeholder:text-white w-full border-b-4 border-0 bg-[#00264a] outline-none text-base placeholder:text-base placeholder:font-thin " type="text" placeholder='Full name' name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            {/* <input required className="placeholder:text-white w-full border-b-4 border-0 bg-[#00264a] outline-none text-base placeholder:text-base placeholder:font-thin " type="text" placeholder='Contact number' name="contactNumber" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} /> */}
            <input required className="placeholder:text-white w-full border-b-4 border-0 bg-[#00264a] outline-none text-base placeholder:text-base placeholder:font-thin " type="number" placeholder='Age' name="Age" value={age} onChange={(e) => setAge(e.target.value)} />
            <select required className="w-full border-b-4 border-0 bg-[#00264a] outline-none text-base placeholder:text-base placeholder:font-thin" placeholder="Select your standard" value={standard} onChange={(e) => setStandard(e.target.value)}>
              <option label="Select Standard"></option>
              <option label="1">1</option>
              <option label="2">2</option>
              <option label="3">3</option>
              <option label="4">4</option>
              <option label="5">5</option>
              <option label="6">6</option>
              <option label="7">7</option>
              <option label="8">8</option>
              <option label="9">9</option>
              <option label="10">10</option>
              <option label="+1">+1</option>
              <option label="+2">+2</option>
              <option label="Degree 1st">Degree 1st</option>
              <option label="Degree 2nd">Degree 2nd</option>
              <option label="Degree 3rd">Degree 3rd</option>
              <option label="PG">PG</option>
              <option label="Other">Other</option>
            </select>
            <textarea required className="lg:col-span-2 xl:col-span-3 placeholder:text-white w-full min-h-12 border-b-4 border-0 bg-[#00264a] outline-none text-base placeholder:text-base placeholder:font-thin" placeholder='Address' name="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
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
              <p className='text-[#808080]'>
                Already have an account ? <span className='text-[#fff] tracking-wider'>Sign in</span>
              </p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
