import { useRef, useState } from 'react'
import { IoIosSend } from "react-icons/io";
import { Link } from 'react-router-dom';

const ContactLandlord = ({contact, landlord, listing}) => {
    const [message, setMessage] = useState(null);
    const [name, setName] = useState(null);
    const buttonRef = useRef(null); 

  return (
    <>
        {landlord && 
            <div className='fixed inset-0 z-50'>
                <div className='absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center'>
                    <form onSubmit={(e) => {e.preventDefault(); buttonRef.current.click()}} className="min-w-[30rem] flex flex-col justify-center flex-wrap space-y-3 p-4 bg-white rounded-xl opacity-90">
                        <h1 className='text-3xl font-semibold text-purple-700 relative before:content-[""] before:absolute before:w-[30%] before:bottom-0 before:border-b before:border-b-teal-500 '>Contact Landlord</h1>
                        <h2>Email <span className='font-semibold'>{landlord.username}</span> for <span className='font-semibold'>{listing.name}</span></h2>
                        <label htmlFor="name">Your Name</label>
                        <input required value={name} onChange={(e) => setName(e.target.value)} type="text" id='name' className='p-2 focus:outline-none accent-slate-300 border rounded-lg'/>
                        <label htmlFor="message">Email Message</label>
                        <textarea required value={message} onChange={(e) => setMessage(e.target.value)} id='message' placeholder={"Your thoughts.."} className='h-36 max-h-44 p-4 focus:outline-none accent-slate-300 border rounded-lg '></textarea>
                        <div className='flex justify-center gap-4'>
                            <button onClick={() => contact(false)} type='button' className='px-8 py-2 bg-gray-400 text-white rounded-full'>Cancel</button>
                            <Link ref={buttonRef} to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=Good day ${landlord.username},%0D%0A${message}%0D%0A%0D%0ARegards,%0D%0A${name}`}><button type='submit' className='px-6 py-2 bg-violet-700 text-white rounded-full flex items-center gap-1 hover:opacity-80'>Send <IoIosSend className='text-xl'/></button></Link>
                        </div>
                    </form>
                </div>
            </div>
        }
    </>
  )
}

export default ContactLandlord