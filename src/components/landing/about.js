import React from 'react'
import happy from '../../../public/happy.png'
import Image from 'next/image'
const About = () => {
  return (
      <div className=' flex flex-col item-center h-fit justify-center mt-10'>
          <h1 className='text-center md:text-4xl text-3xl font-extrabold gobeze-primary my-6 tracking-wide'>Gobeze's Prime Focus</h1>
          <p className='text-center md:text-base text-sm gobeze-secondary-light font-light lg:px-80 md:px-40 px-4 tracking-wider'>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Tempora non quae possimus doloremque odit eaque provident laudantium molestiae maxime,
              quibusdam maiores natus quis, cumque earum neque sint consectetur at accusantium.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aut corporis soluta eveniet culpa optio ut incidunt, saepe,
              perferendis suscipit sequi hic nobis deleniti consequatur,
              architecto quasi quidem iusto. Deleniti, voluptates!
          </p>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 md:gap-32 gap-20  px-12 sm:px-0 mt-16 mx-auto'>
          {/* <div className='bg-slate-50 w-60 h-80 rounded-md shadow-lg shadow-sky-200  flex  flex-col '>
            <div className='flex justify-center items-center pt-5 px-1'>
              <Image src={happy} alt='stressed person' width={200}
            height={200} className='rounded-md w-72 h-40 duration-200 hover:scale-105 ' />
            </div>
            
                <div className='flex justify-center items-center pt-3 font-semibold px-10'> Minimize Stress </div>
            <p className='flex justify-center items-center pt-2 text-xs text-center font-light px-5'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, omnis nobis aperiam corrupti aspernatur 
                </p>
          </div> */}
          <div className='bg-slate-50 w-60 h-80 rounded-md shadow-lg shadow-orange-200  flex  flex-col '>
            <div className='flex justify-center items-center pt-5 px-10'>
              <Image src={happy} alt='happy person' width={170}
            height={160} className='rounded-md duration-200 hover:scale-105 ' />
            </div>
            
                <div className='flex justify-center items-center pt-3 font-semibold px-10'> Interactive Courses </div>
            <p className='flex justify-center items-center pt-2 text-xs text-center font-light px-5'>
                      Discover a diverse range of interactive courses crafted to cater to different learning styles.
                    
                </p>
              </div>
              <div className='bg-slate-50 w-60 h-80 rounded-md shadow-lg shadow-orange-200  flex  flex-col '>
            <div className='flex justify-center items-center pt-5 px-10'>
              <Image src={happy} alt='happy person' width={170}
            height={160} className='rounded-md duration-200 hover:scale-105 ' />
            </div>
            
                <div className='flex justify-center items-center pt-3 font-semibold px-10 text-center'> Collaboration and Networking </div>
            <p className='flex justify-center items-center pt-2 text-xs text-center font-light px-5'>
              Connect with a vibrant community of learners, educators, and industry professionals. 
                </p>
          </div>
          <div className='bg-slate-50 w-60 h-80 rounded-md shadow-lg shadow-orange-200  flex  flex-col '>
            <div className='flex justify-center items-center pt-5 px-10'>
              <Image src={happy} alt='happy person' width={170}
            height={160} className='rounded-md duration-200 hover:scale-105 ' />
            </div>
            
                <div className='flex justify-center items-center pt-3 font-semibold px-10 text-center'> Certifications</div>
            <p className='flex justify-center items-center pt-2 text-xs text-center font-light px-5'>
              Validate your learning with skill assessments and certifications. Test your knowledge, track your progress, and earn certificates. 
                </p>
          </div>
          
            {/* <div className='bg-slate-50 w-60 h-80 rounded-md shadow-lg shadow-sky-200'></div>
            <div className='bg-slate-50 w-60 h-80 rounded-md shadow-lg shadow-sky-200'></div> */}
        </div>

    </div>
  )
}

export default About