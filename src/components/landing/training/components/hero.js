import Image from 'next/image'
import hero from '../../../../../public/heroo.jpg'
import Link from 'next/link';

const Hero = ({training}) => {
  return (
    <div name='hero' className='h-min bg-white w-full lg:mb-14'>
        <div   className="md:bg-[url('/heroo.jpg')] md:bg-cover lg:bg-cotain md:bg-no-repeat  md:h-min md:pb-20 pb-5">
          <div className="grid lg:grid-cols-5">
             <div className='lg:col-span-3 flex flex-col justify-center ml-10 lg:ml-40 mr-10 mt-10 md:mt-16'>
            <h3 className='text-black text-xs sm:text-sm font-medium mb-10 bg-blue-300 text-center w-fit px-1 md:tracking-wider mt-10'>{ training.remark}</h3>
                <h1 className='text-3xl font-bold md:text-5xl text-black tracking-wider xl:leading-normal'>{training.course?.courseName}</h1>
                <div className='visible md:hidden my-6 flex justify-center'>
              <Image src={training.thumbnail} alt='hero Image' className='w-fit' width={600} height={300}/>
                </div>
                <p className='text-black pt-4 sm:pt-8 pb-4 pr-8 lg:pr-10 font-medium text-base md:leading-loose md:tracking-wide'>
                 {training.description}
                </p>
                <div className="md:relative fixed bottom-0 left-0 w-full bg-white p-4 md:bg-transparent">
                  <a href={`/enroll/${training.slug && training.slug}`} className='group text-white hover:scale-105 duration-200 font-semibold w-fit px-6 py-3 my-2 flex items-center rounded-md bg-amber-500 cursor-pointer'>
                    Apply Now
                  </a>
                </div>
              </div>
          </div>
       </div>
    </div>
  )
}

export default Hero