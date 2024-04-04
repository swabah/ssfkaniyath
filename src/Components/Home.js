import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../Firebase/Config';
import { LuCode2 } from "react-icons/lu";
import ssfview from './assets/images/ssfview.jpg'
import dates from './assets/images/dates.png'

function Home() {
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userCollectionRef = collection(db, 'members');
        const querySnapshot = await getDocs(userCollectionRef);
        const users = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserList(users);
        setLoading(false);
        console.log(users);
      } catch (error) {
        alert(error);
      }
    };

    fetchData();

    // if (!auth.currentUser) {
    //   navigate('/signin')
    // }
  }, []);


  return (
    <div className='w-full h-full '>
      <div style={{ backgroundImage: `url(${ssfview})` }} className='bg-no-repaet text-[#d3e3fd] flex flex-col items-center justify-center bg-center relative bg-[#071a2b] overflow-hidden w-full p-7 md:px-44 lg:px-24 xl:px-64 py-16 md:py-24 lg:py-32'>
        <div className='z-10 flex flex-col items-center gap-7 '>
          <h1 className='text-5xl font-bold text-center lg:text-7xl'>Become a Member</h1>
          <Link to='/Signup'>
            <button className='hover:bg-[#39b54a] hover:border-[#d3e3fd] hover:bg-opacity-20 uppercase md:text-lg lg:text-xl border-2 shadow-lg border-[#39b54a] tracking-wider border rounded-3xl p-1 px-5'>Join us</button>
          </Link>
        </div>
        <div className='absolute inset-0 w-full h-full bg-[#071a2b] opacity-50'></div>
        {/* <img src={flag} className='absolute left-0 skew-y-6 saturate-50 drop-shadow-xl hue-rotate-15 -bottom-16 w-96' /> */}
      </div>
      <div className='bg-[#031525] py-20 text-white w-full flex flex-col items-start gap-y-6 h-full p-7 md:px-44 lg:px-24  xl:px-64'>
        <p className='font-medium text-2xl text-[#d3e3fdb3]'>All Unit Members</p>
        <div className='grid w-full h-auto grid-cols-1 gap-6 lg:grid-cols-3 grid-rows-auto'>
          {loading ? (
            <>
              <div className='animate-pulse rounded-xl w-full h-44 bg-[#071a2b]'></div>
              <div className='animate-pulse rounded-xl w-full h-44 bg-[#071a2b]'></div>
              <div className='animate-pulse rounded-xl w-full h-44 bg-[#071a2b]'></div>
            </>
          ) : <>
            {userList.filter((user) => user.Status === 'President').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'G.Secretary').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'F.secretary').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'Mazhavil').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'GD').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'QD').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'WEFI').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'IT').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'Teen star').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'secretariat Member').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
            {userList.filter((user) => user.Status === 'Member').map((mem) => (
              <div className='hover:bg-[#0d2136] cursor-pointer rounded-xl p-5 px-8 bg-[#071a2b] w-full '>
                <p className='font-medium text-[#d3e3fd] capitalize text-xl tracking-wide'>{mem.fullName}</p>
                <p className=' font-thin text-lg text-[#d3e3fdb3]'>( {mem.Status} )</p>
                <LuCode2 className='text-[#d3e3fdb3] text-2xl mt-16' />
              </div>
            ))}
          </>}
        </div>
        <div className='h-[.5px] bg-[#d3e3fdb3] opacity-30 w-full my-7'></div>
        <p className='font-medium text-2xl text-[#d3e3fdb3]'>Programmes</p>
        <div className='grid w-full h-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          <Link to='challenge/dates'>
            <div className='relative flex flex-col items-center text-center border-[1px] border-[#d3e3fdb3]/30 rounded-xl p-5 lg:col-span-1'>
              <p className=' text-[#d3e3fd] text-lg'>We've Embarked on a Date Challenge! </p>
              <img src={dates} className='py-5' />
              <p className='text-[#d3e3fd]'> #Ramadan #DateChallenge #AdventureAwaits 🌟</p>
            </div>
          </Link>
          <div className='border-[1px] border-[#d3e3fdb3]/30 rounded-xl p-5 lg:col-span-2'>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
