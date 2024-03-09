import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../../Firebase/Config';
import { AiOutlineLoading } from 'react-icons/ai';
import { FcCancel, FcCheckmark } from "react-icons/fc";
import { MdMyLocation } from "react-icons/md";
import datesfriuts from '../assets/images/datesfriuts.jpg'
import { BsArrowDownCircle } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import ParticipateModal from '../assets/Challenges/ParticipateModal';
import { FaCircleArrowRight } from "react-icons/fa6";
import token from '../assets/images/token.png'

function Challenge() {
    const [loading, setLoading] = useState(false);
    const [locationLoading, setLoactionLoading] = useState(false);
    const [isRegisterCompleted, setIsRegisterCompleted] = useState(false);
    const [isLocationCompleted, setIsLocationCompleted] = useState(false);
    const [fullName, setFullName] = useState('');
    const [Package, setPackage] = useState('');
    const [PackageType, setPackageType] = useState('');
    const [Contact, setContact] = useState('');
    const [Address, setAddress] = useState('');
    const [isPaid, setIsPaid] = useState(false);
    const [Location, setLocation] = useState({});
    const [Participates, setParticipates] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [showModalId, setShowModalId] = useState(null);
    const navigate = useNavigate();

    const Token = 100 + Participates.length;


    function showPartiModal(Token) {
        navigate(`/challenge/dates/${Token}`);
        if (!showModalId) {
            document.getElementsByTagName('html')[0].classList.add('overflow-y-hidden');
        } else {
            document.getElementsByTagName('html')[0].classList.remove('overflow-y-hidden');
        }
        setShowModalId(Token);
    }

    function closeModal() {
        document.getElementsByTagName('html')[0].classList.remove('overflow-y-hidden');
        setShowModalId(null);
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            // Perform user registration logic
            const path = collection(db, 'challengeParticipates');
            await addDoc(path, {
                Token,
                fullName,
                Package,
                Contact,
                Address,
                Location,
                isPaid,
                PackageType,
                registerDate: new Date(),
            });

            setIsRegisterCompleted(true);
            setTimeout(() => {
                setIsRegisterCompleted(false);
                setAddress('');
                setFullName('');
                setPackage('');
                setContact('');
                setPackageType('');
                setLocation(null);
                setIsPaid(false);
                setIsLocationCompleted(false)
            }, 1000);
        } catch (error) {
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userCollectionRef = collection(db, 'challengeParticipates');
                const unsubscribe = onSnapshot(
                    query(userCollectionRef, orderBy('Token', 'desc')), // or 'desc' based on your requirement
                    (querySnapshot) => {
                        const Participates = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setParticipates(Participates);
                        setFetchLoading(false);
                    }
                );

                return unsubscribe;
            } catch (error) {
                alert(error);
            }
        };

        fetchData();
    }, []);

    const getLocation = () => {
        setLoactionLoading(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
                setLoactionLoading(false)
                setIsLocationCompleted(true)
                setSubmitDisabled(false); // Enable submit button after location selection
            },
            (error) => {
                console.log(error);
            }
        );
    };

    console.log(PackageType);

    return (
        <div className='flex flex-col w-full h-full'>
            <div style={{ backgroundImage: `url(${datesfriuts})` }} className='bg-no-repeat bg-cover text-[#d3e3fd] flex flex-col items-center justify-center bg-center relative bg-[#071a2b] overflow-hidden w-full p-7 md:px-44 lg:px-24 xl:px-64 py-16 md:py-24 lg:py-32'>
                <div className='z-10 flex flex-col items-center gap-10 '>
                    <h1 className='text-5xl font-bold text-center lg:text-7xl'>Challenge Registration</h1>
                    <a href='#regForm' className='text-xl shadow-lg md:text-2xl lg:text-3xl animate-bounce'><BsArrowDownCircle /></a>
                </div>
                <div className='absolute inset-0 w-full h-full bg-[#071a2b] opacity-50'></div>
            </div>
            <div id='regForm' className='w-full h-full pt-24 pb-12 lg:pt-32 p-7 md:px-20 lg:px-32 xl:px-44 '>
                <form onSubmit={handleRegister} className='w-full h-auto space-y-7'>
                    <div className='flex flex-col items-center justify-between w-full gap-10 md:gap-4 md:flex-row lg:w-auto'>
                        <div className='relative w-auto'>
                            <img src={token} alt="Token NO:" className='w-full -m-1 md:w-32 saturate-50' />
                            <div className='absolute inset-0 flex items-center justify-center w-full h-full'>
                                <p className='mt-1 mr-16 text-6xl font-medium tracking-wider text-white md:mr-8 md:text-xl'>{Token}</p>
                            </div>
                        </div>
                        <select required className="w-full md:w-auto px-5 py-2 border border-[#d3e3fd] font-medium md:rounded-r-xl bg-[#d3e3fdb3] md:text-lg text-[#031525]" value={PackageType} onChange={(e) => setPackageType(e.target.value)}>
                            <option value="" label="">Select Type</option>
                            <option value="Primary" label="Primary">Primary</option>
                            <option value="Secendary" label="Secendary">Secendary</option>
                        </select>
                    </div>
                    <div className='grid w-full h-full grid-cols-1 gap-5 pt-5 lg:pt-10 lg:grid-cols-3 grid-rows-auto'>
                        <input required className="w-full p-0 py-2 border-0 border-b border-gray-300 outline-none ring-0 placeholder:font-normal placeholder:opacity-50 placeholder:text-black " type="text" placeholder='Full name' name="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <input required className="w-full p-0 py-2 border-0 border-b border-gray-300 outline-none ring-0 placeholder:font-normal placeholder:opacity-50 placeholder:text-black " type="number" placeholder='Mobile number' name="contact" value={Contact} onChange={(e) => setContact(e.target.value)} />
                        <select required className="w-full p-0 py-2 border-0 border-b border-gray-300 outline-none ring-0 placeholder:font-normal placeholder:opacity-50 placeholder:text-black" value={Package} onChange={(e) => setPackage(e.target.value)}>
                            <option value="" label="Select Package">Select your Package</option>
                            <option value="250 g" label="250 g">250 g</option>
                            <option value="500 g" label="500 g">500 g</option>
                            <option value="1 kg" label="1 Kg">1 kg</option>
                            <option value="2 kg" label="2 Kg">2 kg</option>
                            <option value="3 kg" label="3 Kg">3 kg</option>
                        </select>
                        <textarea className="w-full p-0 py-2 border-0 border-b border-gray-300 outline-none lg:col-span-3 ring-0 placeholder:font-normal placeholder:opacity-50 placeholder:text-black " placeholder='Address' name="Address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    {Location?.latitude && Location?.longitude && (
                        <p className='w-full px-6 py-2 bg-gray-50'>" {Location?.latitude} {Location?.longitude} "</p>
                    )}
                    <div className='flex flex-col items-center justify-between w-full gap-5 lg:flex-row'>
                        <div className='flex flex-col items-center justify-start w-full gap-4 md:flex-row lg:w-auto'>
                            <span onClick={getLocation} className='flex items-center justify-start w-full px-4 py-2 bg-gray-100 rounded-lg cursor-pointer md:text-lg lg:w-auto gap-x-4'>
                                {locationLoading ? (
                                    <AiOutlineLoading className='w-auto animate-spin text-[#39b54a] text-2xl mr-2' />
                                ) : isLocationCompleted ? (
                                    <p className='w-auto text-lg font-medium'>Location Success ✓</p>
                                ) : <>
                                    <MdMyLocation className='text-xl md:text-2xl' />
                                    <p>Use precise location</p>
                                </>}
                            </span>
                            <div className='flex items-center justify-between w-full px-4 py-2 bg-gray-100 rounded-lg lg:justify-start gap-x-4 lg:w-auto md:text-lg '>
                                <p>Paid Cash</p>
                                <input type='checkbox' checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />
                            </div>
                        </div>
                        {loading ? (
                            <AiOutlineLoading className='w-auto animate-spin text-[#39b54a] text-2xl mr-2' />
                        ) : isRegisterCompleted ? (
                            <p className='w-auto text-[#39b54a] text-lg font-medium'>Register completed ✓</p>
                        ) : (
                            <button
                                disabled={submitDisabled}
                                type='submit'
                                className={`bg-[#39b54a] py-2 px-4 w-full lg:w-auto  text-white font-medium rounded-md uppercase hover:bg-[#4caf50] transition duration-300 ${submitDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                Register Challenge
                            </button>
                        )}
                    </div>
                </form>
            </div>
            {(Participates.length > 0 && (auth?.currentUser?.email === 'ahmedswabah922@gmail.com' || 'kmuhammedktr@gmail.com')) && <>
                <hr className='my-8' />
                <div class="pb-14 lg:pb-20 p-7 md:px-20 lg:px-32 xl:px-44  flex flex-col gap-y-5">
                    <Link to='/challenge/admin'>
                        <div className='w-full lg:w-auto p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                            <p> Challenge Admin </p>
                            <FaCircleArrowRight className='text-lg lg:text-2xl' />
                        </div>
                    </Link>
                    <div className='flex flex-col items-center justify-between w-full h-auto gap-3 md:flex-row '>
                        <div className='flex items-center w-full md:w-auto'>
                            <p className='w-auto px-5 py-2  border-l border-[#d3e3fd] border-0 rounded-l-xl bg-[#031525] text-lg md:text-xl font-medium text-[#d3e3fd]'>{Participates.length}</p>
                            <p className='w-full md:w-auto h-full px-5 py-2 border-r border-[#d3e3fd] border-0 rounded-r-xl bg-[#d3e3fdb3] text-lg md:text-xl italic text-[#031525]'>All Participates </p>
                        </div>
                        <div className='flex items-center w-auto gap-1'>
                            <div className='flex items-center'>
                                <p className='w-auto h-full px-5 py-3 border-r border-[#d3e3fd] border-0 rounded-l-xl bg-[#d3e3fdb3] text-lg md:text-xl italic text-[#031525]'><FcCheckmark /></p>
                                <p className='w-auto px-5 py-2  border-l border-[#d3e3fd] border-0 rounded-r-xl bg-[#031525] md:text-lg font-medium text-[#d3e3fd]'>#{Participates.filter((par) => par.isPaid).length}</p>
                            </div>
                            <div className='flex items-center'>
                                <p className='w-auto h-full px-5 py-3 border-r border-[#d3e3fd] border-0 rounded-l-xl bg-[#d3e3fdb3]  text-lg md:text-xl italic text-[#031525]'><FcCancel /></p>
                                <p className='w-auto px-5 py-2  border-l border-[#d3e3fd] border-0 rounded-r-xl bg-[#031525] md:text-lg font-medium text-[#d3e3fd]'>#{Participates.filter((par) => !par.isPaid).length}</p>
                            </div>
                        </div>
                    </div>
                    <div class=" overflow-x-auto">
                        <div class="min-w-full inline-block align-middle">
                            <div class="border rounded-lg shadow overflow-hidden  ">
                                <table class="min-w-full divide-y divide-gray-200 ">
                                    <thead class=" ">
                                        <tr>
                                            <th scope="col" class="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Payment</th>
                                            <th scope="col" class="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Token</th>
                                            <th scope="col" class="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Package</th>
                                            <th scope="col" class="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Name</th>
                                            <th scope="col" class="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Contact</th>
                                            <th scope="col" class="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">View</th>
                                        </tr>
                                    </thead>
                                    <tbody class="divide-y divide-gray-200 ">
                                        {fetchLoading ? (
                                            <>
                                                <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                            </>
                                        ) : <>
                                            {Participates.map((par) => (
                                                <tr>
                                                    <td class="px-6 py-4 whitespace-nowrap font-medium text-[#071a2b] capitalize ">{par?.isPaid ? (<FcCheckmark />) : (<FcCancel />)}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#071a2b] capitalize ">{par.Package}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.fullName}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-[#071a2b] capitalize ">{par.Contact}</td>
                                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <button onClick={() => showPartiModal(par.Token)} type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-[#071a2b] hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">View</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </>}

            {Participates.map((par) => (
                <React.Fragment key={par.Token}>
                    {showModalId === par.Token && (
                        <ParticipateModal
                            onClose={closeModal}
                            onRequest={() => showPartiModal(par.Token)}
                            closePath='/challenge/dates'
                            par={par} // Pass the selected item to the modal
                        />
                    )}
                </React.Fragment>
            ))}

        </div>
    )
}

export default Challenge