import { useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Container,
  Grid,
  Badge,
  Typography,
  Card,
  Skeleton,
} from '@mui/material';
import Moment from 'moment';

import logo from '../../../../public/logo.png';
import Link from '../../Link';
import { getRunningClassesAd } from '../../../../store/classSlice';
const textStyle = {
  m: 0,
  letterSpacing: '-0.125px',
  textDecoration: 'none',
  verticalAlign: 'unset',
};

const Courses = () => {
  const { runningClasses, loading } = useSelector((state) => state.classroom);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRunningClassesAd());
  }, []);
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
            {loading ? (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    alignItems: 'center',
                    margin: 'auto',
                    gap: '2rem',
                  }}
                >
                  {[0, 1, 2].map((index) => (
                    <Box
                      key={index}
                      sx={{ width: 210, marginRight: 0.5, my: 5 }}
                    >
                      <Skeleton
                        variant='rectangular'
                        width={210}
                        height={118}
                      />
                      <Box sx={{ pt: 0.5 }}>
                        <Skeleton />
                        <Skeleton width='60%' />
                      </Box>{' '}
                    </Box>
                  ))}
                </Box>
              </>
            ) : (
              runningClasses.length > 0 &&
              runningClasses.map(
                (course, index) =>
                  course && (
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
                              maxHeight: '188px',
                              overflow: 'hidden',
                            }}
                          >
                            <Box
                              sx={{
                                position: 'relative',
                                width: '100%',
                                height: '200px',
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
                              <Image
                                src={
                                  course.thumbnail ? course.thumbnail : logo
                                }
                                alt='graphic Design'
                                layout='fill'
                              />
                            </Box>
                          </Box>
                          <Box
                            sx={{
                              p: 3,
                              mt: '-16px',
                            }}
                          >
                            <Typography
                              component='h5'
                              sx={{
                                ...textStyle,
                                fontSize: '1.125rem',
                                lineHeight: '1.2',
                                display: 'inline',
                                textTransform: 'capitalize',
                                color: 'secondary.main',
                                fontWeight: '600',
                              }}
                            >
                              {course.course?.courseName &&
                                course.course?.courseName}
                            </Typography>
                            <Box
                              sx={{
                                mt: 1,
                                mb: 3,
                              }}
                            >
                              <Typography
                                component='p'
                                sx={{
                                  ...textStyle,
                                  fontWeight: '300',
                                  fontSize: '1rem',
                                  lineHeight: '1.6',
                                  color: 'secondary.light',
                                }}
                              >
                                Starts on{' '}
                                {course.start_date &&
                                  Moment(course.start_date).format(
                                    'MMM DD YYYY '
                                  )}
                              </Typography>
                            </Box>

                            <Link
                              href={`/trainings/${course.slug && course.slug}`}
                              sx={{
                                boxSizing: 'border-box',
                                m: 0,
                                outline: '0',
                                verticalAlign: 'middle',
                                textDecoration: 'none',
                                letterSpacing: '0.02857em',
                                minWidth: 8,
                                fontWeight: '700',
                                borderRadius: '0.5em',
                                lineHeight: '1.4',
                                textAlign: 'center',
                                textTransform: 'uppercase',
                                transition: 'all 150ms ease-in 0s',
                                minHeight: '2rem',
                                padding: '0.375rem 1rem',
                                fontSize: '0.75rem',
                                background: 'initial',
                                backgroundColor: 'transparent',
                                backgroundSize: '150%',
                                backgroundPositionX: '25%',
                                border: '1px solid ',
                                color: 'secondary.main',
                              }}
                            >
                              Learn more
                            </Link>
                          </Box>
                        </Card>
                      </Box>
                    </Grid>
                  )
              )
            )}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Courses;
