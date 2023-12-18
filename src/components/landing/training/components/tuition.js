import React from 'react'

const Tuition = () => {
  return (
     <div name="Tuition & Financing" className=' h-fit grid lg:grid-cols-8 text-black md:py-20 px-10'>
      <div className='lg:col-span-2'></div>
      <div className='lg:col-span-5'>
        <h1 className="text-2xl md:text-3xl font-bold mb-10 ">Flexible Financing Options</h1>
              <div className='text-center my-10 md:px-32 px-4 md:text-lg text-base '>
                  <p>Want more information about tuition & financing in your area?
                        Our Admissions team is here to help.</p>
        </div>
        <div className='text-center my-10  '>
          <a href="https://t.me/HelloGobeze" className='border-2 border-orange-400 hover:bg-orange-400 text-sky-700 font-normal md:text-base md:px-8 md:py-4 px-3 py-2 rounded-md '>
          Contact Admission
                  </a>
                  <p className='mt-10'>
                      Or give us a call </p>
                     <p className='text-xl mt-4 font-bold'>+251984786060</p> 
                  
        </div>
      </div>
        
      </div>
  )
}

export default Tuition