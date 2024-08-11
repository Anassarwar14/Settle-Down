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
            <span className='text-2xl sm:text-4xl text-transparent bg-clip-text font-[450] bg-gradient-to-r from-teal-400 from-40% to-teal-800'>Settle</span>
            <span className='text-xl sm:text-3xl font-[200] text-teal-800'>Down<span className='text-2xl font-[350] sm:text-5xl text-fuchsia-600'>.</span></span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='flex items-center bg-gray-50 rounded-full px-3 py-2  sm:-ml-10'>
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