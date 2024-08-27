import React from 'react'
import { Link } from 'react-router-dom'
import {
    XIcon,
    FacebookIcon,
    LinkedinIcon,
    TelegramIcon
  } from 'react-share';

const Footer = () => {
  return (
    <footer className="bg-zinc-900 text-white py-8 pt-20 relative">
        <div className="flex flex-col absolute top-4 left-8">
            <div className='flex items-end gap-2'>
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                    <path fill="#9fa8da" d="M45,45V25.9c0-1.8-0.8-3.6-2.3-4.7L29.1,10.5c-0.4-0.3-0.9-0.3-1.2,0L14.3,21.2c-1.4,1.1-2.3,2.9-2.3,4.7V45	c0,0.6,0.4,1,1,1h31C44.6,46,45,45.6,45,45z"></path><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M13.4,13.8l-3.6,2.9c-1.4,1.1-2.3,2.9-2.3,4.7v18.1c0,1.1,0.9,2,2,2h20"></path><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M35,41.5h3.5c1.1,0,2-0.9,2-2V21.4c0-1.8-0.8-3.6-2.3-4.7L24.6,6c-0.4-0.3-0.9-0.3-1.2,0l-4.6,3.6"></path><path fill="none" stroke="#18193f" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M18.5,35.7v-8.2c0-0.6,0.4-1,1-1h8.9c0.6,0,1,0.4,1,1v14"></path>
                </svg>
                <h1 className='text-4xl'><span className='text-5xl'>Settle</span> Down</h1>
            </div>    
        </div>
        <div className="container mx-auto grid grid-cols-2 gap-x-2 gap-y-8 max-sm:px-8 max-sm:mt-20 sm:grid-cols-4 sm:gap-14 sm:ml-40">
            <p className="text-sm text-gray-400 max-sm:col-span-2 sm:place-self-end">
                    Elevating your living experience with the best properties around the globe. Trust, transparency, and excellence.
            </p>

            <div className='sm:ml-10'>
                <h3 className="font-semibold text-lg mb-2 sm:mb-4">Quick Links</h3>
                <ul className="space-y-1 sm:space-y-2 text-sm">
                    <Link to={'/profile'} className="block hover:underline">Account Information</Link>
                    <Link to={'/search?type=rent'} className="block hover:underline">Rent a Property</Link>
                    <Link to={'/search?type=sell'} className="block hover:underline">Buy a Property</Link>
                    <Link to={'/about'} className="block hover:underline">About Us</Link>
                </ul>
            </div>

            <div className='max-sm:ml-auto'>
                <h3 className="font-semibold text-lg mb-2 sm:mb-4">Contact Us</h3>
                <ul className="space-y-1 sm:space-y-2 text-sm">
                    <li>Phone: +1 234 567 890</li>
                    <li>Email: info@settledown.com</li>
                    <li>Address: 123 Main St, Khi, Pakistan</li>
                </ul>
            </div>

            <div className='max-sm:col-span-2 max-sm:place-self-center'>
                <h3 className="font-semibold text-lg mb-4 ml-10">Follow Us</h3>
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-85">
                        <FacebookIcon size={32} round />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-85">
                        <XIcon size={32} round/>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-85">
                        <LinkedinIcon size={32} round/>
                    </a>
                    <a href="https://telegram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-85">
                        <TelegramIcon size={32} round/>
                    </a>
                </div>
            </div>
        </div>

        <div className="container mx-auto mt-8 border-t border-gray-100 pt-4 text-center text-sm text-gray-100">
            &copy; 2024 Settle Down, Inc. All rights reserved.
        </div>
    </footer>
  )
}

export default Footer