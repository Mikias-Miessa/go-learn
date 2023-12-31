import {Box,Paper} from '@mui/material'
import Classes from "./Classes"
import Footer from "../Footer"
import Header from "../Header"
import Hero from './ClassesHero'
const TrainingsPage = () =>{

    return (
      <>
        <Header />
        <main>
          <Hero />
          <Paper
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
            
          >
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
            <Classes />
               
          </Paper>
        </main>
        <Footer />
      </>
    );
}

export default TrainingsPage;