import React, { useEffect, useRef, useState } from 'react'
import backgroundVideo from '../assets/background2.mp4';
import worldMap from '../assets/world.svg';
import { Link } from 'react-router-dom';
import { FiChevronRight } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import { RiSparkling2Line } from "react-icons/ri";
import { RiSearch2Fill } from "react-icons/ri";
import { MdArrowRightAlt } from "react-icons/md";
import ListingCard from '../components/ListingCard';
import FAQList from '../components/FAQList';

function Home() {

  const [featuredListings, setFeaturedListings] = useState([]);
  const [salesListings, setSalesListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);

  const featuredRef = useRef(null);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch('/api/listing/get?offer=true&limit=3');
        const data = await res.json();
        setFeaturedListings(data);      
      } catch (error) {
        console.log(error);
      }
    }
    fetchOfferListings();

    const fetchSalesListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=sell&limit=3');
        const data = await res.json();
        setSalesListings(data);      
      } catch (error) {
        console.log(error);
      }
    }
    fetchSalesListings();

    const fetchRentListings = async () => {
      try {
        const res = await fetch('/api/listing/get?type=rent&limit=3');
        const data = await res.json();
        setRentListings(data);      
      } catch (error) {
        console.log(error);
      }
    }
    fetchRentListings();
  }, [])
  
  
  function scrollExplore(){
    featuredRef.current.scrollIntoView({behavior: 'smooth'})
  }

  return (
    <div>
      <header className='w-full overflow-hidden relative group  h-[80vh] sm:h-[90vh] ' style={{background: `url("") center/cover no-repeat`, backgroundPosition: '76% 80%'}}>
        <div className='flex flex-wrap gap-1 items-center justify-center text-[2.8rem] sm:text-5xl  text-black transition ease duration-200 font-light pt-24 sm:pt-28 pb-16 sm:pb-10 px-2'>
          <span className='text-white bg-clip-text mix-blend-exclusion'>Elevate Your</span> <span className='text-teal-600'>Living</span> <span className='text-white font-semibold'>Experience</span>
        </div>
        <p className='max-sm:text-md text-3xl flex items-center text-center justify-center text-pretty text-white font-semibold bg-opacity-20 pb-20 sm:pb-[6rem] sm:p-10'>
           Let us guide you to the <br/> setting for your next adventure.
        </p>
        <div className='p-3 rounded border-y text-center max-sm:text-sm font-light flex items-center justify-center gap-4 w-full backdrop-blur-sm'>
           <Link to={'/search?'}><button className='py-2 px-8 border border-black bg-black hover:opacity-80  rounded-lg text-white flex items-center gap-2'><RiSearch2Fill/>Search & Explore</button></Link>
            <button onClick={scrollExplore} className='py-2 px-4 border border-gray-400 rounded-lg bg-white bg-opacity-20 hover:bg-teal-600 hover:border-teal-600 transition duration-200  text-white'>Get Started</button>
        </div>
        <video className='group-hover:brightness-50 transition ease-in-out duration-300 w-[100vw] h-[80vh] sm:h-[90vh] object-cover absolute top-0 left-0 -z-10' autoPlay loop muted >
          <source src={backgroundVideo} type="video/mp4"/>
          <source src="background.ogg" type="video/ogg"/>
        Your browser does not support the video tag.
        </video>
      </header>
      <section style={{background: `url("https://images.pexels.com/photos/1029606/pexels-photo-1029606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") center/contain no-repeat`, backgroundPosition: ''}} className='px-4 overflow-hidden'>
        <div  className='p-7 whitespace-nowrap relative'>
          <h1 className=' text-8xl sm:text-8xl tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-emerald-950 to-purple-900 scrolling-text mix-blend-color-burn'>Settle Down and Discover your Ideal Home</h1>
        </div>
        <div ref={featuredRef} className='bg-white p-8 rounded-3xl'>
          <div className='flex justify-between items-center sm:items-baseline'>
            <h1 className='text-3xl sm:text-4xl font-light flex gap-2'> <RiSparkling2Line className=' text-rose-500'/> <span className='max-sm:hidden'>Explore</span> Featured <span className='max-sm:hidden'>Listings</span></h1>
            <Link to={'/search?offer=true'} className='text-xs px-3 py-[0.3rem] border border-black rounded-full flex items-center gap-[0.2rem] hover:bg-black hover:text-white group transition duration-200'>View all <FiChevronRight className='text-md group-hover:hidden'/><FiChevronsRight className='hidden group-hover:inline text-md' /></Link>
          </div>
          <i className='max-sm:text-xs max-sm:text-zinc-600'>Wherever you're going, we can take you there</i>
          <div className='mt-4 grid grid-cols-2 sm:grid-cols-9 gap-3'>
            {featuredListings.length > 0 && featuredListings.map((listing, index) => (
                <Link to={`/listing/${listing._id}`} state={{pathBackTo:`/`}} className={`${index == 0 ? 'sm:col-span-4' : index == 1 ? 'sm:col-span-3' : 'max-sm:hidden sm:col-span-2'}`} ><ListingCard  listing={listing}/></Link>
            ))}
          </div>
        </div>
        <div className='bg-white p-8 rounded-3xl mt-7'>
          <div className='flex justify-between items-center sm:items-baseline'>
            <h1 className='text-3xl font-light '><span className='max-sm:hidden'>Recent Properites for</span>  Sale</h1>
            <Link to={'/search?type=sell'} className='text-xs px-3 py-[0.3rem] border border-black rounded-full flex items-center gap-[0.2rem] hover:bg-black hover:text-white group transition duration-200'>View all <FiChevronRight className='text-md group-hover:hidden'/><FiChevronsRight className='hidden group-hover:inline text-md' /></Link>
          </div>
          <p className='mt-2 text-zinc-500 text-xs'>Check out the latest properties available for sale.</p>
          <div className='mt-4 grid grid-cols-2 sm:grid-cols-9 gap-3'>
            {salesListings.length > 0 && salesListings.map((listing, index) => (
                <Link to={`/listing/${listing._id}`} state={{pathBackTo:`/`}} className={`${index == 0 ? 'sm:col-span-4' : index == 1 ? 'sm:col-span-3' : 'max-sm:hidden sm:col-span-2'}`} ><ListingCard  listing={listing}/></Link>
            ))}
          </div>
        </div>
        <div className='bg-white p-8 rounded-3xl mt-7 mb-10'>
          <div className='flex justify-between items-center sm:items-baseline'>
            <h1 className='text-3xl font-light'><span className='max-sm:hidden'>Recent Properites for</span> Rent</h1>
            <Link to={'/search?type=rent'} className='text-xs px-3 py-[0.3rem] border border-black rounded-full flex items-center gap-[0.2rem] hover:bg-black hover:text-white group transition duration-200'>View all <FiChevronRight className='text-md group-hover:hidden'/><FiChevronsRight className='hidden group-hover:inline text-md' /></Link>
          </div>
          <p className='mt-2 text-zinc-500 text-xs'>Discover a range of rental properties to suit your needs.</p>
          <div className='mt-4 grid grid-cols-2 sm:grid-cols-9 gap-3'>
            {rentListings.length > 0 && rentListings.map((listing, index) => (
                <Link to={`/listing/${listing._id}`} state={{pathBackTo:`/`}} className={`${index == 0 ? 'sm:col-span-4' : index == 1 ? 'sm:col-span-3' : 'max-sm:hidden sm:col-span-2'}`} ><ListingCard  listing={listing}/></Link>
            ))}
          </div>
        </div>
      </section>

      <section className='mx-auto max-w-7xl mt-2 mb-4 sm:mt-10 sm:mb-20'>
        <div className='grid sm:grid-cols-2 p-4 sm:gap-10 relative'>
          <div className='sm:p-8 flex flex-col gap-10'>
            <h1 className='text-6xl text-amber-100 font-semibold mix-blend-difference bg-clip-text'>Transforming Dreams into reality</h1>
            <p className='text-stone-700'>
              At <span className='text-teal-500 italic font-semibold'>SettleDown</span>, we believe in the power of <span className='text-purple-600 font-semibold mix-blend-normal'>finding the perfect place</span> to call home. Our mission is to connect you with properties that not only meet your needs but elevate your lifestyle. By combining local expertise with a global reach, <span className='text-amber-600 sm:text-amber-300 sm:bg-clip-text sm:mix-blend-difference'>we bring you closer to your dream property</span>, whether you're seeking a cozy apartment in the heart of the city or a tranquil retreat by the coast.
            </p>
          </div>
          <div>
            <img className=' max-sm:mt-4 rounded-t-3xl rounded-b-xl shadow-2xl' src="https://plus.unsplash.com/premium_photo-1697730288131-6684ca63584b?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <img className='rounded-t-3xl rounded-b-xl absolute left-40 sm:left-80 sm:top-1 shadow-lg h-[28vh] w-60 sm:h-[69vh] -z-10 sm:w-[100vh]' src="https://img.freepik.com/free-vector/blurred-background-green-color_1035-3316.jpg?t=st=1724696789~exp=1724700389~hmac=3a12b85cef511fe13289e412e81e1f1edfd3227ef35a63aa90c697582f2cf6b3&w=740" alt="" />
        </div>
      </section>

      <section className='max-sm:min-h-[50vh] '>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#000"><path d="m0 4 86.6 23.1c42.1 11.2 85.5 16.9 129 16.9h29.7c73 0 129.8 17.1 127.3 16.5 83.5 22 171.3 22 254.8 0 123.2-32.4 162.9-.6 286-33.4L1000 4V0H0v4Z"></path></svg>
          <h1 className='mt-4 mb-2 text-7xl text-center max-sm:text-5xl'> Our <span className='text-purple-500'>Worldwide</span> Presence</h1>
          <p className='text-center max-sm:mx-auto max-sm:w-72 max-sm:text-sm text-[#0000007d]'>We proudly present to you safe living options around the world.</p>
          <img className='mt-8 mx-auto sm:w-[60%] w-[90%]' src={worldMap} alt="" />
      </section>

      <section className='my-20 max-w-5xl mx-auto h-[70vh] py-10 max-sm:w-96 max-sm:px-5 flex flex-col items-center justify-around bg-gray-200 rounded-lg'>
        <h1 className='text-4xl max-sm:text-center sm:text-5xl'>How <span className='text-rose-600'>confident</span> are you to sell your property?</h1>
        <p className='text-center max-w-3xl'>Ready to sell? Our platform is designed to connect you with motivated buyers, streamline the selling process, and help you achieve the best possible price for your property. </p>
        <Link to={'/profile'} state={{scrollCreateListing:true}} className='bg-rose-600 text-zinc-50 px-4 w-32 py-3 rounded-full flex items-center justify-around group hover:opacity-90'><MdArrowRightAlt className='group-hover:-translate-x-1 transition ease duration-150'/>Sell Now</Link>
      </section>

      <section className='p-3 sm:p-10 font-semibold bg-gradient-to-br from-slate-300 via-purple-600 to-emerald-600'>
        <div className='sm:max-w-4xl mx-auto bg-gray-200 rounded-3xl p-7'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#ddd"><path d="M0 0v90.2C49.7 99.9 105 82 160 65c75.5-23.3 145.5-22.4 222-3 63 16 119 14 173-8 79.5-32.4 156.2-27.6 240-10 82.6 17.4 143-1 205-31.7V0H0Z"></path></svg>
          <h1 className='text-5xl text-center text-stone-400'>FAQs</h1>
          <FAQList />
        </div>
      </section>

    </div>
  )
}

export default Home