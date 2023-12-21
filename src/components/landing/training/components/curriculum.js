import Image from 'next/image'
import bg from '../../../../../public/bg.jpg'
import male from '../../../../../public/male.png'
import Link from 'next/link';

const Curriculum = ({training}) => {
  return (
    <div name='Curriculum' className='h-min bg-white w-full lg:mb-14'>
      <div className="md:bg-[url('/bg.jpg')] md:bg-cover lg:bg-cotain md:bg-no-repeat  md:h-min pb-20">
        <div className='visible md:hidden my-6 flex justify-center '>
          <Image src={bg} alt='hero Image' className='w-fit' />
          {/* <img src='../../../../../public/bg.jpg' alt="hero Image" className='w-fit' /> */}
             </div>
        <div className="grid md:grid-cols-7">
           
             <div className='md:col-span-4'> </div>
          <div className='md:col-span-3 md:mr-10'>
            <div className='flex flex-col justify-center items-start bg-white py-6 px-8 mx-6 md:mx-0 md:-mt-12  w-10/12 h-fit  '>
             
              <h1 className='text-black text-2xl md:text-4xl font-bold'>Inside Our Best-in-Class Curriculum</h1>
              <h3 className='text-black md:text-lg font-semibold mt-10'>
                Created With a Focus on Real-World Relevance
              </h3>
              <p className='text-black mt-4 font-medium text-sm tracking-wide leading-6'>
               {training.Curriculum}
              </p>
              <h3 className='text-black md:text-lg font-semibold mt-10'>
                Get a Head Start With Self-Paced Prep Lessons
              </h3>
              <p className='text-black mt-4 font-medium text-sm tracking-wide leading-6'>
                Before day one, gain familiarity with the course prerequisites.
                We take a blended approach to learning, so you’ll complete a series of preparatory lessons before each session
                to get up to speed with the topic and make the most of collaboration time
              </p>
              </div>
          </div>
          </div>
        <div className="grid md:grid-cols-8">
           
             <div className='md:col-span-4'> </div>
          <div className='md:col-span-3 md:mr-10'>
            <div className='flex flex-col justify-center items-start bg-gray-100 py-6 px-7 mx-6 md:mx-0 h-fit'>
              {training.Modules.map((module, index) => (
                <p key={index} className='text-black text-sm py-4'>
                  <strong>Module {index + 1}:</strong> {module}
                </p>
              ))}
              </div>
          </div>
          </div>
      </div>
      <div className=' grid lg:grid-cols-8 md:grid-cols-10 bg-gray-50'>
        <div className='lg:col-span-2 md:col-span-1 '></div>
        <div className='lg:col-span-5  md:col-span-9 py-16 grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 gap-5 md:gap-0'>
          <div className='lg:col-span-1 flex justify-center items-center '>
            <Image src={male} width={150} height={150} alt='user image' className='rounded-full '/>
          </div>
          <div className='lg:col-span-2 px-6 text-gray-500 tracking-wide font-semibold flex flex-col justify-start '>
            <em>“Gobeze Learning provides an empowering and engaging learning experience.
                  I've gained valuable skills and knowledge through Gobeze Learning,
              and I highly recommend it to anyone looking for a dynamic and enriching educational experience.”</em>
            <h5 className='font-bold text-sm my-2 text-black'>Former Gobeze's Student</h5>
            <h5 className='font-normal text-sm  text-black'>Mikias Walelign</h5>
          </div>
        
        </div>
      </div>
    </div>
  )
}

export default Curriculum;