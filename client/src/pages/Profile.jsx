import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom';
import { updateUserStart, updateUserSuccess, updateUserFailure, resetError, deleteUserStart, deleteUserSuccess, deleteUserFailure, signOutStart, signOutSuccess, signOutFailure } from '../redux/user/userSlice';
import { app } from '../firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { MdOutlineModeEditOutline, MdOutlinePlaylistAdd, MdErrorOutline, MdOutlineDeleteOutline, MdError} from "react-icons/md";
import { PiSignOut, PiSpinner } from "react-icons/pi";
import { HiCheckBadge } from "react-icons/hi2";
import { RiDeleteBin4Line } from "react-icons/ri";
import DeleteConfirm from '../components/DeleteConfirm';


// ---firebase storage rules code---
// allow read;
// allow write: if
// request.resource.size < 2 * 1024 * 1024 && 
// request.resource.contentType.matches('image/.*');

function Profile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [uploadError, setUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [noChange, setNoChange] = useState(true);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [listings, setListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);
  const [listingsDelError, setListingsDelError] = useState(false);
  const [confirmDeleteListing, setConfirmDeleteListing] = useState(false);
  const fileRef = useRef(null);
  const createListingRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])
  
  useEffect(() => {
    window.scrollTo({top: 0})
    ShowListings();
  }, [])
  

  useEffect(() => {
    if (location.state?.scrollCreateListing) { 
      setTimeout(() => {
        createListingRef.current?.scrollIntoView({ block:'center', behavior: 'smooth'});
      }, 800);
    }
  }, [location.state]);


  function handleFileUpload (file) {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name // added date to prevent double upload of the same file
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setUploadError(true);
        setFilePerc(0);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => {
            setFormData((prevState) => {
                return {...prevState, avatar:downloadURL} 
            });
        })
      }
    );
  }

  function handleChange (e) {
    setFormData((prevState) => {
      return {...prevState, [e.target.id]:e.target.value}; 
    });
    if (error) dispatch(resetError());
    setNoChange(false);
  }
  
  async function ShowListings () {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listing/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
      }
      setListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  }

  async function handleSubmit (e) {
    e.preventDefault();
    setFilePerc(0);
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, 
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();
      if (data.success === false) { 
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  async function handleDeleteUser () {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
          },
        },
      )
      const data = res.json();
      if(data.success === false)
        dispatch(deleteUserFailure(data.message));
      dispatch(deleteUserSuccess());
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  }

  async function handleDeleteListing (listingId) {
    try {
      setListingsDelError(false);
      const res = await fetch(`/api/listing/delete/${listingId}`, 
        {
          method: 'DELETE',
        });
      const data = await res.json(); 
      if(data.success === false) {
        setListingsDelError(data.message);
        return;
      }
      setConfirmDeleteListing(false);
      setListings((prev) => prev.filter((listing) => listing._id !== listingId));
    } catch (error) {
      setListingsDelError(error.message);
    }
  }

  async function handleSignOut () {
    try {
      dispatch(signOutStart());
      const res = await fetch('/api/auth/signout');
      const data = res.json();
      if (data.success === false){
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data));
    } catch (error) {
      dispatch(signOutFailure(error))
    }
  }

  function toggleEdit () {
    setEditMode(!editMode);
  }
  

  return (
    <div className='max-w-md sm:max-w-6xl py-3 sm:py-5 px-8 mx-auto mt-4 sm:mt-7 mb-20 bg-gray-100 shadow-sm border rounded-md'>
      <div className="flex items-center justify-between">
        <h1 className='text-2xl font-light text-zinc-700'>My Profile</h1>
        <button onClick={handleSignOut} className='flex items-center text-sm gap-1 text-rose-600 hover:underline shadow-sm sm:shadow-md rounded-full px-4 py-1'>Sign Out<PiSignOut /></button>
      </div>
      <section className='flex items-center h-24 gap-6 p-14 px-5 mt-3 sm:mt-5 bg-gradient-to-tr from-purple-400 from-20% to-indigo-500 animated-background rounded-xl'>
        <img src={ currentUser.avatar } alt='' className='w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-full'/>
        <div className='flex-col'>
          <h2 className='text-xl uppercase text-white' >{currentUser.username}</h2>
        </div>
      </section>

      <div className='mt-4 rounded-lg border p-5'>
        <div className="flex items-center justify-between">
          <h2 className='ml-2 text-zinc-700'>Personal Info</h2>
          <button className='flex items-center text-sm font-light gap-1 text-zinc-500 bg-gray-100 border shadow-md rounded-full px-4 py-1 hover:animate-pulse' onClick={toggleEdit}>Edit<MdOutlineModeEditOutline /></button>
        </div>
      </div>
      <div className={`grid grid-cols-2 justify-items-center mt-1 sm:mt-5 mb-5 gap-3 sm:gap-1 ${editMode && 'hidden'}`}>
        <h3 className='mt-4 text-md sm:text-lg text-zinc-400'>Username</h3>
        <h3 className='mt-4 text-md sm:text-lg text-zinc-400'>Email Address</h3>
        <h3 className='text-zinc-700 max-sm:text-xs sm:text-sm'>{currentUser.username}</h3>
        <h3 className='text-zinc-700 max-sm:text-xs sm:text-sm'>{currentUser.email}</h3>
      </div>

      <form className={`flex flex-col gap-4 mt-5 px-4 ${!editMode && 'hidden'}`} onSubmit={ handleSubmit }>
        <input 
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img src={ formData.avatar || currentUser.avatar } alt='display-img' onClick={() => {fileRef.current.click(); setUploadError(false);}} className='w-[5.5rem] h-[5.5rem] sm:w-24 sm:h-24 object-cover rounded-full cursor-pointer mx-auto'/>
        <p className='*:flex *:items-center *:gap-2 *:justify-center *:font-light *:text-sm'>
          { uploadError ? 
            <span className='text-red-500'><MdErrorOutline />Error Uploading image! - Max size allowed: 2 MB</span> :
            filePerc > 0  && filePerc < 100 ?
            <span className='text-zinc-500'><PiSpinner className='animate-spin'/>Uploading... {filePerc}% completed</span> :
            filePerc === 100 &&
            <span className='text-green-500'><HiCheckBadge /> Image Uploaded Successfully!</span>
          }
        </p>
        <input type='text' placeholder='Username' defaultValue={currentUser.username} className='border p-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:border-purple-400 focus:text-zinc-800 transition ease-in duration-200 text-zinc-500' id='username' onChange={handleChange}/>
        <input type='email' placeholder='Email' defaultValue={currentUser.email} className='border p-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:border-purple-400 focus:text-zinc-800  transition ease-in duration-200 text-zinc-500' id='email' onChange={handleChange}/>
        <input type='password' placeholder='Password' className='border p-3 rounded-lg hover:bg-gray-200 focus:outline-none focus:border-purple-400  transition ease-in duration-200' id='password' onChange={handleChange}/>
        {error && <p className='text-red-600 text-sm ml-2 flex items-center gap-1'><MdErrorOutline />{error}</p>}
        <button type='submit' disabled={loading || noChange} className='border border-purple-500 transition ease-in duration-150 disabled:border-opacity-10 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-zinc-500 hover:bg-purple-500 text-purple-700 hover:text-white rounded-3xl p-3 min-w-60 mx-auto'>
          {loading ? 
          <div className='flex items-center justify-center'>
            <svg aria-hidden="true" role="status" className="w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2"/>
            </svg> Loading...
          </div> : "Update"}
        </button>
        { updateSuccess && <span className='text-green-500 flex items-center gap-2 justify-center font-light text-sm'><HiCheckBadge /> Updated Successfully!</span>}
      </form>

      <div className='mt-6 rounded-lg border p-5'>  
        <h2 className='ml-2 text-zinc-700'>Listings</h2>
      </div>
      {listingsDelError && <p className='text-xs text-red-600 ml-8 mt-2'>{listingsDelError}</p>}
      {listings && listings.length > 0 && 
        <div className='divide-y max-w-5xl mx-auto p-4 mt-4  border rounded-lg animated-background bg-gradient-to-r from-teal-100 via-emerald-100 to-teal-300'> 
          {listings.map((listing) => (
            <div key={listing._id} className='flex items-center max-sm:px-2 justify-between text-emerald-600 hover:text-cyan-500 hover:scale-105 transition ease-in-out duration-200 rounded-lg hover:bg-gradient-to-r from-teal-100 via-emerald-100 to-emerald-50'>
              <Link to={`/listing/${listing._id}`} state={{pathBackTo:'/profile'}}>
                <img src={listing.imageURLs[0]} alt='listing-cover' className='w-20 h-16 my-2 sm:w-32 sm:h-20 object-contain rounded-xl smooth_rendering bg-gray-50'/>
              </Link>
              <Link to={`/listing/${listing._id}`} state={{pathBackTo:'/profile'}} className='sm:flex-1 text-center'>
                <p className='text-sm sm:text-base line-clamp-1'>{listing.name}</p>
                <p className='text-xs line-clamp-1 text-zinc-400'>{listing.city}, {listing.country}</p>
              </Link>
              <span className='sm:w-32 flex max-sm:flex-col sm:justify-center sm:items-center gap-3 sm:gap-2 text-purple-800 '>
                <Link to={`/update-listing/${listing._id}`}>
                  <MdOutlineModeEditOutline className='hover:bg-purple-300 hover:bg-opacity-50 sm:text-3xl rounded-full p-[0.1rem] sm:p-[0.46rem] cursor-pointer shadow-md' />
                </Link>
                <RiDeleteBin4Line onClick={() => setConfirmDeleteListing(listing._id)} className=' hover:text-red-600 hover:bg-red-400 hover:bg-opacity-50 sm:text-3xl rounded-full p-[0.1rem] sm:p-[0.46rem] cursor-pointer shadow-md'/>
              </span>
            </div>
            ))
          }
          <DeleteConfirm showPopUp={confirmDeleteListing} initiateDelete={() => handleDeleteListing(confirmDeleteListing)} handleCancel={() => setConfirmDeleteListing(false)} textDel={"Are you sure you want to delete this listing?"} titleDel={"Listing"}/>
        </div>
      }
      {showListingsError && <span className='text-xs   text-red-600 flex items-center gap-1 mt-4 ml-4'><MdError /><p>Error Loading Listings!</p></span>}
      <Link to={'/create-listing'}>
        <button type='button' className='text-sm sm:text-base border border-purple-500 sm:ml-7 transition ease-linear duration-200 hover:border-white hover:bg-gradient-to-r hover:from-purple-400 hover:from-2% hover:to-indigo-500 text-purple-700 hover:text-white rounded-3xl px-4 py-2 mt-3'>
          <div ref={createListingRef} className={`${location.state?.scrollCreateListing && 'animate-ping'} flex items-center gap-1`}>
            <MdOutlinePlaylistAdd  className='sm:text-lg'/>
            Create Listing
          </div>
        </button>
      </Link>
      <hr className='mt-4 mb-2 '/>
      <DeleteConfirm showPopUp={confirmDelete} initiateDelete={handleDeleteUser} handleCancel={() => setConfirmDelete(false)} textDel={"Are you sure you want to deactivate your account?"} titleDel={"Account"}/>
      <span onClick={() => setConfirmDelete(true)} className='text-sm flex items-center justify-center text-red-600 hover:underline hover:decoration-1 hover:underline-offset-4 cursor-pointer'>
        Delete Account
      </span>
    </div>
  )
}

export default Profile