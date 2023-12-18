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
          {/* <Hero /> */}
          {/* <Paper
            sx={{
              ml: 3,
              mr: 3,
              mt: '-64px',
              mb: '32px',
              p: 2,
              transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              overflowWrap: 'break-word',
              backgroundClip: 'border-box',
              border: '0px solid rgba(0, 0, 0, 0.125)',
              borderRadius: '0.75rem',
              overflow: 'visible',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'saturate(200%) blur(30px)',
              boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
             
            }}
            
          > */}
            {/* <Box sx={{
                 '@media screen and (min-width: 576px)': {
                    maxWidth: '540',
                  },
                  '@media screen and (min-width: 768px)': {
                    maxWidth: '720px',
                  },
                  '@media screen and (min-width: 992px)': {
                    maxWidth: '960px',
                  },
            }}> </Box> */}
            {training ?  <>
              {/* <ClassDescription training={training}/>

              <Enroll training={training}/> */}
            <Hero training={training} />
            <Nav/>
            <OverView />
            <Curriculum /> 
            <Instructors />
            <Tuition/>
            <FAQ/>
            </>: <CircularProgress color='primary' sx={{m:'auto'}} />
            
          }
               
          {/* </Paper> */}
        </main>
        <Footer />
      </>
    )
    // 
}


export default TrainingPage;