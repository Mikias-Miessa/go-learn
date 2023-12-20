import {Box,Paper} from '@mui/material'
import Trainings from "./Trainings"
import Footer from "./Footer"
import Header from "./Header"
import Hero from './Hero'
import Stats from './Stats'
import About from './about'
const LandingPage = () =>{

    return (
      <>
        <Header />
        <main>
          <Hero />
          <Paper
            sx={{
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
            
          >
            <About/>
            <Stats />
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
            <Trainings />
               
          </Paper>
        </main>
        <Footer />
      </>
    );
}

export default LandingPage;