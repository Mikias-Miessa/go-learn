import React from 'react';
import Nav from './nav';
import Image from 'next/image'
import Moment from 'moment';
import companyLogos from '../../../../../public/companyLogos.jpg'
const OverView = ({training}) => {
  return (
    <div name="Overview" className='h-fit bg-white grid lg:grid-cols-8 px-10 mb-3 lg:-mt-80'>
      <div className='hidden lg:block lg:col-span-2'>
            {/* <Nav/> */}
      </div>
      <div className='lg:col-span-6 flex flex-col lg:pr-24'>
        <div className='w-full mt-10'>
          <p className='text-2xl md:text-4xl font-bold text-black'>Ready to build your career? Seize the opportunity – register today!</p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 pt-10'>
            <div className='col-span-1 '>
              <h1 className='text-black font-bold text-xl lg:text-2xl mb-4'> Course Overview: </h1>
              <h3 className='text-black tracking-wide text-sm ml-5 leading-6'>
                <ol className='mb-2'><strong>Duration: </strong>{ training.course?.duration}</ol>
                <ol className='mb-2'><strong>Start day: </strong>{Moment(training.start_date).format('MMM DD YYYY ')}</ol>
                <ol className='mb-2'><strong>Prerequisites: </strong> {training.prerequisites} </ol>
                {/* <ol className='mb-2'><strong>Technologies Covered: </strong> HTML, CSS, JavaScript, PHP, mySQL & NoSQL .</ol> */}

                <ol><strong>WeeklyCommitment:</strong> { training.WeeklyCommitment}</ol>

              </h3>
             </div>
            <div className='col-span-1'>
              <h1 className='text-black font-bold text-xl lg:text-2xl mb-4'> Why Choose Us: </h1>
              <p className='text-black font-medium leading-8'>
                {training.WhyChooseUs}
              </p>
             </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 pt-10'>
              <div className='col-span-1'>
              <h1 className='text-black font-bold text-xl lg:text-2xl mb-4'> What You Will Gain: </h1>
              <p className='text-black font-medium leading-8'>
                {training.WhatYouWillGain}
              </p>
             </div>
          </div>
          <div className='my-20'>
            <Image src={companyLogos} alt='Company logos' />
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default OverView;
