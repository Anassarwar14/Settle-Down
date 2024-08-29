import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AllPhotos = () => {
  const location = useLocation();
  const { listing } = location.state || {};  

  useEffect(() => {
    window.scrollTo({top: 0});
  }, [])
  

  return (
    <div className='bg-stone-950 min-h-screen'>
    {listing && 
      <div className='mx-auto px-5 py-3 bg-stone-950'>
        {listing.imageURLs && listing.imageURLs.map((url) => (
              <img key={url} src={url} alt='property-image' className='w-full max-h-[40rem]  object-contain bg-gradient-to-r from-slate-200 to-slate-50 rounded-lg border mb-4 shadow-lg'/>   
        ))}
      </div>
    }
    </div>
  )
}

export default AllPhotos