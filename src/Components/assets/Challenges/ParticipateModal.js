import React from 'react';
import { FiXCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../Firebase/Config';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { FcCancel, FcCheckmark } from 'react-icons/fc';

function ParticipateModal({ onClose, par, closePath }) {
  const navigate = useNavigate();

  const deleteParticipateWithoutUid = async (par) => {
    try {
      // Query for documents with the same combination of fields
      const querySnapshot = await getDocs(
        query(collection(db, 'challengeParticipates'),
          where('fullName', '==', par.fullName),
          where('Contact', '==', par.Contact),
          where('Package', '==', par.Package)
        )
      );

      // Check if any matching documents were found
      if (!querySnapshot.empty) {
        // Delete the first matching document
        const documentToDelete = querySnapshot.docs[0];
        await deleteDoc(documentToDelete.ref);
        navigate(closePath);
      } else {
        // Handle the case where no matching documents were found
        console.log('No matching documents found.');
      }
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className='fixed inset-0 z-30 transition-all duration-500 font-general-medium'>
      {/* Modal Backdrop */}
      <div onClick={onClose} className='absolute inset-0 z-20 w-full h-full bg-black bg-opacity-50 backdrop-blur-sm bg-filter'></div>

      {/* Modal Content */}
      <div className='flex flex-col items-center justify-center w-full h-full'>
        <div className='z-30 flex items-center modal-wrapper'>
          <div className='relative flex flex-col items-start max-w-md max-h-screen p-5 mx-5 bg-white shadow-lg pt-9 lg:p-10 rounded-3xl modal lg:max-w-3xl md:max-w-2xl bg-opacity-90'>
            <div className='flex flex-col items-start w-full h-full space-y-3 md:col-span-3'>
              <div>
                <p className='text-lg font-bold capitalize select-none md:text-xl lg:text-2xl'>{par.fullName}</p>
                <p className='select-none opacity-90 lg:text-xl '>{par.Contact}</p>
              </div>
              <div class="font-medium text-[#071a2b] md:text-lg  capitalize flex items-center gap-x-2">
                <p>Payment : </p>
                <p>{par?.isPaid ? (<FcCheckmark className='text-xl font-semibold' />) : (<FcCancel className='text-xl font-semibold' />)}</p>
              </div>
              <div className='flex items-center'>
                <p className='w-auto px-5 py-2 border-r border-[#d3e3fd] border-0 rounded-l-xl bg-[#d3e3fdb3] md:text-lg italic text-[#031525]'>#{par.Token}</p>
                <p className='w-auto px-5 py-2  border-l border-[#d3e3fd] border-0 rounded-r-xl bg-[#031525] md:text-lg font-medium text-[#d3e3fd]'>{par.Package}</p>
              </div>
              <p className='text-base capitalize lg:text-lg'>{par.Address}</p>
            </div>
            <div onClick={onClose}>
              <FiXCircle className='absolute text-2xl font-light cursor-pointer top-3 right-3 md:top-5 md:right-5 opacity-70' onClick={() => navigate(closePath)} />
            </div>
            <p onClick={() => deleteParticipateWithoutUid(par)} className='pt-8 text-red-600 cursor-pointer'>Delete the Participate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParticipateModal;
