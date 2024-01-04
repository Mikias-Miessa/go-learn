import React from 'react'
import Image from 'next/image'
import user from '../../../../../public/male.png'
const Instructors = ({ training }) => {
  console.log(training)
  return (
    <div name='Instructors' className='h-fit'>
    <div  className='h-fit bg-sky-800 grid md:grid-cols-8 py-10'>
      <div className='lg:col-span-2'>
 
      </div>
      <div className='col-span-5 text-white grid lg:grid-cols-2'>
      <div className='lg:col-span-1 px-10 md:px-0'>
        <h1 className='font-bold text-2xl my-6'>Instructors</h1>
        <p className='font-medium text-lg tracking-wide pr-6'>These experts bring in-depth experience from the field to the classroom each day,
          providing invaluable insights into succeeding on the job.</p>
          <p className='font-medium text-lg tracking-wide pr-6 mt-6'>
            Gobeze instructors are committed to providing personalized feedback
            and support to help you gain confidence with key concepts and tools. </p>
        </div>
        <div className='lg:col-span-1 flex flex-row md:flex-col items-center justify-around ml-4 md:ml-0 md:gap-4  lg:py-20 py-10'>
            <Image src={training.instructor.imagePath} width={150} height={150} alt='instructor image' className='rounded-full' />
            <div className='flex flex-col items-center gap-4'>
               <h2 className='text-base ' >{training.instructor.name? training.instructor.name:'TBA'}</h2>
            <p className='font-light text-center px-10 md:px-0'>
              {training.instructor.qualifications?training.instructor.qualifications:'--'}
            </p>
            </div>
         

        </div>
        
       
      </div>
         
      </div>
      <div className=' grid lg:grid-cols-8 md:grid-cols-10 bg-gray-50'>
        <div className='lg:col-span-2 md:col-span-1 '></div>
        <div className='lg:col-span-5  md:col-span-9 py-16 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 md:gap-0'>
          <div className='lg:col-span-1 flex justify-center items-center '>
            <Image src={user} width={150} height={150} alt='user image' className='rounded-full '/>
          </div>
          <div className='lg:col-span-2 px-6 text-gray-500 tracking-wide font-semibold flex flex-col justify-start '>
                <em>“Gobeze learning exceeded my expectations! The hands-on learning approach and expert instructors
                            fueled my innovation. Networking opportunities were a game-changer, connecting me with industry leaders. Ready to build,
              innovate, and succeed? Gobeze is the perfect launchpad!”</em>
            <h5 className='font-bold text-sm my-2 text-black'>Former Gobeze's Student</h5>
            <h5 className='font-normal text-sm  text-black'>Dagim Asnake</h5>
          </div>
        
        </div>
      </div>
      </div>
  )
}

export default Instructors