import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase/Config';
import datesfriuts from '../assets/images/datesfriuts.jpg'
import { BsArrowDownCircle } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import ParticipateModal from '../assets/Challenges/ParticipateModal';
import { FcCancel, FcCheckmark } from 'react-icons/fc';
import { FaCircleArrowLeft } from 'react-icons/fa6';

function Admin() {
    const [Participates, setParticipates] = useState([]);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [showModalId, setShowModalId] = useState(null);
    const navigate = useNavigate();


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
            <div className='w-full h-full gap-12 py-14 lg:py-20 p-7 md:px-20 lg:px-32 xl:px-44'>
                <div id='admin' className='grid items-start grid-cols-1 gap-5 lg:grid-cols-3'>
                    {/* {Participates.filter((par) => par.Package === '500 g').length > 0 && (
                        <div className="flex flex-col gap-y-5">
                            <div className='p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                                <p>500 g</p>
                                <span> {Participates.filter((par) => par.Package === '500 g').length} </span>
                            </div>
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
                                                    {Participates.filter((par) => par.Package === '500 g').map((par) => (
                                                        <tr>
                                                            <td class="px-6 py-4 whitespace-nowrap font-medium text-[#071a2b] capitalize ">{par?.isPaid ? (<FcCheckmark />) : (<FcCancel />)}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#071a2b] capitalize ">{par.fullName}</td>
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
                        </div>
                    )}
                    {Participates.filter((par) => par.Package === '1 kg').length > 0 && (
                        <div className="flex flex-col gap-y-5">
                            <div className='p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                                <p>1 kg</p>
                                <span> {Participates.filter((par) => par.Package === '1 kg').length} </span>
                            </div>
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
                                                    {Participates.filter((par) => par.Package === '1 kg').map((par) => (
                                                        <tr>
                                                            <td class="px-6 py-4 whitespace-nowrap font-medium text-[#071a2b] capitalize ">{par?.isPaid ? (<FcCheckmark />) : (<FcCancel />)}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-[#071a2b] capitalize ">{par.fullName}</td>
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
                        </div>
                    )} */}
                    {Participates.filter((par) => par.PackageType === 'Primary').length > 0 && (
                        <div className="flex flex-col gap-y-5">
                            <div className='p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                                <p>Primary</p>
                                <span> {Participates.filter((par) => par.PackageType === 'Primary').length} </span>
                            </div>
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
                                                    {Participates.filter((par) => par.PackageType === 'Primary').map((par) => (
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
                        </div>
                    )}
                    {Participates.filter((par) => par.PackageType === 'Secendary').length > 0 && (
                        <div className="flex flex-col gap-y-5">
                            <div className='p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                                <p>Secendary</p>
                                <span> {Participates.filter((par) => par.PackageType === 'Secendary').length} </span>
                            </div>
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
                        </div>
                    )}
                </div>
                <div>

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