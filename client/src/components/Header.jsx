import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
function Header() {
  return (
    <div className='bg-slate-200 shadow-md'>
    <header className='flex items-center justify-between p-3 max-w-6xl mx-auto'>
      <Link to="/" >
        <h1 className='font-["Outfit"] flex flex-wrap items-baseline sm:items-end '>
            <span className='text-xl sm:text-4xl text-transparent bg-clip-text font-[400] bg-gradient-to-r from-[#22c1c3] from-40% to-[#970404]'>Settle</span>
            <span className='text-md sm:text-3xl font-[400] text-[#970404]'>Down</span>
        </h1>
      </Link>
        <form className='flex items-center bg-slate-100 rounded-lg px-3 py-2'>
          <input type='text' placeholder='Search..' className='font-["Outfit"] bg-transparent focus:outline-none font-[300] w-24 sm:w-60 text-sm sm:text-md'/>
          <button type='submit'><IoSearchOutline /></button>
        </form>
        <ul className='flex space-x-6 font-["Outfit"] font-[300] text-md text-slate-600'>
            <Link to="/"><li className='hover:underline hover:decoration-1 hidden sm:inline'>Home</li></Link>
            <Link to="/about"><li className='hover:underline hover:decoration-1 hidden sm:inline'>About</li></Link>
            <Link to="/sign-in"><li className='hover:underline hover:decoration-1'>SignIn</li></Link>
        </ul>
    </header>
    </div>
  )
}

export default Header