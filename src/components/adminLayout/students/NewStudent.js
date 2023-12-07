import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  TextField,
  Box,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  Backdrop,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { addStudent, reset } from '../../../../store/studentSlice';
import { getRunningClasses } from '../../../../store/classSlice';

const NewStudent = ({ setOpen }) => {
  const { status } = useSelector((state) => state.student);
  const { runningClasses } = useSelector((state) => state.classroom);
  const [backdrop, setBackdrop] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    course: '',
    name: '',
    email: '',
    remark: '',
    contacted: true,
  });
  const [phone, setPhone] = useState('');
  const [validPhoneNumber, setValidPhone] = useState(false);

  function summarizeSchedule(schedule) {
    const startTime = formatTime(schedule.startHour);
    const endTime = formatTime(schedule.endHour);
    const timeRange = `${startTime} to ${endTime}`;
    return `${[...schedule.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(0, 1) + ' - ' + [...schedule.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(-1)} (${timeRange})`;
  }

  let courseOptions = [
  <MenuItem key={0} value=''>
    No Courses
  </MenuItem>,
];

if (runningClasses.length > 0) {
  courseOptions = [
    ...courseOptions, // Keep the "No Courses" option
    ...runningClasses.map((course, index) => (
      course && (
        <MenuItem
          key={index + 1}
          value={course._id && course._id}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Typography sx={{ fontWeight: '300' }}>
            {course.course?.courseName && course.course?.courseName}
          </Typography>

          <Typography sx={{ fontWeight: '400', color: 'primary.main' }}>
            {course?.schedule?.startHour&& course?.schedule?.startHour}
          </Typography>
        </MenuItem>
      )
    )),
  ];
}

  useEffect(() => {
    dispatch(getRunningClasses());
  }, []);

  useEffect(() => {
    setValues({
      ...values,
      phone,
    });
    if (phone !== undefined) {
      setValidPhone(isValidPhoneNumber(phone));
    }
  }, [phone]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  useEffect(() => {
    if (status === 'pending') {
      setBackdrop(true);
    }
    if (status === 'success') {
      toast.success('Registered successfully!');
      setOpen(false);
      setBackdrop(false);
      dispatch(reset());
    }
  }, [status]);
  const handleSubmit = (e) => {
    e.preventDefault();
    

    dispatch(addStudent(values));
  };
courseOptions.forEach((option, index) => {
  console.log(`Element ${index + 1}:`, option);
});

  return (
    <>
      <Box
        component='form'
        sx={{
          width: '100%',
        }}
        // noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
           <InputLabel id='courseSelect'>Select Course</InputLabel>
    <Select
      labelId='courseSelect'
      value={values.course}
      name='course'
      label='Course *'
      onChange={handleInputChange}
      required
      sx={{
        minWidth: '200px',
      }}
    >
      {courseOptions}
    </Select>
            <FormHelperText>Required</FormHelperText>
          </Grid>
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
            {!validPhoneNumber && (
              <Typography sx={{ color: 'red', p: '8px 16px' }}>
                Not a valid phone number.
              </Typography>
            )}
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
            <TextField
              name='remark'
              label='Remark (Optional)'
              fullWidth
              variant='outlined'
              onChange={handleInputChange}
              value={values.remark}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Cancel
          </Button>

          <Button variant='contained' type='submit' sx={{ mt: 3, ml: 1 }}>
            Add
          </Button>
        </Box>
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

export default NewStudent;
