import Image from 'next/image';
import { useState } from 'react';
import {
  Box,
  Container,
  IconButton,
  Collapse,
  TextField,
  Paper,
  Typography,
} from '@mui/material';
import logo from '../../../images/logo.png';
import Link from '../../Link';
import NotFoundImg from '../../../images/404.png';
import CertificateHero from './CertificateHero2';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';
const Certificate = ({ certificate }) => {
  
  // const imageSrc = certificate
  //   ? process.env.NODE_ENV === 'production'
  //     ? `https://gobeze.com/certificates/${certificate?.certificateImage}`
  //     : `http://localhost:3000/certificates/${certificate?.certificateImage}`
  //   : null;
  const imageSrc = certificate
    ? process.env.NODE_ENV === 'production'
      ? `https://go-learn-fsf8cqfmr-mikias-miessa.vercel.app/certificates/${certificate?.certificateImage}`
      : `http://localhost:3000/certificates/${certificate?.certificateImage}`
    : null;

  let shareUrl;
  if (typeof window !== 'undefined') {
    shareUrl = window.location.href;
  }
  //   useEffect(function onFirstMount() {
  //     shareUrl = window.location.href;
  //   }, []);
  const [open, setOpen] = useState(false);
  const [certificateId, setCertificateId] = useState('');

  return (
    <>
      <Container
        component='header'
        sx={{
          position: 'sticky',
          top: '0px',
          zIndex: '10',
          pr: '1.5rem',
          pl: '1.5rem',
          ml: 'auto',
          mr: 'auto',
        }}
      >
        <Box
          sx={{
            pt: 1,
            pb: 1,
            pl: 2,
            pr: 2,
            m: '16px 24px',
            boxShadow:
              'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
            borderRadius: '0.75rem',
            position: 'absolute',
            left: 0,
            zIndex: '3',
            width: 'calc(100% - 48px)',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'saturate(200%) blur(30px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: 'transparent',
            }}
          >
            <Box>
              <Link href='/'>
                <Image src={logo} alt='gobeze logo' height={40} width={40} />
              </Link>
            </Box>
            {certificate && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Typography sx={{ fontWeight: '300' }}>
                  Share on Socials
                </Typography>
                <FacebookShareButton
                  url={shareUrl}
                  quote={'View my certificate from Gobeze.'}
                  hashtag={'#gobeze #helpinggoodpeoplewin #knownow'}
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <LinkedinShareButton url={shareUrl}>
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
              </Box>
            )}
          </Box>
          <Box></Box>
        </Box>
      </Container>
      <CertificateHero text='' />
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
          minHeight: '80vh',
        }}
      >
        <Box
          component='section'
          sx={{
            pt: 3,
            pb: 3,
            background: 'transparent',
            color: 'secondary.main',
          }}
        >
          <Container sx={{}}>
            <Box
              sx={{
                // position: 'relative',
                width: '100%',
                height: '100%',
                '& span': {
                  '& img': {
                    width: '100%',
                    borderRadius: '0.5rem',
                    boxShadow:
                      'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
                    height: 'auto',
                    objectFit: 'cover',
                  },
                },
                '& img': {
                  width: '100%',
                },
              }}
            >
              {imageSrc ? (
                <img src={imageSrc} alt='nat' />
              ) : (
                <>
                  <Box sx={{ textAlign: 'center' }}>
                    <Image src={NotFoundImg} />
                    <Typography
                      sx={{ fontWeight: '200', fontSize: '1.5rem', my: 1 }}
                    >
                      Certificate Not Found !
                    </Typography>
                  </Box>
                </>
              )}
            </Box>
            {/* <Box
              sx={{
                // position: 'relative',
                width: '100%',
                height: '100%',
                '& span': {
                  '& img': {
                    width: '100%',
                    borderRadius: '0.5rem',
                    boxShadow:
                      'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
                    height: 'auto',
                    objectFit: 'cover',
                  },
                },
              }}
            >
              <Image src={imageSrc} layout='fill' />
            </Box> */}
          </Container>
        </Box>
      </Paper>
    </>
  );
};

export default Certificate;
