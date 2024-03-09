import { addDoc, collection, deleteDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase/Config';
import datesfriuts from '../assets/images/datesfriuts.jpg'
import { BsArrowDownCircle } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import ParticipateModal from '../assets/Challenges/ParticipateModal';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { TECollapse } from "tw-elements-react";
import { BsClipboard2PlusFill } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";

function Admin() {
    const [Participates, setParticipates] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [ExpenceCash, setExpenceCash] = useState('');
    const [Expence, setExpence] = useState('');
    const [ExpenceList, setExpenceList] = useState([]);
    const [showModalId, setShowModalId] = useState(null);
    const navigate = useNavigate();

    const [activeElement, setActiveElement] = useState("");

    const handleClick = (value) => {
        if (value === activeElement) {
            setActiveElement("");
        } else {
            setActiveElement(value);
        }
    };


    function showPartiModal(Token) {
        navigate(`/challenge/Admin/${Token}`);
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
                        setFetchLoading(false)
                    }
                );

                return unsubscribe;
            } catch (error) {
                alert(error);
            }
        };

        const fetchExpenceData = async () => {
            try {
                const userCollectionRef = collection(db, 'Expences');
                const unsubscribe = onSnapshot(
                    query(userCollectionRef, orderBy('Date', 'desc')), // or 'desc' based on your requirement
                    (querySnapshot) => {
                        const ExpenceList = querySnapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }));
                        setExpenceList(ExpenceList);
                    }
                );

                return unsubscribe;
            } catch (error) {
                alert(error);
            }
        };

        fetchExpenceData();
        fetchData();
    }, []);

    const handleAddExpence = async (e) => {
        e.preventDefault();
        try {
            // Perform Expence Detailes
            const path = collection(db, 'Expences');
            await addDoc(path, {
                Expence,
                ExpenceCash,
                Date: new Date()
            });
            setTimeout(() => {
                setExpence('')
                setExpenceCash('')
            }, 500);
        } catch (error) {
            alert(error.message);
        }
    };

    const deleteExpenceWithoutUid = async (par) => {
        try {
          const querySnapshot = await getDocs(
            query(collection(db, 'Expences'),
              where('Expence', '==', par.Expence),
              where('ExpenceCash', '==', par.ExpenceCash),
              where('Date', '==', par.Date)
            )
          );
    
          if (!querySnapshot.empty) {
            const documentToDelete = querySnapshot.docs[0];
            await deleteDoc(documentToDelete.ref);
          } else {
            console.log('No matching documents found.');
          }
        } catch (error) {
          console.error('Error deleting document:', error);
        }
      };

    return (
        <div className='flex flex-col w-full h-full'>
            <div style={{ backgroundImage: `url(${datesfriuts})` }} className='bg-no-repeat bg-cover text-[#d3e3fd] flex flex-col items-center justify-center bg-center relative bg-[#071a2b] overflow-hidden w-full p-7 md:px-44 lg:px-24 xl:px-64 py-16 md:py-24 lg:py-32'>
                <div className='z-10 flex flex-col items-center gap-10 '>
                    <h1 className='text-5xl font-bold text-center lg:text-7xl'>Challenge Admin</h1>
                    <a href='#admin' className='text-xl shadow-lg md:text-2xl lg:text-3xl animate-bounce'><BsArrowDownCircle /></a>
                </div>
                <div className='absolute inset-0 w-full h-full bg-[#071a2b] opacity-50'></div>
            </div>
            <Link to='/challenge/Dates'>
                <div className='w-full lg:w-auto gap-x-4 p-2 px-7 md:px-20 lg:px-32 xl:px-44 font-medium lg:text-xl bg-[#071a2b] flex justify-start items-center text-[#d3e3fd]'>
                    <FaCircleArrowLeft className='text-lg lg:text-2xl' />
                    <p> Challenge Registration </p>
                </div>
            </Link>
            <div className='flex flex-col w-full h-full gap-5 py-14 lg:py-20 p-7 md:px-20 lg:px-32 xl:px-44'>
                <div className='flex flex-col pb-10'>
                    <div onClick={() => handleClick("expence")}
                        aria-expanded="true"
                        aria-controls="expence" className='p-2 px-6 rounded-t font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                        <p>Challenge Expences</p>
                        <span>{ExpenceList.length}</span>
                    </div>
                    <TECollapse
                        show={activeElement === "expence"}
                        className="!mt-0 !rounded-b-none !shadow-none"
                    >
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden border rounded-b-lg shadow">
                                    <form onSubmit={handleAddExpence}>
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm">Expense</th>
                                                    <th className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm">Cash</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {fetchLoading ? (
                                                    <>
                                                        <tr>
                                                            <td className='w-full h-12 bg-gray-100 animate-pulse'></td>
                                                            <td className='w-full h-12 bg-gray-100 animate-pulse'></td>
                                                        </tr>
                                                        <tr>
                                                            <td className='w-full h-12 bg-gray-100 animate-pulse'></td>
                                                            <td className='w-full h-12 bg-gray-100 animate-pulse'></td>
                                                        </tr>
                                                    </>
                                                ) : (
                                                    <>
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-nowrap font-medium text-[#071a2b] capitalize">
                                                                <input required className="w-full p-0 py-2 border-0 border-b border-gray-300 outline-none ring-0 placeholder:font-normal placeholder:opacity-50 placeholder:text-black " type="text" placeholder='Type Expense' name="contact" value={Expence} onChange={(e) => setExpence(e.target.value)} />
                                                            </td>
                                                            <td className="px-6 py-4 flex items-center justify-between whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize">
                                                                <input className='w-1/2' required placeholder='Cash' value={ExpenceCash} type='number' onChange={(e) => setExpenceCash(e.target.value)} />
                                                                <button type="submit"><BsClipboard2PlusFill className='text-xl' /></button>
                                                            </td>
                                                        </tr>
                                                        {ExpenceList.map((ex) => (
                                                            <tr key={ex.id}>
                                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-[#071a2b] capitalize">{ex.Expence}</td>
                                                                <td className="px-6 py-4 flex items-center justify-between whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize">
                                                                    <p>{ex.ExpenceCash}</p>
                                                                    <button onClick={() => deleteExpenceWithoutUid(ex)}><RiDeleteBin6Line  className='text-xl' /></button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </>
                                                )}
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        </div>

                    </TECollapse>
                </div>
                <div id='admin' className='grid items-start grid-cols-1 gap-5 lg:grid-cols-2'>
                    {Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary').length > 0 && (
                        <div className="flex flex-col">
                            <div onClick={() => handleClick("1")}
                                aria-expanded="true"
                                aria-controls="1"
                                className='p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                                <p>Primary</p>
                                <span> {Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary').length} </span>
                            </div>
                            <div className='grid grid-cols-1 p-6 lg:grid-cols-2'>
                                <p className='col-span-2 pb-2 text-xl'>
                                    Challenge Rate : <span className='text-xl'>330</span>
                                </p>
                                <p className='text-xl'>
                                    Shop Rate : <span className='text-xl'>221.66</span>
                                </p>
                                <p className='text-xl'>
                                    Commition : <span className='text-xl'>109.66</span>
                                </p>
                                <hr className='col-span-2 my-1.5' />
                                <p className='text-xl'>
                                    Totel : <span className='text-lg'>{Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary').length} * 330 =  {Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary').length * 330}</span>
                                </p>
                                <p className='text-xl'>
                                    Profit : <span className='text-lg'>{Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary').length} * 109 =  {Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary').length * 109}</span>
                                </p>
                                <p className='text-xl'>
                                    Arrival : <span className='text-lg'>{Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary' && par.isPaid).length} * 330 =  {Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary' && par.isPaid).length * 330}</span>
                                </p>
                                <p className='text-xl'>
                                    Pending : <span className='text-lg'>{Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary' && !par.isPaid).length} * 330 =  {Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary' && !par.isPaid).length * 330}</span>
                                </p>
                            </div>
                            <TECollapse
                                show={activeElement === "1"}
                                className="!mt-0 !rounded-b-none !shadow-none"
                            >
                                <div className="overflow-x-auto ">
                                    <div className="inline-block min-w-full align-middle">
                                        <div className="overflow-hidden border rounded-lg shadow ">
                                            <table className="min-w-full divide-y divide-gray-200 ">
                                                <thead className="">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Payment</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Token</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">P.Type</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">View</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 ">
                                                    {fetchLoading ? (
                                                        <>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                        </>
                                                    ) : <>
                                                        {Participates.filter((par) => par.Package === '1 kg' && par.PackageType === 'Primary').map((par) => (
                                                            <tr>
                                                                <td class="px-6 py-4 whitespace-nowrap font-medium text-[#071a2b] capitalize ">{par?.isPaid ? (<FcCheckmark />) : (<FcCancel />)}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.fullName}</td>
                                                                <td className="px-6 py-4 text-sm capitalize whitespace-nowrap ">{(par?.PackageType === 'Primary') ? (<p className='text-green-500' >{par.PackageType}</p>) : (<p className='text-red-500' >{par.PackageType}</p>)}</td>
                                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                                    <button onClick={() => showPartiModal(par.Token)} type="button" className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">View</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </TECollapse>
                        </div>
                    )}
                    {Participates.filter((par) => par.PackageType === 'Secendary').length > 0 && (
                        <div className="flex flex-col ">
                            <div onClick={() => handleClick("2")}
                                aria-expanded="true"
                                aria-controls="2" className='p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                                <p>Secendary</p>
                                <span> {Participates.filter((par) => par.PackageType === 'Secendary').length} </span>
                            </div>
                            <div className='grid grid-cols-1 p-6 lg:grid-cols-2'>
                                <p className='col-span-2 pb-2 text-xl'>
                                    Challenge Rate : <span className='text-xl'>260</span>
                                </p>
                                <p className='text-xl '>
                                    Shop Rate : <span className='text-xl'>135.6</span>
                                </p>
                                <p className='text-xl'>
                                    Commition Rate : <span className='text-xl'>125</span>
                                </p>
                                <hr className='col-span-2 my-1.5' />
                                <p className='text-xl'>
                                    Totel : <span className='text-lg'>{Participates.filter((par) => par.PackageType === 'Secendary').length} * 260 =  {Participates.filter((par) => par.PackageType === 'Secendary').length * 260}</span>
                                </p>
                                <p className='text-xl'>
                                    Profit : <span className='text-lg'>{Participates.filter((par) => par.PackageType === 'Secendary').length} * 124.5 =  {Participates.filter((par) => par.PackageType === 'Secendary').length * 124.5}</span>
                                </p>
                                <p className='text-xl'>
                                    Arrival : <span className='text-lg'>{Participates.filter((par) => par.PackageType === 'Secendary' && par.isPaid).length} * 260 =  {Participates.filter((par) => par.PackageType === 'Secendary' && par.isPaid).length * 260}</span>
                                </p>
                                <p className='text-xl'>
                                    Pending : <span className='text-lg'>{Participates.filter((par) => par.PackageType === 'Secendary' && !par.isPaid).length} * 260 =  {Participates.filter((par) => par.PackageType === 'Secendary' && !par.isPaid).length * 260}</span>
                                </p>
                            </div>
                            <TECollapse
                                show={activeElement === "2"}
                                className="!mt-0 !rounded-b-none !shadow-none"
                            >
                                <div className="overflow-x-auto ">
                                    <div className="inline-block min-w-full align-middle">
                                        <div className="overflow-hidden border rounded-lg shadow ">
                                            <table className="min-w-full divide-y divide-gray-200 ">
                                                <thead className="">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Payment</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Token</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">P.Type</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">View</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 ">
                                                    {fetchLoading ? (
                                                        <>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                        </>
                                                    ) : <>
                                                        {Participates.filter((par) => par.PackageType === 'Secendary').map((par) => (
                                                            <tr>
                                                                <td class="px-6 py-4 whitespace-nowrap font-medium text-[#071a2b] capitalize ">{par?.isPaid ? (<FcCheckmark />) : (<FcCancel />)}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.fullName}</td>
                                                                <td className="px-6 py-4 text-sm capitalize whitespace-nowrap ">{(par?.PackageType === 'Primary') ? (<p className='text-green-500' >{par.PackageType}</p>) : (<p className='text-red-500' >{par.PackageType}</p>)}</td>
                                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                                    <button onClick={() => showPartiModal(par.Token)} type="button" className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">View</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </TECollapse>
                        </div>
                    )}
                </div>
                <div className='grid items-start grid-cols-1 gap-5 lg:grid-cols-2'>
                    {Participates.filter((par) => par.Package === '500 g').length > 0 && (
                        <div className="flex flex-col">
                            <div onClick={() => handleClick("4")}
                                aria-expanded="true"
                                aria-controls="4" className='p-2 px-6 rounded font-medium lg:text-xl bg-[#d3e3fdb3] flex justify-between items-center text-[#071a2b'>
                                <p>500 g</p>
                                <span> {Participates.filter((par) => par.Package === '500 g').length} </span>
                            </div>
                            <div className='grid grid-cols-1 p-6 lg:grid-cols-2'>
                                <p className='col-span-2 pb-2 text-xl'>
                                    Challenge Rate : <span className='text-xl'>165</span>
                                </p>
                                <p className='text-xl'>
                                    Shop Rate : <span className='text-xl'>110.5</span>
                                </p>
                                <p className='text-xl'>
                                    Commition : <span className='text-xl'>54.5</span>
                                </p>
                                <hr className='col-span-2 my-1.5' />
                                <p className='text-xl'>
                                    Totel : <span className='text-lg'>{Participates.filter((par) => par.Package === '500 g').length} * 165 =  {Participates.filter((par) => par.Package === '500 g').length * 165}</span>
                                </p>
                                <p className='text-xl'>
                                    Profit : <span className='text-lg'>{Participates.filter((par) => par.Package === '500 g').length} * 54.5 =  {Participates.filter((par) => par.Package === '500 g').length * 54.5}</span>
                                </p>
                                <p className='text-xl'>
                                    Arrival : <span className='text-lg'>{Participates.filter((par) => par.Package === '500 g' && par.isPaid).length} * 165 =  {Participates.filter((par) => par.Package === '500 g' && par.isPaid).length * 165}</span>
                                </p>
                                <p className='text-xl'>
                                    Pending : <span className='text-lg'>{Participates.filter((par) => par.Package === '500 g' && !par.isPaid).length} * 165 =  {Participates.filter((par) => par.Package === '500 g' && !par.isPaid).length * 165}</span>
                                </p>
                            </div>
                            <TECollapse
                                show={activeElement === "4"}
                                className="!mt-0 !rounded-b-none !shadow-none"
                            >
                                <div className="overflow-x-auto ">
                                    <div className="inline-block min-w-full align-middle">
                                        <div className="overflow-hidden border rounded-lg shadow ">
                                            <table className="min-w-full divide-y divide-gray-200 ">
                                                <thead className="">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Payment</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Token</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">P.Type</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">View</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 ">
                                                    {fetchLoading ? (
                                                        <>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                        </>
                                                    ) : <>
                                                        {Participates.filter((par) => par.Package === '500 g').map((par) => (
                                                            <tr>
                                                                <td class="px-6 py-4 whitespace-nowrap font-medium text-[#071a2b] capitalize ">{par?.isPaid ? (<FcCheckmark />) : (<FcCancel />)}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.fullName}</td>
                                                                <td className="px-6 py-4 text-sm capitalize whitespace-nowrap ">{(par?.PackageType === 'Primary') ? (<p className='text-green-500' >{par.PackageType}</p>) : (<p className='text-red-500' >{par.PackageType}</p>)}</td>
                                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                                    <button onClick={() => showPartiModal(par.Token)} type="button" className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">View</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </TECollapse>
                        </div>
                    )}
                    {Participates.filter((par) => par.Package === '250 g').length > 0 && (
                        <div className="flex flex-col ">
                            <div onClick={() => handleClick("5")}
                                aria-expanded="true"
                                aria-controls="5" className='p-2 px-6 rounded font-medium lg:text-xl bg-[#d3e3fdb3] flex justify-between items-center text-[#071a2b]'>
                                <p>250 g</p>
                                <span> {Participates.filter((par) => par.Package === '250 g').length} </span>
                            </div>
                            <div className='grid grid-cols-1 p-6 lg:grid-cols-2'>
                                <p className='col-span-2 pb-2 text-xl'>
                                    Challenge Rate : <span className='text-xl'>82.5</span>
                                </p>
                                <p className='text-xl'>
                                    Shop Rate : <span className='text-xl'>55.66</span>
                                </p>
                                <p className='text-xl'>
                                    Commition : <span className='text-xl'>26.5</span>
                                </p>
                                <hr className='col-span-2 my-1.5' />
                                <p className='text-xl'>
                                    Totel : <span className='text-lg'>{Participates.filter((par) => par.Package === '250 g').length} * 82 =  {Participates.filter((par) => par.Package === '500 g').length * 82}</span>
                                </p>
                                <p className='text-xl'>
                                    Profit : <span className='text-lg'>{Participates.filter((par) => par.Package === '250 g').length} * 26.5 =  {Participates.filter((par) => par.Package === '250 g').length * 26.5}</span>
                                </p>
                                <p className='text-xl'>
                                    Arrival : <span className='text-lg'>{Participates.filter((par) => par.Package === '250 g' && par.isPaid).length} * 82 =  {Participates.filter((par) => par.Package === '250 g' && par.isPaid).length * 82}</span>
                                </p>
                                <p className='text-xl'>
                                    Pending : <span className='text-lg'>{Participates.filter((par) => par.Package === '250 g' && !par.isPaid).length} * 82 =  {Participates.filter((par) => par.Package === '250 g' && !par.isPaid).length * 82}</span>
                                </p>
                            </div>
                            <TECollapse
                                show={activeElement === "5"}
                                className="!mt-0 !rounded-b-none !shadow-none"
                            >
                                <div className="overflow-x-auto ">
                                    <div className="inline-block min-w-full align-middle">
                                        <div className="overflow-hidden border rounded-lg shadow ">
                                            <table className="min-w-full divide-y divide-gray-200 ">
                                                <thead className="">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Payment</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Token</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">P.Type</th>
                                                        <th scope="col" className="px-6 py-3 text-xs font-medium uppercase text-start lg:text-sm ">View</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 ">
                                                    {fetchLoading ? (
                                                        <>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                            <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                        </>
                                                    ) : <>
                                                        {Participates.filter((par) => par.Package === '250 g').map((par) => (
                                                            <tr>
                                                                <td class="px-6 py-4 whitespace-nowrap font-medium text-[#071a2b] capitalize ">{par?.isPaid ? (<FcCheckmark />) : (<FcCancel />)}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.fullName}</td>
                                                                <td className="px-6 py-4 text-sm capitalize whitespace-nowrap ">{(par?.PackageType === 'Primary') ? (<p className='text-green-500' >{par.PackageType}</p>) : (<p className='text-red-500' >{par.PackageType}</p>)}</td>
                                                                <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                                                    <button onClick={() => showPartiModal(par.Token)} type="button" className="inline-flex items-center text-sm font-semibold text-blue-600 border border-transparent rounded-lg gap-x-2 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">View</button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </TECollapse>
                        </div>
                    )}
                </div>
            </div>

            {Participates.map((par) => (
                <React.Fragment key={par.Token}>
                    {showModalId === par.Token && (
                        <ParticipateModal
                            onClose={closeModal}
                            onRequest={() => showPartiModal(par.Token)}
                            closePath='/challenge/Admin'
                            par={par} // Pass the selected item to the modal
                        />
                    )}
                </React.Fragment>
            ))}

        </div>
    )
}


export default Admin

