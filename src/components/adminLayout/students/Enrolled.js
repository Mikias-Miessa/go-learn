import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  TextField,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Typography,
} from '@mui/material';
import { toast } from 'react-toastify';
import { enrollRegisteredStudent, reset } from '../../../../store/studentSlice';
import { getRunningClasses } from '../../../../store/classSlice';

const Contacted = ({ setOpen, student }) => {
  const dispatch = useDispatch();
  // 
  const [values, setValues] = useState({
    id: student?._id ? student?._id : '',
    remark: '',
    payment_with: 'bank',
    reference: '',
    bank: 'cbe',
    amount: student?.course?.course?.price ? student?.course?.course?.price : 0,
    course: student?.course?._id ? student?.course?._id : '',
  });
  const [backdrop, setBackdrop] = useState(false);

  const { status } = useSelector((state) => state.student);
  const { runningClasses } = useSelector((state) => state.classroom);
  useEffect(() => {
    if (status === 'pending') {
      setBackdrop(true);
    }
    if (status === 'enrolled') {
      toast.success('Student enrolled successfully!');
      setBackdrop(false);
      setOpen();
      dispatch(reset());
    }
  }, [status]);
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    
    dispatch(enrollRegisteredStudent(values));
  };
  useEffect(() => {
    dispatch(getRunningClasses());
  }, []);
  useEffect(() => {
    if (status === 'pending') {
      setBackdrop(true);
    }
    if (status === 'success') {
      toast.success('Marked as contacted!');
      setOpen(false);
      setBackdrop(false);
      dispatch(reset());
    }
  }, [status]);

  let classOptions = [
    <MenuItem key={0} value=''>
      No Classes
    </MenuItem>,
  ];
  // let courseOptions =  <MenuItem value=''>Choose Courses</MenuItem>;
  if (runningClasses.length > 0) {
    classOptions = runningClasses.map(
      (course, index) =>
        course && (
          <MenuItem key={index + 1} value={course._id && course._id}>
            <Box>
              <Typography sx={{ fontWeight: '300' }}>
                {course?.course?.courseName}
              </Typography>

              <Typography sx={{ fontWeight: '400', color: 'primary.main' }}>
                {/* {course?.schedule} */}
              </Typography>
            </Box>

            {course.courseName && course.courseName}
          </MenuItem>
        )
    );
  }

  return (
    <>
      <form action='' onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl>
              <Grid item xs={12} sm={6}>
                <InputLabel id='courseSelect'>Registered Class</InputLabel>
                <Select
                  labelId='courseSelect'
                  value={values.course}
                  name='course'
                  label='Class *'
                  onChange={handleInputChange}
                  required
                  sx={{
                    minWidth: '200px',
                  }}
                >
                  {classOptions}
                </Select>
                <FormHelperText>Required</FormHelperText>
              </Grid>
              <FormLabel id='demo-row-radio-buttons-group-label'>
                Payment with
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='payment_with'
                value={values.payment_with}
                onChange={handleInputChange}
              >
                <FormControlLabel
                  value='bank'
                  control={<Radio />}
                  label='Bank'
                />
                <FormControlLabel
                  value='cash'
                  control={<Radio />}
                  label='Cash'
                />
              </RadioGroup>
            </FormControl>
            {values.payment_with === 'bank' && (
              <>
                <Grid item xs={12} sm={6}>
                  <InputLabel id='schedule'>Choose Bank</InputLabel>
                  <Select
                    labelId='bank'
                    value={values.bank}
                    label='Choose bank *'
                    name='bank'
                    onChange={handleInputChange}
                  >
                    <MenuItem value='cbe'>CBE</MenuItem>
                    <MenuItem value='dashen'>Dashen</MenuItem>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required={values.payment_with === 'bank'}
                    id='reference'
                    name='reference'
                    label='Transaction Reference Id'
                    fullWidth
                    variant='standard'
                    value={values.reference}
                    onChange={handleInputChange}
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id='amount'
              name='amount'
              label='Amount'
              fullWidth
              type='number'
              variant='standard'
              value={values.amount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              // required
              id='remark'
              name='remark'
              label='Remark'
              fullWidth
              variant='standard'
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => {
              setOpen();
            }}
            sx={{ mt: 3, ml: 1 }}
          >
            Cancel
          </Button>

          <Button
            variant='contained'
            type='submit'
            // onClick={handleSubmit}
            sx={{ mt: 3, ml: 1 }}
          >
            Enroll Student
          </Button>
        </Box>
      </form>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};

Contacted.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export default Contacted;
