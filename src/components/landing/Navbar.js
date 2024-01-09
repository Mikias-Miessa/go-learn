import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
// import { Link } from 'react-scroll'
import logo from '../../images/logo.png';
import Link from '../Link';
import Image from 'next/image';
// import { motion } from "framer-motion"

const NavBar = () => {
    const [nav, setNav] = useState(false);
    const [ad, setAd] = useState(true);
    const links = [
        {
            id: 1,
            link: '/',
            name: 'Home'
        },
        {
            id: 2,
            link: '/trainings',
            name:'Classroom Trainings'
        },
        {
            id: 3,
            link: 'https://siltena.com',
            name:'Online Trainings'
        },
        {
            id: 4,
            link: '/certificate',
            name:'Certificates'
        },
        {
            id: 5,
            link: 'contact'
        },
    ]
    return (
        <div className='fixed z-50'>
            {ad &&
            <div className='w-screen bg-orange-400 h-12 flex justify-center text-center items-center text-white'>
                <p className='md:px-16 font-Montserrat text-white'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione consectetur quos temporibus inventore est 
                    veniam tempore laudantium nisi!
                    Repudiandae nesciunt cum temporibus molestiae. Voluptatum praesentium alias autem distinctio eveniet debitis.
                </p>
                <button className='cursor-pointer pr-4 mr-8' onClick={() => setAd(!ad)}>
                    <FaTimes size={15} />
                </button>
            </div>
            }
        <div className='flex justify-between items-center w-full h-16  text-black bg-opacity-80  bg-gray-50 shadow-md backdrop-blur-md fixed px-6'>
            <div>
                {/* <h1 className='text-xl font-logo ml-4 mt-2 hover:cursor-pointer'>Mikias</h1> */}
                <Link href='/'>
                <Image src={logo} alt='gobeze logo' height={40} width={40} />
              </Link>
            </div>
            <ul className='hidden md:flex'>

                {links.map(({ id, link, name }) => (
                    <li key={id} className='px-4 font-normal  text-sm  cursor-pointer capitalize  hover:scale-105 duration-200 my-4'>
                        <Link href={link} smooth duration={500} className=' no-underline tracking-normal font-Montserrat'  >{name}</Link> </li>
                ))}

            </ul>
            <div className='cursor-pointer pr-4 z-10 text-orange-500 md:hidden' onClick={() => setNav(!nav)}>
                {nav ? <FaTimes size={20} /> : <FaBars size={20} />}
            </div>
            {nav && (
             <ul className='flex flex-col  items-start absolute top-16 left-0 w-full h-fit bg-opacity-90 z-50 bg-gray-50 shadow-md font-Montserrat  '>
                    {links.map(({ id, link, name }) => (
                    <li key={id} className='px-4 cursor-pointer capitalize py-2 text-xl  hover:scale-105 duration-200 '><Link onClick={()=> setNav(!nav)} href={link} smooth duration={500} className='no-underline font-Montserrat ' >{name}</Link></li>
                ))}
            </ul>   
            )}
            
            </div>
            </div>
    );
};

export default NavBar