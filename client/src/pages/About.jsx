import React from 'react'

function About() {
  return (
    <section style={{background: 'url("https://images.pexels.com/photos/925743/pexels-photo-925743.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2") center/contain'}} className="py-16 bg-gray-100">
      <div className="mx-auto px-6">
        <h2 className="text-5xl font-semibold text-center text-teal-600">Our Story</h2>
        <div className="mt-8 flex flex-wrap justify-center">
          <img className='max-w-lg rounded-3xl' src="https://images.pexels.com/photos/309724/pexels-photo-309724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        </div>
        <p className="mt-6 text-zinc-100 text-center text-lg text-pretty">
          Founded in 2024, Settle Down started with a vision to redefine the real estate experience. From our humble beginnings to becoming a leader in the industry, our journey has been driven by a commitment to innovation, excellence, and customer satisfaction.
        </p>
      </div>
  </section>
  )
}

export default About