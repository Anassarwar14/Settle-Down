import React from 'react'
import { Link } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
function Header() {
  return (
    <div className='bg-slate-200 shadow-md'>
    <header className='flex items-center justify-between p-3 max-w-6xl mx-auto'>
      <Link to="/" >
        <h1 className='flex flex-wrap items-baseline sm:items-end'>
            <span className='text-xl sm:text-4xl text-transparent bg-clip-text font-[450] bg-gradient-to-r from-teal-400 from-40% to-teal-800'>Settle</span>
            <span className='text-md sm:text-3xl font-[200] text-teal-800'>Down<span className='text-2xl font-[350] sm:text-5xl text-fuchsia-600'>.</span></span>
        </h1>
      </Link>
        <form className='flex items-center bg-slate-100 rounded-lg px-3 py-2 md:-ml-10'>
          <input type='text' placeholder='Search..' className='bg-transparent focus:outline-none font-[300] w-24 sm:w-60 text-sm sm:text-md'/>
          <button type='submit'><IoSearchOutline /></button>
        </form>
        <ul className='flex space-x-7 font-[300] text-md text-slate-600'>
            <Link to="/"><li className='hover:underline hover:decoration-1 hidden sm:inline'>Home</li></Link>
            <Link to="/about"><li className='hover:underline hover:decoration-1 hidden sm:inline'>About</li></Link>
            <Link to="/sign-in"><li className='hover:underline hover:decoration-1'>Sign In</li></Link>
        </ul>
    </header>
    </div>
  )
}

export default Header