import React, { useEffect, useState } from 'react'
import { MdError, MdOutlineModeEditOutline } from 'react-icons/md';
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowRoundBack, IoIosShareAlt } from "react-icons/io";
import { BsCamera } from "react-icons/bs";
import { PiArmchairThin, PiBathtubThin, PiBedThin, PiCarSimpleThin, PiCheckThin } from "react-icons/pi";
import { FcCancel } from "react-icons/fc";
import { PiCityLight } from "react-icons/pi";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import SocialShare from '../components/SocialShare';
import ContactLandlord from '../components/ContactLandlord';
import { useSelector } from 'react-redux';
import { RiDeleteBin4Line } from 'react-icons/ri';
import DeleteConfirm from '../components/DeleteConfirm';

const Listing = () => {
    SwiperCore.use([Navigation, Keyboard, Pagination]);
    const params = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const pathBackTo = (location.state && location.state.pathBackTo) || '/profile'
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [listing, setListing] = useState(null);
    const [share, setShare] = useState(false);
    const [isClipBoard, setIsClipBoard] = useState(false)
    const [contact, setContact] = useState(false);
    const [landlord, setLandlord] = useState(null);
    const [confirmDeleteListing, setConfirmDeleteListing] = useState(false);
    const [listingsDelError, setListingsDelError] = useState(false);


    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${params.listingId}`);
                const data = await res.json();
                if(data.success === false){
                    setError('Error Loading Listing!');
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
                setError(false);
                console.log(data);
            } catch (error) {
                setError(error)
                setLoading(false);
            }
        }

        fetchListing();
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                if(data.success === false){
                    return;
                }
                setLandlord(data);
            } catch (error) {
                console.log(error);
            }
          }
          fetchLandlord();
    }, [params.listingId, listing && listing.userRef])
    
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
          navigate('/profile');
        } catch (error) {
          setListingsDelError(error.message);
        }
      }

    return (
        <main className='mb-20'>
            {loading && <LoadingSkeleton/>}
            {error && <span className='text-sm text-red-600 flex items-center gap-1 mt-4 ml-4'><MdError /><p>{error}</p></span>}
            {listing && !loading && !error && (
                <div className='mt-2 px-4'>
                    <Swiper navigation keyboard={{enabled:true}} speed={800} pagination={{ clickable: true  }} className='rounded-xl bg-slate-300 shadow-md' style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff", '--swiper-pagination-bullet-width': '10%', '--swiper-pagination-bullet-height': '2px'}}>
                        <Link to={pathBackTo}><div className='absolute z-10 top-4 left-4 w-12 h-12 rounded-full bg-gray-50 shadow-sm flex items-center justify-center text-4xl text-zinc-800 cursor-pointer hover:scale-105 '><IoIosArrowRoundBack className=''/></div></Link>
                        <div className='absolute z-10 bottom-2 sm:bottom-4 left-2 sm:left-4 w-14 h-6 sm:w-[4.5rem] sm:h-8 text-lg rounded-full bg-gray-50 shadow-sm flex items-center justify-center text-zinc-800 hover:opacity-60 hover:cursor-default gap-2'><BsCamera className='sm:text-2xl text-xl' />{listing.imageURLs.length}</div>
                        <Link to={'/all-photos'} state={{listing}}><div style={{background: `linear-gradient( to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url("${listing.imageURLs[1]}") center/cover no-repeat`, textShadow:"0 1px 0 black"}} className='absolute z-10 max-sm:top-4 sm:bottom-7 right-7 w-20 h-12 text-center sm:w-40 sm:h-24 object-cover smooth_rendering rounded-lg sm:rounded-2xl shadow-sm max-sm:text-xs sm:text-sm text-white font-bold flex items-center justify-center cursor-pointer hover:scale-105  border-opacity-30 bg-slate-400 text-sjadp'>View All <span className='max-sm:hidden'>Photos</span></div></Link>
                        {listing.imageURLs.map((url) => 
                            (
                                <SwiperSlide key={url}>
                                    <div style={{background: `url("${url}") center/cover no-repeat`}} className='h-[30rem] hover:brightness-75 transition ease-in-out duration-300 relative' >
                                    </div>
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                    <section className='sm:flex gap-2 sm:gap-5 p-4 sm:pr-0 sm:flex-wrap'>
                        <div className='sm:w-[56rem] flex flex-col gap-5 max-sm:gap-7'>
                            <div className='flex max-sm:flex-col max-sm:gap-3 items-start sm:justify-between sm:gap-x-20 flex-wrap'>
                                <div className='max-sm:flex max-sm:items-center max-sm:justify-between max-sm:w-full'>
                                    <h1 className='text-4xl sm:text-5xl text-zinc-800 font-bold'>{listing.name}</h1>
                                    { currentUser && listing.userRef === currentUser._id && 
                                        <span className='sm:hidden flex gap-2 text-purple-800 mb-2'>
                                            <Link to={`/update-listing/${listing._id}`}>
                                                <MdOutlineModeEditOutline className='hover:bg-purple-300 hover:bg-opacity-50 text-3xl rounded-full p-[0.46rem] cursor-pointer shadow-md' />
                                            </Link>
                                            <RiDeleteBin4Line onClick={() => setConfirmDeleteListing(listing._id)} className='hover:text-red-600 hover:bg-red-400 hover:bg-opacity-50 text-3xl rounded-full p-[0.46rem] cursor-pointer shadow-md'/>
                                        </span> 
                                    }    
                                </div>
                                <h2 className='min-w-6xl text-4xl text-zinc-800 font-bold border rounded-lg p-2 bg-gradient-to-r from-emerald-200 to-slate-100 '>{listing.regularPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} {listing.type === 'rent' && '/mo'}</h2>
                                <p className='before:content-[""] before:absolute before:w-1 before:h-1 before:top-3 before:left-[0.5rem] before:rounded-full relative before:bg-fuchsia-600 capitalize rounded-lg pl-5 px-3 py-[0.1rem] bg-teal-600 bg-opacity-80 text-gray-50 font-light'>For {listing.type === 'sell' ? 'Sale' : listing.type}</p>
                            </div>
                            <div className='flex flex-wrap items-center gap-x-5 gap-y-2'>
                                <span className='flex items-center gap-1'><IoLocationOutline className='text-xl text-teal-600'/> {listing.address}</span>
                                <span className='flex items-center gap-2'><PiCityLight className='text-2xl text-teal-600'/> {listing.city}, {listing.country}</span>
                            </div>
                            <div>
                                <h3 className='font-semibold'>Description</h3>
                                <p className='hyphens-auto'>{listing.description}</p>
                            </div>
                            <div className='flex max-sm:flex-col max-sm:gap-8 gap-x-40'>
                                <div>
                                    <h3 className='font-semibold mb-2'>Accomadation</h3>
                                    <div className='flex gap-5 *:border *:border-teal-600  *:border-opacity-50 *:rounded-md *:shadow-sm *:px-2'>
                                        <p>{listing.bedrooms} Bedrooms</p>
                                        <p>{listing.bathrooms} Bathrooms</p>
                                    </div>
                                </div>
                                <div>
                                    <h3 className='font-semibold mb-1 sm:mb-2 sm:ml-5'>Facilities</h3>
                                    <div className='flex gap-5 *:flex *:items-center *:gap-1'>
                                        <p>{listing.furnished ? <PiCheckThin className='text-teal-800'/> : <FcCancel className='text-teal-600'/>} Furnished</p>
                                        <p>{listing.parking ? <PiCheckThin className='text-teal-800'/> : <FcCancel className='text-teal-600'/>} Parking</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside className='max-sm:mx-auto sm:flex-1 sm:flex sm:flex-col sm:gap-2'>
                            {listingsDelError && <p className='text-xs text-red-600 ml-8 mt-2'>{listingsDelError}</p>}
                            { currentUser && listing.userRef === currentUser._id && 
                            <span className='max-sm:hidden w-32 flex items-center gap-2 text-purple-800 mb-2 ml-3'>
                                <Link to={`/update-listing/${listing._id}`}>
                                    <MdOutlineModeEditOutline className='hover:bg-purple-300 hover:bg-opacity-50 text-3xl rounded-full p-[0.46rem] cursor-pointer shadow-md' />
                                </Link>
                                <RiDeleteBin4Line onClick={() => setConfirmDeleteListing(listing._id)} className='hover:text-red-600 hover:bg-red-400 hover:bg-opacity-50 text-3xl rounded-full p-[0.46rem] cursor-pointer shadow-md'/>
                            </span> }
                            <DeleteConfirm showPopUp={confirmDeleteListing} initiateDelete={() => handleDeleteListing(confirmDeleteListing)} handleCancel={() => setConfirmDeleteListing(false)} textDel={"Are you sure you want to delete this listing?"} titleDel={"Listing"}/>
                            <div className='max-sm:mt-8 w-full flex flex-col gap-1 sm:gap-2 p-4 shadow-xl border border-gray-200 bg-slate-50 rounded-2xl'>
                                <h4 className='text-teal-900 opacity-80'>Brief Information</h4>
                                <h2 className='capitalize flex items-center gap-1'>{landlord && <img className='w-5 h-5 rounded-full' src={landlord.avatar}/>}<span className='font-semibold text-md'>Owner</span>: {landlord && landlord.username}{!currentUser && <span className='text-sm text-zinc-600'>hidden<i className='text-xs'> (sign in to view or contact)</i></span>}</h2>
                                <div className='mt-4 flex justify-around items-center border bg-gray-100 rounded-lg p-1 *:flex *:items-center *:gap-2 *:text-sm *:font-semibold'>
                                    <p><PiBedThin className='text-xl' />{listing.bedrooms}</p>
                                    <p><PiBathtubThin className='text-xl'/>{listing.bathrooms}</p>
                                    <p><PiCarSimpleThin className='text-xl'/>{listing.parking ? '1' : '0'}</p>
                                    <p><PiArmchairThin className='text-xl'/>{listing.furnished ? 'Yes' : 'No'}</p>
                                </div>
                                {listing.offer && 
                                    <div>
                                        <h2 className='before:content-[""] before:absolute before:w-[0.33rem] before:h-[0.33rem] before:top-[0.6rem] before:left-[0.5rem] before:rounded-full relative before:bg-fuchsia-600 pl-5 mt-4'>Discount Available</h2>
                                        <h3 className='ml-5 text-sm text-zinc-500'>Estimated: {(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} <i className='font-normal'>Off</i> {listing.type === 'rent' && ' /mo'}</h3>
                                    </div>
                                }
                                <div className='flex items-stretch gap-1 mt-4'>
                                    {currentUser && listing.userRef !== currentUser._id && !contact && 
                                        <button onClick={() => setContact(true)} className='w-[90%] p-2 rounded-xl bg-zinc-950 sm:font-light tracking-wide text-white'>Show Contacts</button>
                                    }
                                    <button onClick={() => setShare(!share)} className='border px-[0.6rem] rounded-xl border-zinc-950 hover:text-white hover:bg-zinc-950 transition ease duration-200'><IoIosShareAlt className='text-lg' /></button>
                                </div>
                            </div>
                        </aside>
                    </section>
                </div>
            )}
            {(share || isClipBoard) && <button onClick={() => setTimeout(() => setShare(false), 50) } className='cursor-default'><SocialShare share={setShare} url={`https://settle-down.onrender.com/listing/${params.listingId}`} title={listing.name} isClipBoard={setIsClipBoard} /></button>}
            {contact && <ContactLandlord contact={setContact} landlord={landlord} listing={listing}/>}
        </main>
    )
}

export default Listing