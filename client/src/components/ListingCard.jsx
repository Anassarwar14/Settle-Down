import React from 'react'
import { MdLocationOn } from 'react-icons/md'
import { RiDiscountPercentFill } from "react-icons/ri";
import { PiArmchairThin, PiBathtubThin, PiBedThin, PiCarSimpleThin } from 'react-icons/pi';
import { PiArmchairFill } from "react-icons/pi";
import { CiParking1 } from "react-icons/ci";

const ListingCard = ({listing}) => {
  return (
    <article className='group flex flex-col justify-between sm:h-full rounded-2xl shadow-lg hover:shadow-xl hover:shadow-gray-300 shadow-gray-200 p-3 sm:p-3 border max-sm:border-2 '>
      <div className='flex flex-col gap-1'>
        <img src={listing.imageURLs[0]}  className='h-32 sm:h-48 w-full object-cover rounded-lg group-hover:ring-4 group-hover:ring-emerald-400 transition duration-200 '/>
        <div className='flex flex-wrap justify-between items-center gap-x-[0.35rem]'>
          <h2 className='text-emerald-500 line-clamp-1 break-all font-semibold text-lg sm:flex-1'>{listing.regularPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
          <div className='flex items-center gap-1'>
            {listing.offer && <RiDiscountPercentFill className='text-purple-600'/>}
            <p className='text-xs bg-teal-600 rounded-lg w-10 mr-1 text-center text-gray-50'>{listing.type === 'sell' ? 'Sale' : 'Rent'}</p>
          </div>
        </div>
      </div>
      <h4 className='flex gap-1 items-center text-sm text-gray-600'><MdLocationOn className='text-rose-600 max-sm:w-4 max-sm:h-4'/><p className='text-ellipsis overflow-hidden whitespace-nowrap'>{listing.city}, {listing.country}</p></h4>
      <div className=''>
        <h3 className='line-clamp-1 break-all font-semibold text-gray-900'>{listing.name}</h3>
        <p className='line-clamp-2 leading-4 break-all text-gray-500 text-xs'>{listing.description}</p>
      </div>
      <div className='flex justify-between gap-3 items-center rounded-lg p-1  text-gray-600'>
          <div className='flex gap-2 *:flex *:items-end *:gap-[0.35rem] *:text-sm'>
            <p>{listing.bedrooms}<PiBedThin className='text-lg sm:text-xl text-gray-900' /></p>
            <p>{listing.bathrooms}<PiBathtubThin className='text-lg sm:text-xl text-gray-900'/></p>
          </div>
          <div className='flex gap-2 *:flex *:items-end *:gap-[0.35rem]'>
            {listing.parking && <p><CiParking1 className='text-cyan-500 text-lg sm:text-[1.3rem]'/></p>}
            {listing.furnished && <p><PiArmchairFill className='text-amber-800 text-lg sm:text-xl'/></p>}
          </div>
      </div>

    </article>
  )
}

export default ListingCard