import { useState } from 'react';
import Image from 'next/image';
import { Box, Container, IconButton, Collapse } from '@mui/material';
import logo from '../../../images/logo.png';
import Link from '../../Link';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>

        <Box
          sx={{
            pt: 1,
            pb: 1,
            pl: 3,
            pr: 3,
            boxShadow:
              'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
            position: 'fixed',
            left: 0,
            zIndex: '100',
            width: '100%',
            background: 'white',
            backdropFilter: 'saturate(200%) blur(30px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'white',
            }}
          >
            <Box>
              <Link href='/'>
                <Image src={logo} alt='gobeze logo' height={40} width={40} />
              </Link>
            </Box>
            <Box
              sx={{
                display: 'flex',
                background: 'white',
                ml: 'auto',
                mr: 0,
                gap: '2rem',
                '&.MuiBox-root a': {
                  textDecoration: 'none',
                  color: '#105a7E',
                  fontWeight: '500',
                  fontSize: '0.85rem',
                  fontFamily: 'Montserrat',
                },

                '@media screen and (max-width: 576px)': {
                  display: 'none',
                },
              }}
            >
              <Box sx={{}}>
                <Link href='/'>Home</Link>
              </Box>
              {/* <Box sx={{}}>
                <Link href='/'>Who we are</Link>
              </Box> */}
              <Box sx={{}}>
                <Link href='/trainings'>Classroom Trainings</Link>
              </Box>
              <Box sx={{}}>
                <Link href='https://siltena.com' target='_blank'>
                  Online Trainings
                </Link>
              </Box>
              <Box sx={{}}>
                <Link href='/certificate'>Certificates</Link>
              </Box>
            </Box>
            <Box
              sx={{
                background: 'transparent',
                ml: '1.4rem',
                '& a': {
                  textDecoration: 'none',
                  background:
                    'linear-gradient(90deg, rgba(254,126,1,1) 17%, rgba(254,126,1,0.9248074229691877) 63%, rgba(254,126,1,0.8211659663865546) 100%)',
                  color: 'white !important',
                  fontWeight: '700 !important',
                  fontFamily: 'Montserrat',
                  fontSize: '.75rem',
                  p: '0.7rem 1rem',
                  boxShadow:
                    'rgb(254 126 1 / 15%) 0rem 0.1875rem 0.1875rem 0rem, rgb(254 126 1 / 20%) 0rem 0.1875rem 0.0625rem -0.125rem, rgb(254 126 1 / 15%) 0rem 0.0625rem 0.3125rem 0rem',
                },
                '@media screen and (max-width: 576px)': {
                  ml: 'auto',
                },
              }}
            >
              <Link href='/trainings'>
                Register Now
              </Link>
            </Box>
            <Box
              sx={{
                display: 'none',
                '@media screen and (max-width: 576px)': {
                  display: 'block',
                },
              }}
            >
              {open ? (
                <IconButton
                  onClick={handleClick}
                  color='primary'
                  component='span'
                  style={{ display: 'flex', margin: 'auto' }}
                >
                  <CloseIcon />
                </IconButton>
              ) : (
                <IconButton
                  onClick={handleClick}
                  color='primary'
                  component='span'
                  style={{ display: 'flex', margin: 'auto' }}
                >
                  <MenuIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box>
            <Box>
              <Collapse in={open} timeout='auto' unmountOnExit>
                <Box
                  sx={{
                    display: 'flex',
                    pb: '1rem',
                    pt: '1rem',
                    flexDirection: 'column',
                    background: 'transparent',
                    ml: 'auto',
                    mr: 0,
                    gap: '1rem',
                    '&.MuiBox-root a': {
                      textDecoration: 'none',
                      color: '#fff',
                      fontWeight: '600 !important',
                      fontFamily: 'Montserrat',
                      fontSize: '.875rem',
                    },
                  }}
                >
                  <Box>
                    <Link href='/'>Home</Link>
                  </Box>
                  {/* <Box sx={{}}>
                    <Link href='/'>Who we are</Link>
                  </Box> */}
                  <Box sx={{}}>
                    <Link href='/trainings'>Classroom Trainings</Link>
                  </Box>
                  <Box sx={{}}>
                    <Link href='https://siltena.com' target='_blank'>
                      Online Trainings
                    </Link>
                  </Box>
                  <Box sx={{}}>
                    <Link href='/certificate'>Certificates</Link>
                  </Box>
                </Box>
              </Collapse>
            </Box>
          </Box>
        </Box>
    </>
  );
};

export default Header;
