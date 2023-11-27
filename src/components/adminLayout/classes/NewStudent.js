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
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
} from '@mui/material';
import { toast } from 'react-toastify';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

// import { reset} from '../../../../store/studentSlice';
import { enrollStudent, reset, status } from '../../../../store/classSlice';

const NewStudent = ({ setOpen, course, price }) => {
  
  const { status } = useSelector((state) => state.classroom);
  const [backdrop, setBackdrop] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    course: course ? course : '',
    bank: 'cbe',
    amount: price ? price : 0,
    payment_with: 'cash',
    reference: '',
  });
  const [phone, setPhone] = useState('');
  const [validPhoneNumber, setValidPhone] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

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
    if (status === 'enrolling') {
      setBackdrop(true);
    }
    if (status === 'enrolled') {
      toast.success('New Student enroled successfully!');
      setOpen(false);
      setBackdrop(false);
      dispatch(reset());
    }
  }, [status]);
  const handleSubmit = (e) => {
    e.preventDefault();
    validPhoneNumber && 

    validPhoneNumber && dispatch(enrollStudent(values));
  };

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
                {!validPhoneNumber && (
                  <Typography sx={{ color: 'red', p: '8px 16px' }}>
                    Not a valid phone number.
                  </Typography>
                )}
              </Grid>
              <Grid item xs={12} sx={{ my: 1 }}>
                <RadioGroup
                  row
                  name='payment_with'
                  value={values.payment_with}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value='cash'
                    control={<Radio />}
                    label='Payed with cash'
                  />
                  <FormControlLabel
                    value='bank'
                    control={<Radio />}
                    label='Payed with bank'
                  />
                </RadioGroup>
              </Grid>
              {values.payment_with === 'bank' && (
                <>
                  <FormGroup>
                    <InputLabel id='bank'>Payment with</InputLabel>
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
                  </FormGroup>
                  <Grid item xs={12}>
                    <TextField
                      required={values.payment_with === 'bank'}
                      name='reference'
                      label='Reference Id'
                      fullWidth
                      variant='outlined'
                      value={values.reference}
                      onChange={handleInputChange}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              inputProps={{ min: 1 }}
              type='number'
              name='amount'
              label='Paid amount in ETB'
              fullWidth
              variant='outlined'
              value={values.amount}
              onChange={handleInputChange}
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

          <Button
            variant='contained'
            type='submit'
            // fullWidth
            // onClick={handleSubmit}
            sx={{
              mt: 3,
              color: 'white',
              ':hover': {
                backgroundColor: 'primary.main',
              },
            }}
          >
            Enroll
          </Button>
        </Box>
      </Box>
      {/* </Box> */}
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
