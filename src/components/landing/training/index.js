import {Box,CircularProgress,Paper, Typography} from '@mui/material'
// import ClassDescription from "./ClassDescription"
import Footer from "../Footer"
import Header from "./Header"
// import Hero from './ClassHero';
// import Enroll from './Enroll';
import React from 'react'
import OverView from './components/overview'
import Curriculum from './components/curriculum'
import Hero from './components/hero'
import Nav from './components/nav'
import Instructors from './components/instructors'
import FAQ from './components/faq'
import Tuition from './components/tuition'
const TrainingPage = ({training}) =>{
    return   (
      <>
        <Header />
        <main className='bg-white'>
          
          {training ?
            <>

            <Hero training={training} />
            <Nav/>
            <OverView />
            <Curriculum /> 
            <Instructors />
            <Tuition/>
            <FAQ/>
          </> : 
            <div className='bg-white flex justify-center items-center'>
          <div className='text-center'><CircularProgress color='primary' sx={{ m: 'auto' }} /></div>
        </div>
            
          }
               
        
        </main>
        
        <Footer />
      </>
    )
    // 
}


export default TrainingPage;