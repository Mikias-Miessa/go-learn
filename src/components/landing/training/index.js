import {Box,CircularProgress,Paper, Typography} from '@mui/material'

import Footer from "../Footer"
import Header from "./Header"

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
            
              <div>
                  <Hero training={training} />
            <Nav training={training}/>
            <OverView training={training}/>
            <Curriculum /> 
            <Instructors training={training}/>
            <Tuition/>
            <FAQ/>
              </div>

          
           : 
            <div className='bg-white h-screen flex justify-center items-center'>
              <div className='text-center'>
                <CircularProgress color='primary' sx={{ m: 'auto' }} />
              </div>
            </div>
            
          }
               
        
        </main>
        
        <Footer />
      </>
    )
    // 
}


export default TrainingPage;