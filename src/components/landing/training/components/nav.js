"use client"
import React from 'react';
import { Link } from 'react-scroll'

const links = [
    {
        id: 1,
        link: 'Overview'
    },
    {
        id: 2,
        link: 'Curriculum'
    },
    {
        id: 3,
        link: 'Instructors'
    },
    {
        id: 4,
        link: 'Tuition & Financing'
    },
    {
        id: 5,
        link: 'FAQ'
    },
]

const Nav = () => {
    return (
        <nav className='hidden lg:flex lg:sticky lg:top-20 lg:bg-gray-100 rounded-md h-80 w-48 xl:ml-32 ml-10 z-50 flex-col justify-between pt-3'>
            <div className='flex flex-col justify-between'>
                {links.map(({ id, link }) => (
                    <p key={id} className='px-4 cursor-pointer my-3 capitalize font-medium  text-gray-700 hover:text-sky-800 duration-200'>
                        <Link to={link}  duration={200} spy={true} activeClass='nav-active'  smooth={true} offset={-50}  >
                            {link}
                        </Link>
                    </p>
                ))}
            </div>

            <button className='bg-orange-400 rounded-sm h-12'> Apply Now</button>
        </nav>
    );
};

export default Nav;
