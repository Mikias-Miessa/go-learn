import React from 'react'
import Image from 'next/image'
import user from '../../../../../public/male.png'
const Instructors = () => {
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
        <div className='lg:col-span-1 flex flex-col items-center justify-center gap-4 lg:py-20 py-10'>
          <Image src={user} width={150} height={150} alt='instructor image' className='rounded-full' />
          <h2 className='text-base ' >Nathnael Zerihun</h2>
          <p className='font-light text-center px-10 md:px-0'>Instructor(Regular), In-calss
Chief Technology Officer at Tolo Technology Solutions
Mobile Application Developer at Engida Travel and Technology
IT Director of Allure Communication PLC and Letena Ethiopia
IT consult for Axis Advocate, Yen & Co Law Office, and Aswale Coffee Import Export Company</p>

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
                <em>“The Tech Entrepreneurship Bootcamp exceeded my expectations! The hands-on learning approach and expert instructors
                            fueled my innovation. Networking opportunities were a game-changer, connecting me with industry leaders. Ready to build,
              innovate, and succeed? This bootcamp is the perfect launchpad!”</em>
            <h5 className='font-bold text-sm my-2 text-black'>Former Tech Entrepreneurship Bootcamp Student</h5>
            <h5 className='font-normal text-sm  text-black'>Mikias Walelign</h5>
          </div>
        
        </div>
      </div>
      </div>
  )
}

export default Instructors