import React, { useEffect, useState } from 'react'
import { MdError, MdFolderShared, MdIosShare, MdOutlineRoom, MdShare, MdShareLocation } from 'react-icons/md';
import { IoLocationOutline } from "react-icons/io5";
import { IoIosAirplane, IoIosArrowRoundBack, IoIosShareAlt } from "react-icons/io";
import { IoCameraOutline } from "react-icons/io5";
import { LiaBedSolid } from "react-icons/lia";
import { PiArmchairThin, PiBathtubLight, PiBedThin, PiCarSimpleThin, PiCheckThin, PiCrossThin, PiPicnicTableLight, PiPicnicTableThin, PiSmileySadThin } from "react-icons/pi";
import { GiCarDoor } from "react-icons/gi";
import { TbCarGarage } from "react-icons/tb";
import { PiCarThin } from "react-icons/pi";
import { FcCancel } from "react-icons/fc";
import { PiCityLight } from "react-icons/pi";
import { Link, useParams } from 'react-router-dom'
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/bundle';
import SocialShare from '../components/SocialShare';
import ContactLandlord from '../components/ContactLandlord';
import { useSelector } from 'react-redux';

const Listing = () => {
    SwiperCore.use([Navigation, Keyboard, Pagination]);
    const params = useParams();
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [listing, setListing] = useState(null);
    const [share, setShare] = useState(false);
    const [contact, setContact] = useState(false);
    const [landlord, setLandlord] = useState(null);


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
    

    return (
        <main>
            {loading && <LoadingSkeleton/>}
            {error && <span className='text-sm text-red-600 flex items-center gap-1 mt-4 ml-4'><MdError /><p>{error}</p></span>}
            {listing && !loading && !error && (
                <div className='mt-2 px-4'>
                    <Swiper navigation keyboard={{enabled:true}} speed={800} pagination={{ clickable: true  }} className='rounded-xl bg-slate-300 shadow-md' style={{ "--swiper-navigation-color": "#fff", "--swiper-pagination-color": "#fff", '--swiper-pagination-bullet-width': '10%', '--swiper-pagination-bullet-height': '2px'}}>
                        <Link to={'/profile'}><div className='absolute z-10 top-4 left-4 w-12 h-12 rounded-full bg-gray-50 shadow-sm flex items-center justify-center text-4xl text-zinc-800 cursor-pointer hover:scale-105 '><IoIosArrowRoundBack className=''/></div></Link>
                        <div className='absolute z-10 bottom-4 left-4 w-16 h-8 rounded-full bg-gray-50 shadow-sm flex items-center justify-center text-zinc-800 hover:opacity-60 hover:cursor-default gap-2'><IoCameraOutline className='text-2xl' />{listing.imageURLs.length}</div>
                        <Link to={'/all-photos'} state={{listing}}><div style={{background: `linear-gradient( to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.6)), url("${listing.imageURLs[1]}") center/cover no-repeat`, textShadow:"0 1px 0 black"}} className='absolute z-10 max-sm:top-4 sm:bottom-7 right-7 w-16 h-12 text-center sm:w-40 sm:h-24 object-cover smooth_rendering rounded-lg sm:rounded-2xl shadow-sm max-sm:text-xs sm:text-sm text-white font-bold flex items-center justify-center cursor-pointer hover:scale-105  border-opacity-30 bg-slate-400 text-sjadp'>View All Photos</div></Link>
                        {listing.imageURLs.map((url) => 
                            (
                                <SwiperSlide key={url}>
                                    <div style={{background: `url("${url}") center/cover no-repeat`}} className='h-[30rem] hover:brightness-75 transition ease-in-out duration-300 relative' >
                                        {/* <div className='absolute bottom-0 w-full bg-black h-20 bg-opacity-30 blur-xl'></div> */}
                                        {/* <div className='absolute w-full bg-black h-20 bg-opacity-30 blur-md shadow-xl'></div> */}
                                    </div>
                                    {/* <h1 className='absolute bottom-4 left-7 text-5xl font-bold tracking-wider text-white bg-opacity-30 backdrop-blur-[3px] rounded-2xl px-7 py-2 border'>{listing.name}</h1> */}
                                </SwiperSlide>
                            )
                        )}
                    </Swiper>
                    <section className='flex gap-2 sm:gap-10 p-4 flex-wrap'>
                        <div className='w-[56rem] flex flex-col gap-2'>
                            <div className='flex max-sm:flex-col max-sm:gap-3 items-start sm:justify-between sm:gap-x-20 flex-wrap'>
                                <h1 className='text-4xl sm:text-5xl text-zinc-800 font-bold'>{listing.name}</h1>    
                                <h2 className='min-w-6xl text-4xl text-zinc-800 font-bold border rounded-lg p-2 bg-gradient-to-r from-emerald-200 to-slate-100 '>{listing.regularPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })} {listing.type === 'rent' && '/mo'}</h2>
                                <p className='before:content-[""] before:absolute before:w-1 before:h-1 before:top-3 before:left-[0.5rem] before:rounded-full relative before:bg-fuchsia-600 capitalize rounded-lg pl-5 px-3 py-[0.1rem] bg-teal-600 bg-opacity-80 text-gray-50 font-light'>For {listing.type === 'sell' ? 'Sale' : listing.type}</p>
                            </div>
                            <div className='flex items-center gap-5'>
                                <span className='flex items-center gap-1'><IoLocationOutline className='text-xl text-teal-600'/> {listing.address}</span>
                                <span className='flex items-center gap-2'><PiCityLight className='text-2xl text-teal-600'/> {listing.city}, {listing.country}</span>
                            </div>
                            <div>
                                <h3 className='font-semibold'>Description</h3>
                                <p className='hyphens-auto'>{listing.description}</p>
                            </div>
                            <h3 className='font-semibold'>Accomadation</h3>
                            <div className='flex gap-5 *:border *:border-teal-600  *:border-opacity-50 *:rounded-md *:shadow-sm *:px-2'>
                                <p>{listing.bedrooms} Bedrooms</p>
                                <p>{listing.bathrooms} Bathrooms</p>
                            </div>
                            <h3 className='font-semibold'>Facilities</h3>
                            <div className='flex gap-5 *:flex *:items-center *:gap-1'>
                                <p>{listing.furnished ? <PiCheckThin className='text-teal-600'/> : <FcCancel className='text-teal-600'/>} Furnished</p>
                                <p>{listing.parking ? <PiCheckThin className='text-teal-600'/> : <FcCancel className='text-teal-600'/>} Parking</p>
                            </div>
                        </div>
                        <aside className='flex-1 max-w-80 flex flex-col gap-2 p-4 shadow-xl border border-gray-200 bg-slate-50 rounded-2xl h-max'>
                            <h4>Brief Information</h4>
                            <h2 className='capitalize'><span className='font-semibold text-md'>Owner</span>: {landlord && landlord.username}</h2>
                            <div className='mt-4 flex justify justify-around items-center border bg-gray-100 rounded-lg p-1 *:flex *:items-center *:gap-2 *:text-sm *:font-semibold'>
                                <p><PiBedThin className='text-xl' />{listing.bedrooms}</p>
                                <p><PiBathtubLight className='text-xl'/>{listing.bathrooms}</p>
                                <p><PiCarSimpleThin className='text-xl'/>{listing.parking ? '1' : '0'}</p>
                                <p><PiArmchairThin className='text-xl'/>{listing.furnished ? 'Yes' : 'No'}</p>
                            </div>
                            {listing.offer && 
                                <div>
                                    <h2 className='before:content-[""] before:absolute before:w-[0.33rem] before:h-[0.33rem] before:top-[0.6rem] before:left-[0.5rem] before:rounded-full relative before:bg-fuchsia-600 pl-5 mt-4'>Discount Available</h2>
                                    <h3 className='ml-5 text-sm text-zinc-500'>Estimated: {(+listing.regularPrice - +listing.discountPrice).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}{listing.type === 'rent' && ' /mo'}</h3>
                                </div>
                            }
                            <div className='flex items-stretch gap-1 mt-4'>
                                {currentUser && listing.userRef !== currentUser._id && !contact && 
                                    <button onClick={() => setContact(true)} className='w-[90%] p-2 rounded-xl bg-zinc-950 font-light tracking-wide text-white'>Show Contacts</button>
                                }
                                <button onClick={() => setShare(!share)} className='border px-[0.6rem] rounded-xl border-zinc-950 hover:text-white hover:bg-zinc-950 transition ease duration-200'><IoIosShareAlt className='text-lg' /></button>
                            </div>
                        </aside>
                    </section>
                </div>
            )}
            {share && <button onClick={() => setTimeout(() => setShare(false), 700) } className='cursor-default'><SocialShare share={setShare} url={`/listing/${params.listingId}`} title={listing.name} /></button>}
            {contact && <ContactLandlord contact={setContact} landlord={landlord} listing={listing}/>}
        </main>
    )
}

export default Listing