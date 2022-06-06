import { Box, Container, Grid, Badge, Typography, Card } from '@mui/material';
import Image from 'next/image';
import graphicPoster from '../../images/graphicPoster.jpg';
import graphics from '../../images/graphics.avif';
import Link from '../Link'
const textStyle = {
    m: 0, letterSpacing: '-0.125px',textDecoration: 'none', verticalAlign: 'unset'
}
const courses = [{
  title: 'Graphic Design', 
  description: 'Website visitors today demand a frictionless user expericence — especially when using search.',
  url: '/register',
  image: graphics
},
{
  title: 'Digital Marketing', 
  description: 'Website visitors today demand a frictionless user expericence — especially when using search.',
  url: '/register',
  image: graphics
},
{
  title: 'Video Editing', 
  description: 'Website visitors today demand a frictionless user expericence — especially when using search.',
  url: '/register',
  image: graphics
},
{
  title: 'Advanced Graphic Design', 
  description: 'Website visitors today demand a frictionless user expericence — especially when using search.',
  url: '/register',
  image: graphics
},
]

const Trainings = () => {
  return (
    <>
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
          <Grid
            container
            item
            xs={12}
            lg={6}
            sx={{
              mx: 'auto',
              display: 'flex',
              flexFlow: 'column wrap',
              width: '100%',
              margin: '0px auto',
              alignItems: 'center',
              textAlign: 'center',
              '@media screen and (min-width: 576px)': {
                flexBasis: '100%',
                maxWidth: '100%',
                flexGrow: '0',
                maxWidth: '540px',
              },
              '@media screen and (min-width: 768px)': {
                maxWidth: '720px',
              },
            }}
          >
            <Badge
              color='primary'
              badgeContent='Trainings'
              sx={{
                mb: 1,
                fontSize: '1rem',
                textTransform: 'uppercase',
                '& span.BaseBadge-badge': {
                  height: '24px',
                  p: '0px 12px',
                  color: 'primary.main',
                  backgroundColor: '#ff7e0033',
                },
              }}
            />
            <Typography
              component='h2'
              sx={{
                m: '8px 0px',
                fontSize: '2.25rem',
                lineHeight: '1.3',
                fontWeight: '700',
              }}
            >
              Explore our Trainings
            </Typography>
            <Typography
              component='p'
              sx={{
                m: 0,
                fontSize: '1rem',
                fontWeight: '300',
                lineHeight: '1.6',
                color: 'secondary.light',
                letterSpacing: '-0.125px',
              }}
            >
              If you can't decide, the answer is no. If two equally difficult
              paths, choose the one more painful in the short term (pain
              avoidance is creating an illusion of equality).
            </Typography>
          </Grid>

          <Grid
            container
            spacing={3}
            sx={{
              boxSizing: 'border-box',
              display: 'flex',
              flexFlow: 'row wrap',
              width: 'calc(100% + 24px)',
              ml: '-24px',
              mt: '24px',
              '& .MuiGrid-item': {
                pl: 3,
                pt: 3,
              },
            }}
          >
            {courses.map((course, index) => (
              <Grid
                key={index}
                item
                xs={12}
                md={6}
                lg={4}
                sx={{
                  boxSizing: 'border-box',
                  m: 0,
                  flexDirection: 'row',
                  flexBasis: '100%',
                  maxWidth: '100%',
                  flexGrow: '0',
                  '@media screen and (min-width: 576px)': {
                    flexBasis: '100%',
                    maxWidth: '100%',
                    flexGrow: '0',
                  },
                  '@media screen and (min-width: 768px)': {
                    flexBasis: '50%',
                    maxWidth: '50%',
                    flexGrow: '0',
                  },
                  '@media screen and (min-width: 992px)': {
                    flexBasis: '33.3333%',
                    maxWidth: '33.3333%',
                    flexGrow: '0',
                  },
                }}
              >
                <Box
                  sx={{
                    mt: 3,
                    opacity: '1',
                    background: 'transparent',
                    color: 'secondary.main',
                    boxShadow: 'none',
                  }}
                >
                  <Card
                    variant='outlined'
                    sx={{
                      transition:
                        'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      minWidth: '0px',
                      overflowWrap: 'break-word',
                      backgroundColor: 'white',
                      backgroundClip: 'border-box',
                      border: '0px solid rgba(0, 0, 0, 0.125)',
                      borderRadius: '0.75rem',
                      boxShadow:
                        'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
                      overflow: 'visible',
                    }}
                  >
                    <Box
                      sx={{
                        position: 'relative',
                        mx: 2,
                        mt: '-24px',
                        borderRadius: '0.5rem',
                        boxShadow: 'none',
                        boxShadow: 'none',
                        '& img': {
                          width: '100%',
                          background: 'transparent',
                          borderRadius: '0.5rem',
                          boxShadow:
                            'rgb(0 0 0 / 10%) 0rem 0.25rem 0.375rem -0.0625rem, rgb(0 0 0 / 6%) 0rem 0.125rem 0.25rem -0.0625rem',
                          height: 'auto',
                        },
                      }}
                    >
                      <Image src={graphics} alt='graphic Design' layout='raw' />
                    </Box>
                    <Box sx={{
                        p:3, mt:'-16px'
                    }}>
                        <Typography component='h5' sx={{...textStyle, fontSize: '1.25rem', lineHeight: '1.375', display:'inline', textTransform: 'capitalize', color: 'secondary.main',  fontWeight: '400'
                        }} >
                            {course.title}
                            </Typography>
                            <Box sx={{
                            mt: 1, mb: 3,
                        }}>
                            <Typography component='p' sx={{
                              ...textStyle, fontWeight: '300',fontSize: '1rem', lineHeight: '1.6', color: 'secondary.light'
                            }}>
                           {course.description}
                                </Typography>
                            </Box>
                         
                            <Link  href={`/trainings/${course.url}`} sx={{boxSizing: 'border-box',
                        m:0, outline:'0', verticalAlign: 'middle', textDecoration: 'none',letterSpacing: '0.02857em', minWidth: 8, fontWeight: '700', borderRadius: '0.5em', lineHeight: '1.4', textAlign: 'center', textTransform: 'uppercase', transition: 'all 150ms ease-in 0s', minHeight: '2rem', padding: '0.375rem 1rem', fontSize: '0.75rem', background: 'initial', backgroundColor: 'transparent', backgroundSize: '150%', backgroundPositionX: '25%',border: '1px solid ',color: 'secondary.main'
                        }}>Register</Link>
                               
                        </Box>
                        
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Trainings;
