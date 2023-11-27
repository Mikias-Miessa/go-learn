import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  Typography,
  Backdrop,
  CircularProgress,
  Modal,
} from '@mui/material';
import { useRouter } from 'next/router';
import Footer from '../Footer';
import Header from '../training/Header';
import Hero from '../training/ClassHero';
import graphics from '../../../images/graphics.avif';
import Image from 'next/image';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { getClass } from '../../../../store/classSlice';
import { addStudent, reset } from '../../../../store/studentSlice';
import Information from './Information';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
// import { withGoogleMap, GoogleMap } from 'react-google-maps';

// const MyMap = withGoogleMap(() => {
//   if (typeof window !== 'undefined' && typeof window.google !== 'undefined') {
//     return (
//       <GoogleMap
//         defaultZoom={18}
//         defaultCenter={{ lat: 9.017626, lng: 38.8012533 }}
//       />
//     );
//   }
//   return null;
// });

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const TrainingsPage = () => {
  const { singleClass, loading } = useSelector((state) => state.classroom);
  const { status } = useSelector((state) => state.student);

  const router = useRouter();
  const dispatch = useDispatch();
  const { query } = router;
  // 
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    bank: 'cbe',
    schedule: ''
  });
  const [backdrop, setBackdrop] = useState(false);
  const [info, setInfo] = useState(false);
  const [phone, setPhone] = useState('');
  const [validPhoneNumber, setValidPhone] = useState(null);

  useEffect(() => {
    if (singleClass) {
      setValues({
        ...values,
        course: singleClass._id,
      });
    }
  }, [singleClass]);

  useEffect(() => {
    setValues({
      ...values,
      phone,
    });
    if (phone !== undefined) {
      setValidPhone(isValidPhoneNumber(phone));
    }
  }, [phone]);

  useEffect(() => {
    if (status === 'pending') {
      setBackdrop(true);
    }
    if (status === 'success') {
      // setValues({
      //   name: '',
      //   email: '',
      //   phone: '',
      //   course: '',
      //   bank: 'cbe'
      // })
      setInfo(true);
      setBackdrop(false);
      dispatch(reset());
    }
  }, [status]);

  useEffect(() => {
    
    query && dispatch(getClass(query.slug));
  }, [query]);

  const handleInputChange = (e) => {
    
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleClose = () => {
    setInfo(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    validPhoneNumber && dispatch(addStudent(values));
  };

  function summarizeSchedule(schedule) {
    const startTime = formatTime(schedule.startHour);
    const endTime = formatTime(schedule.endHour);
    const timeRange = `${startTime} to ${endTime}`;
    return `${[...schedule.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(0, 1) + ' - ' + [...schedule.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(-1)} (${timeRange})`;
  }

  function formatTime(time) {
    const [hour, minute] = time.split(':');
    const isPM = hour >= 12;
    const formattedHour = (hour % 12) || 12;
    const formattedMinute = String(minute).padStart(2, '0');
    const period = isPM ? 'pm' : 'am';
    return `${formattedHour}:${formattedMinute}${period}`;
  }

  function isValidPhoneNumber(phone) {
    if (phone.length == 13) {
      return true
    } else {
      return false
    }
  }

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
            px: 2,
            py: 6,
            transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            display: 'flex',
            // flexDirection: 'column',
            position: 'relative',
            overflowWrap: 'break-word',
            backgroundClip: 'border-box',
            border: '0px solid rgba(0, 0, 0, 0.125)',
            borderRadius: '0.75rem',
            overflow: 'visible',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'saturate(200%) blur(30px)',
            boxShadow: 'rgb(0 0 0 / 5%) 0rem 1.25rem 1.6875rem 0rem',
            '@media screen and (max-width: 784px)': {
              flexDirection: 'column',
            },
          }}
        >
          {loading ? (
            <CircularProgress color='primary' sx={{ m: 'auto' }} />
          ) : (
            <>
              <Box
                sx={{
                  width: '50%',
                  p: 2,
                  '@media screen and (max-width: 784px)': {
                    width: '100%',
                  },
                }}
              >
                <form action='' onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        id='name'
                        name='name'
                        label='Full Name'
                        fullWidth
                        variant='outlined'
                        value={values.name}
                        onChange={handleInputChange}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        // required
                        id='email'
                        name='email'
                        label='Email'
                        fullWidth
                        variant='outlined'
                        type='email'
                        onChange={handleInputChange}
                        value={values.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item xs={12}>
                        <Grid
                          item
                          xs={12}
                          sx={{
                            '& input': {
                              p: 2,
                              my: 2,
                            },
                          }}
                        >
                          <PhoneInput
                            international
                            defaultCountry='ET'
                            name='phone'
                            placeholder='phone number'
                            value={values.phone}
                            onChange={setPhone}
                            required
                          />
                          {validPhoneNumber == false && (
                            <Typography sx={{ color: 'red', p: '8px 16px' }}>
                              Not a valid phone number.
                            </Typography>
                          )}
                        </Grid>
                        <InputLabel id='bank'>Bank of Choice</InputLabel>
                        <Select
                          labelId='bank'
                          value={values.bank}
                          label='Bank of Choice *'
                          fullWidth
                          name='bank'
                          onChange={handleInputChange}
                        >
                          <MenuItem value='cbe'>CBE</MenuItem>
                          <MenuItem value='dashen'>DASHEN BANK</MenuItem>
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                        <InputLabel id="schedule" sx={{mt: '20px'}}>Choose Schedule</InputLabel>
                        <Select
                          required
                          labelId="schedule"
                          id="schedule"
                          label="Schedule *"
                          name="schedule"
                          value={values.schedule}
                          onChange={handleInputChange}
                          fullWidth
                        >
                          {singleClass?.schedule && singleClass?.schedule.map((schedule) => (
                            <MenuItem key={schedule._id} value={schedule._id}>
                              {summarizeSchedule(schedule)}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Required</FormHelperText>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {/* <Button onClick={()=>{
                      setOpen(false)
                    }} sx={{ mt: 3, ml: 1 }}>
                      Cancel
                    </Button> */}

                    <Button
                      variant='contained'
                      type='submit'
                      fullWidth
                      // onClick={handleSubmit}
                      sx={{
                        mt: 3,
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1rem',
                        ':hover': {
                          backgroundColor: 'primary.main',
                        },
                        ':hover span svg': {
                          width: '4em',
                          trasition: 'width 2s',
                        },
                      }}
                      endIcon={
                        <ArrowForwardSharpIcon
                          fontSize='large'
                          sx={{
                            textAlign: 'right',
                            trasition: 'width 2s',
                          }}
                        />
                      }
                    >
                      Proceed Enrollment
                    </Button>
                  </Box>
                </form>
                {/* <Paper sx={{ pt: '20px', height: '500px' }}>
                  <MyMap
                    containerElement={<div style={{ height: '100%' }} />}
                    mapElement={<div style={{ height: '100%' }} />}
                  />
                </Paper> */}
              </Box>
              <Box
                sx={{
                  width: '50%',
                  p: 2,
                  '@media screen and (max-width: 784px)': {
                    width: '100%',
                  },
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        position: 'relative',
                        width: '100%',
                        height: '400px',
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
                          singleClass?.thumbnail
                            ? singleClass?.thumbnail
                            : graphics
                        }
                        alt='graphic Design'
                        layout='fill'
                      />
                    </Box>
                  </Grid>
                  <Box sx={{ display: 'flex' }}>
                    <Typography
                      variant='body1'
                      sx={{
                        fontWeight: '200',
                        lineHeight: '1.6',
                        width: '150px',
                      }}
                    >
                      Course Name :{' '}
                    </Typography>
                    <Typography
                      variant='h4'
                      sx={{
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                        width: '100%',
                      }}
                    >
                      {' '}
                      {singleClass?.course.courseName}{' '}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography
                      variant='body1'
                      sx={{
                        fontWeight: '200',
                        lineHeight: '1.6',
                        width: '150px',
                      }}
                    >
                      Description :{' '}
                    </Typography>
                    <Typography
                      variant='h4'
                      sx={{
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                        width: '100%',
                      }}
                    >
                      {singleClass?.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex' }}>
                    <Typography
                      variant='body1'
                      sx={{
                        fontWeight: '200',
                        lineHeight: '1.6',
                        width: '150px',
                      }}
                    >
                      Price :{' '}
                    </Typography>
                    <Typography
                      variant='h4'
                      sx={{
                        fontWeight: '400',
                        fontSize: '0.875rem',
                        lineHeight: '1.6',
                        width: '100%',
                      }}
                    >
                      {singleClass?.course.price} ETB
                    </Typography>
                  </Box>
                </Grid>
              </Box>
            </>
          )}
        </Paper>
      </main>
      <Footer />

      <Modal open={info} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <Information
            setOpen={setInfo}
            bank={values.bank}
            email={values.email}
            name={values.name}
          />
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default TrainingsPage;
