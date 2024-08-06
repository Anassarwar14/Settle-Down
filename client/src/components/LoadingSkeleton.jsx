import React from 'react'

const LoadingSkeleton = () => {
  return (
    <div className="flex p-4 items-center justify-center">
        <div className="w-full">
            <div className="h-screen rounded-lg overflow-hidden shadow-lg animate-pulse">
                <div className="h-96 bg-gray-300"></div>
                <div className="px-6 py-4">
                    <div className="h-6 bg-gray-300 mb-2 rounded-full"></div>
                    <div className="h-4 bg-gray-300 w-2/3 rounded-full"></div>
                </div>
                <div className="px-6 pt-4 pb-2">
                    <div className="h-4 bg-gray-300 w-1/4 mb-2 rounded-full"></div>
                    <div className="h-4 bg-gray-300 w-1/2 rounded-full"></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default LoadingSkeleton