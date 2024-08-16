const ListingCardSkeleton = () => {
    return (
      <article className='flex flex-col gap-2 sm:gap-2 sm:min-h-[50vh] rounded-2xl shadow-lg p-3 border max-sm:border-2 animate-pulse'>
        <div className='flex flex-col gap-2'>
          <div className='rounded-lg bg-gray-300 h-36 sm:h-48 w-full'></div>
          <div className='flex flex-wrap justify-between items-center gap-x-[0.35rem]'>
            <div className='h-5 bg-gray-300 rounded w-1/2'></div>
            <div className='h-5 bg-gray-300 rounded-full w-10'></div>
          </div>
        </div>
          <div className='h-4 w-full bg-gray-300 rounded-full'></div>
        <div className=''>
          <div className='h-5 bg-gray-300 rounded-full w-2/3'></div>
          <div className='h-4 bg-gray-300 rounded-full w-full mt-1'></div>
          <div className='h-4 bg-gray-300 rounded-full w-full mt-1'></div>
        </div>
        <div className='inline-flex gap-1 items-center border bg-gray-100 rounded-lg p-1'>
          <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
          <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
          <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
          <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
        </div>
      </article>
    );
  };
  
  export default ListingCardSkeleton;