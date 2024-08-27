import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';

function Header() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const headerRef = useRef(null);

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const headerElement = headerRef.current;
      if (currentScrollPos < prevScrollPos) {
        headerElement.style.transform = "translateY(0)";
      }
      else {
        headerElement.style.transform = "translateY(-200px)";
      }
      prevScrollPos = currentScrollPos;
    }

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if(searchTermFromUrl){
      setSearchTerm(searchTermFromUrl);
    } 

  }, [location.search]);
  

  function handleSubmit (e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`search?${searchQuery}`); 
  }

  return (
    <div ref={headerRef} className='bg-slate-200 shadow-md sticky top-0 left-0 right-0 translate-y-0 transition ease-in-out duration-300 z-50 bg-opacity-60 backdrop-blur-lg'>
      <header className='flex items-center justify-between px-3 py-2 max-w-6xl mx-auto'>
        <Link to="/" >
          <h1 className='flex flex-wrap items-baseline sm:items-end'>
          <svg xmlns="http://www.w3.org/2000/svg" className='translate-y-1 max-sm:w-7 max-sm:h-7' x="0px" y="0px" width="60" height="60" viewBox="0 0 48 48">
            <linearGradient id="SVGID_1__hv0mDR4iMaYl_gr1" x1="37.747" x2="10.253" y1="16.536" y2="44.031" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#00FFD1" />
              <stop offset="50%" stop-color="#8F00FF" />
              <stop offset="100%" stop-color="#FF007F" />
            </linearGradient>
            <path fill="url(#SVGID_1__hv0mDR4iMaYl_gr1)" d="M40.5,40.863V21.775c0-1.838-0.843-3.575-2.287-4.713L24.619,6.351c-0.363-0.286-0.875-0.286-1.238,0L9.787,17.062C8.343,18.199,7.5,19.936,7.5,21.775v19.089c0,0.552,0.448,1,1,1h31C40.052,41.863,40.5,41.416,40.5,40.863z"></path>
            <path fill="none" stroke="#EAEFF4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M13.41,13.843l-3.624,2.855C8.343,17.836,7.5,19.573,7.5,21.411V39.5c0,1.105,0.895,2,2,2h19.958"></path>
            <path fill="none" stroke="#EAEFF4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M35,41.5h3.5c1.105,0,2-0.895,2-2V21.411c0-1.838-0.843-3.575-2.287-4.713L24.619,5.988c-0.363-0.286-0.875-0.286-1.238,0L18.809,9.59"></path>
            <path fill="none" stroke="#EAEFF4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M18.542,35.681V27.5c0-0.552,0.448-1,1-1h8.917c0.552,0,1,0.448,1,1v14"></path>
          </svg>
            <span className='text-2xl sm:text-4xl text-transparent bg-clip-text font-[450] bg-gradient-to-r from-teal-400 from-40% to-teal-800'>Settle</span>
            <span className='text-xl sm:text-3xl font-[200] text-teal-800'>Down<span className='text-2xl font-[350] sm:text-5xl text-fuchsia-600'>.</span></span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='flex items-center bg-gray-50 rounded-full px-3 py-2 max-sm:translate-x-5 sm:-ml-10'>
          <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search..' className='bg-transparent focus:outline-none font-[300] w-24 sm:w-60 text-sm sm:text-md' />
          <button type='submit'><IoSearchOutline /></button>
        </form>
        <ul className='flex items-center space-x-7 font-[300] text-md text-slate-600'>
          <Link to="/"><li className='hover:underline hover:decoration-1 hidden sm:inline'>Home</li></Link>
          <Link to="/about"><li className='hover:underline hover:decoration-1 hidden sm:inline'>About</li></Link>
          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.avatar} alt='profile' className='rounded-full object-cover w-8 h-8 sm:w-10 sm:h-10' />
            ) :
              <li className='hover:underline hover:decoration-1'>Sign In</li>
            }
          </Link>
        </ul>
      </header>
    </div>
  )
}

export default Header