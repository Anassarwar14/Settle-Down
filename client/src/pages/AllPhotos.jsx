import { useLocation } from 'react-router-dom';

const AllPhotos = () => {
  const location = useLocation();
  const { listing } = location.state || {};  

  return (
    <>
    {listing && 
      <div className='mx-auto px-5 py-3 bg-stone-900'>
        {listing.imageURLs && listing.imageURLs.map((url) => (
              <img key={url} src={url} alt='property-image' className='w-full max-h-[40rem]  object-contain bg-gradient-to-r from-fuchsia-200 to-fuchsia-100 animated-background rounded-lg border mb-4 shadow-lg'/>   
        ))}
      </div>
    }
    </>
  )
}

export default AllPhotos