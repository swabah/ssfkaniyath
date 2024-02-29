import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../Firebase/Config';
import datesfriuts from '../assets/images/datesfriuts.jpg'
import { BsArrowDownCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import ParticipateModal from '../assets/Challenges/ParticipateModal';

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
                    query(userCollectionRef, orderBy('Token', 'asc')), // or 'desc' based on your requirement
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
                    <a href='#admin' className=' text-xl   md:text-2xl lg:text-3xl  shadow-lg  animate-bounce '><BsArrowDownCircle /></a>
                </div>
                <div className='absolute inset-0 w-full h-full bg-[#071a2b] opacity-50'></div>
            </div>
            <div id='admin' className='grid grid-cols-1 items-start lg:grid-cols-3 py-14 lg:py-20 p-7 md:px-20 lg:px-32 xl:px-44 gap-5'>
                {Participates.filter((par) => par.Package === '2 kg').length > 0 && (
                    <div className=" flex flex-col gap-y-5">
                        <div className='p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                            <p>2 kg</p>
                            <span> {Participates.filter((par) => par.Package === '2 kg').length} </span>
                        </div>
                        <div className=" overflow-x-auto">
                            <div className="min-w-full inline-block align-middle">
                                <div className="border rounded-lg shadow overflow-hidden  ">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className=" ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Token</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Name</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">View</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 ">
                                            {fetchLoading ? (
                                                <>
                                                    <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                    <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                    <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                </>
                                            ) : <>
                                                {Participates.filter((par) => par.Package === '2 kg').map((par) => (
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-[#071a2b] capitalize ">{par.Contact}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button onClick={() => showPartiModal(par.Token)} type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">View</button>
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
                {Participates.filter((par) => par.Package === '5 kg').length > 0 && (
                    <div className=" flex flex-col gap-y-5">
                        <div className='p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                            <p>5 kg</p>
                            <span> {Participates.filter((par) => par.Package === '5 kg').length} </span>
                        </div>
                        <div className=" overflow-x-auto">
                            <div className="min-w-full inline-block align-middle">
                                <div className="border rounded-lg shadow overflow-hidden  ">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className=" ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Token</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Name</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">View</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 ">
                                            {fetchLoading ? (
                                                <>
                                                    <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                    <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                    <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                </>
                                            ) : <>
                                                {Participates.filter((par) => par.Package === '5 kg').map((par) => (
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.fullName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button onClick={() => showPartiModal(par.Token)} type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">View</button>
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
                {Participates.filter((par) => par.Package === '10 kg').length > 0 && (
                    <div className=" flex flex-col gap-y-5">
                        <div className='p-2 px-6 rounded font-medium lg:text-xl bg-[#071a2b] flex justify-between items-center text-[#d3e3fd]'>
                            <p>10 kg</p>
                            <span> {Participates.filter((par) => par.Package === '10 kg').length} </span>
                        </div>
                        <div className=" overflow-x-auto">
                            <div className="min-w-full inline-block align-middle">
                                <div className="border rounded-lg shadow overflow-hidden  ">
                                    <table className="min-w-full divide-y divide-gray-200 ">
                                        <thead className=" ">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Token</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">Name</th>
                                                <th scope="col" className="px-6 py-3 text-start text-xs lg:text-sm font-medium  uppercase ">View</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 ">
                                            {fetchLoading ? (
                                                <>
                                                    <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                    <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                    <tr><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td><td className='w-full h-12 bg-gray-100 animate-pulse'></td></tr>
                                                </>
                                            ) : <>
                                                {Participates.filter((par) => par.Package === '10 kg').map((par) => (
                                                    <tr>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.Token}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#071a2b] capitalize ">{par.fullName}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                            <button onClick={() => showPartiModal(par.Token)} type="button" className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">View</button>
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