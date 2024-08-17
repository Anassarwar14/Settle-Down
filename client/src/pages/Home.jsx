import React from 'react'
// import backgroundVideo from '../assets/background.mp4';
import backgroundVideo from '../assets/background2.mp4';
import { Link } from 'react-router-dom';

import { RiSearch2Fill } from "react-icons/ri";
//style={{background: `url("https://images.unsplash.com/photo-1531898921534-93603e2839c9?q=80&w=1999&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center/cover no-repeat`, backgroundPositionY: '80%'}}
//https://images.unsplash.com/photo-1496328289142-9a47ef5b544b?q=80&w=1933&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
//https://plus.unsplash.com/premium_photo-1697730288131-6684ca63584b?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
//https://images.pexels.com/photos/1029606/pexels-photo-1029606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
//https://images.pexels.com/photos/5997992/pexels-photo-5997992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
//https://images.pexels.com/photos/593153/pexels-photo-593153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
//https://images.pexels.com/photos/4120220/pexels-photo-4120220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
//https://images.pexels.com/photos/18112362/pexels-photo-18112362/free-photo-of-roofs-of-old-buildings-in-strasbourg-france.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2
function Home() {
  return (
    <div>
      <div className='w-full overflow-hidden relative group  h-[80vh] sm:h-[90vh] ' style={{background: `url("") center/cover no-repeat`, backgroundPosition: '76% 80%'}}>
        <div className='flex flex-wrap gap-1 items-center justify-center text-5xl sm:text-5xl  text-black transition ease duration-200 font-light pt-24 sm:pt-28 pb-28 sm:pb-10 px-2'>
          Elevate Your <span className='text-teal-600'>Living</span> <span className='text-white font-semibold'>Experience</span>
        </div>
        <p className='max-sm:text-md text-3xl flex items-center text-center justify-center text-pretty text-black font-semibold bg-opacity-20  pb-28 sm:p-10'>
           Let us guide you to the <br/> setting for your next adventure.
        </p>
        <div className='p-3 rounded border-y text-center max-sm:text-sm font-light flex items-center justify-center gap-4 w-full backdrop-blur-sm'>
           <Link to={'/search?'}><button className='py-2 px-8 border border-black bg-black hover:opacity-80  rounded-lg text-white flex items-center gap-2'><RiSearch2Fill/>Search & Explore</button></Link>
            <button className='py-2 px-4 border border-white rounded-lg bg-white bg-opacity-20 hover:bg-teal-600 hover:border-teal-600 transition duration-200  text-white'>Get Started</button>
        </div>
        <video className='group-hover:brightness-50 transition ease-in-out duration-300 w-[100vw] h-[80vh] sm:h-[90vh] object-cover absolute top-0 left-0 -z-10' autoPlay loop muted >
          <source src={backgroundVideo} type="video/mp4"/>
          <source src="background.ogg" type="video/ogg"/>
        Your browser does not support the video tag.
        </video>
      </div>
        <div>
          Hello
        </div>
    </div>
  )
}

export default Home