import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import Moment from 'moment';
import Image from 'next/image';
import graphics from '../../../images/graphics.avif';
const textStyle = {
  m: 0,
  letterSpacing: '-0.125px',
  textDecoration: 'none',
  verticalAlign: 'unset',
};

const ClassDescription = ({ training }) => {
  
  return (
    <>
      <Box
        component='section'
        sx={{
          pt: 6,
          pb: 6,
          background: 'transparent',
          color: 'secondary.main',
        }}
      >
        <Paper
          sx={{
            padding: '0px !important',
            display: 'block',
            width: '100%',
            mx: 'auto',
            maxWidth: '100%',
            '@media screen and (min-width: 576px)': {
              px: '1.5rem',
              maxWidth: '540px ',
            },
            '@media screen and (min-width: 768px)': {
              position: 'relative',
              px: '1.5rem',
              maxWidth: '922px ',
            },
            '@media screen and (min-width: 992px)': {
              position: 'relative',
              px: '1.5rem',
              maxWidth: '992px ',
            },
            '@media screen and (min-width: 1200px)': {
              maxWidth: '1300px',
            },
            '@media screen and (max-width: 486px)': {
              px: 0,
            },
          }}
        >
          <Grid
            container
            item
            spacing={3}
            xs={12}
            sx={{
              display: 'flex',
              flexFlow: 'row wrap',
              width: '100%',
              m: '0px auto',
              // flexBasis: '83.3333%',
              // maxWidth: '83.3333%',
              '& .MuiGrid-item': {
                pl: 3,
                pt: 3,
              },
            }}
          >
            <Box
              sx={{
                width: '100%',
                py: 6,
                background:
                  'linear-gradient(195deg, rgba(10, 18, 45, 1), rgba(10, 18, 45, 0.8))',
                borderRadius: '0.5rem',
                boxShadow: 'none',
              }}
            >
              <Grid
                container
                sx={{
                  display: 'flex',
                  flexFlow: 'row wrap',
                  width: '100%',
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={6}
                  xl={4}
                  sx={{
                    m: 0,
                    flexDirection: 'row',
                    flexBasis: '100%',
                    maxWidth: '100%',
                    flexGrow: '0',
                    px: 6,
                    position: 'relative',
                    '@media screen and (min-width: 576px)': {
                      flexBasis: '100%',
                      maxWidth: '100%',
                    },
                    '@media screen and (min-width: 768px)': {
                      flexBasis: '50%',
                      maxWidth: '50%',
                    },
                    '@media screen and (min-width: 992px)': {
                      flexBasis: '50%',
                      maxWidth: '50%',
                    },
                  }}
                >
                  <Box
                    sx={{
                      position: 'relative',
                      width: 'auto',
                      height: '260px',
                      '& span': {
                        '& img': {
                          // width: '100%',
                          objectFit: 'cover',
                          maxWidth: '300px',
                          // mt: -12,
                          // background: 'transparent',
                          borderRadius: '0.375rem',
                          boxShadow: 'none',
                          // height: 'auto',
                        },
                      },
                    }}
                  >
                    <Image
                      src={training.thumbnail}
                      alt='graphic Design'
                      layout='fill'
                    />
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={5}
                  xl={4}
                  sx={{
                    flexDirection: 'row',
                    position: 'relative',
                    flexBasis: '100%',
                    maxWidth: '100%',
                    color: 'white',
                    m: 0,
                    px: 6,
                    my: 0,
                    '@media screen and (min-width: 576px)': {
                      flexBasis: '100%',
                      maxWidth: '100%',
                    },
                    '@media screen and (min-width: 768px)': {
                      flexBasis: '41.6667%',
                      maxWidth: '41.6667%',
                      px: 2,
                      my: 'auto',
                    },
                    '@media screen and (min-width: 992px)': {
                      flexBasis: '41.6667%',
                      maxWidth: '41.6667%',
                    },
                  }}
                >
                  <Typography
                    component='p'
                    variant='body2'
                    sx={{
                      ...textStyle,
                      margin: '0px 0px 16px',
                      lineHeight: '1.6',
                      fontSize: '1.125rem',
                      fontWeight: '300',
                      '@media screen and (max-width: 876px)': {
                        fontSize: '1rem',
                        lineHeight: '1.5',
                      },
                    }}
                  >
                    {training.description}
                  </Typography>
                  {training.instructor && (
                    <Box>
                      <Typography
                        component='span'
                        sx={{
                          lineHeight: '1.5',
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          m: 0,
                        }}
                      >
                        Instructor -
                      </Typography>

                      <Typography
                        component='span'
                        variant='body2'
                        sx={{
                          ...textStyle,
                          ml: 1,
                          lineHeight: '1.6',
                          fontSize: '0.875rem',
                          fontWeight: '300',
                        }}
                      >
                        {training.instructor}
                      </Typography>
                    </Box>
                  )}
                  {training.schedules === undefined ? (
                    <Box>
                      <Typography
                        component='span'
                        sx={{
                          lineHeight: '1.5',
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          m: 0,
                        }}
                      >
                        Schedule -
                      </Typography>

                      <Typography
                        component='span'
                        variant='body2'
                        sx={{
                          ...textStyle,
                          ml: 1,
                          lineHeight: '1.6',
                          fontSize: '0.875rem',
                          fontWeight: '300',
                        }}
                      >
                        {training.schedule && training.schedule.map((scheduleItem, scheduleIndex) => (
                            <div key={scheduleIndex} style={{display: 'flex', gap: '10px'}}>
                              <div>{[...scheduleItem.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(0, 1) + ' - ' + [...scheduleItem.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(-1)}</div>
                              <div>{Moment(scheduleItem.startHour).format("h:mm A")} - {Moment(scheduleItem.endHour).format("h:mm A")}</div>
                            </div>
                          ))}
                      </Typography>
                    </Box>
                  ) : (
                    <Box>
                      <Typography
                        component='span'
                        sx={{
                          lineHeight: '1.5',
                          fontSize: '0.875rem',
                          fontWeight: '700',
                          m: 0,
                        }}
                      >
                        Schedules -
                      </Typography>

                      <Typography
                        component='span'
                        variant='body2'
                        sx={{
                          ...textStyle,
                          ml: 1,
                          lineHeight: '1.6',
                          fontSize: '0.875rem',
                          fontWeight: '300',
                        }}
                      >
                        Choose Schedule
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <Typography
                      component='span'
                      sx={{
                        lineHeight: '1.5',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        m: 0,
                      }}
                    >
                      Duration -
                    </Typography>
                    <Typography
                      component='span'
                      variant='body2'
                      sx={{
                        ...textStyle,
                        ml: 1,
                        lineHeight: '1.6',
                        fontSize: '0.875rem',
                        fontWeight: '300',
                      }}
                    >
                      {training.course?.duration}
                    </Typography>
                  </Box>
                </Grid>
                {/* <Grid></Grid> */}
                <Grid
                  item
                  xs={12}
                  xl={4}
                  sx={{
                    m: 0,
                    flexDirection: 'row',
                    flexBasis: '100%',
                    flexGrow: '0',
                    maxWidth: '100%',
                    lineHeight: '1',
                    px: 6,
                  }}
                >
                  <Typography
                    component='h3'
                    sx={{
                      ...textStyle,
                      m: '0px 0px 8px',
                      fontSize: '1.875rem',
                      lineHeight: '1.375',
                      fontWeight: '700',
                      color: 'white',
                      maxWidth: '400px',
                      '@media screen and (min-width: 0px)': {
                        mt: 6,
                      },
                      '@media screen and (max-width: 876px)': {
                        fontSize: '1.325rem',
                        lineHeight: '1.5',
                      },
                    }}
                  >
                    {training.course?.courseName}
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{
                      ...textStyle,
                      margin: '0px 0px 16px',
                      lineHeight: '1.5',
                      fontSize: '0.875rem',
                      fontWeight: '300',
                      opacity: '0.8',
                      color: 'white',
                    }}
                  >
                    Starts on{' '}
                    {Moment(training.start_date).format('MMM DD YYYY ')}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default ClassDescription;
