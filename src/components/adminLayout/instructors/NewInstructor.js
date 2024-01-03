import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux'
import { Grid, TextField, Box, Button, InputLabel, Select, MenuItem,Typography, FormHelperText, CircularProgress, Backdrop, Paper } from "@mui/material"
import { toast } from 'react-toastify';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { addClass, reset } from '../../../../store/classSlice';
import { addInstructor, reset } from '../../../../store/instructorSlice';
import { getCourses } from '../../../../store/courseSlice';
import { getSchedules } from '../../../../store/scheduleSlice';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const NewInstructor = ({ setOpen }) => {
  const { instructors, status } = useSelector((state) => state.instructor)
  const [backdrop, setBackdrop] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: '',
    email: '',
    qualifications: '',
    phone: '',
    image: null
  });

  const [imageInput, setImageInput] = useState(null)
  const [phone, setPhone] = useState('');
  const [validPhoneNumber, setValidPhone] = useState(false);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValues({
      ...values,
      image: file
    })
    if (file) {

      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setImageInput(e.target.result)

      }
      fileReader.readAsDataURL(file)
    }
  }


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    })
  }
  useEffect(() => {
    if (status === 'pending') {
      setBackdrop(true)
    }
    if (status === 'success') {
      toast.success('New instructor added successfully!');
      setOpen(false);
      setBackdrop(false)
      dispatch(reset())
    }
    if( status === 'failed'){
      toast.error('Failed to add instructor')
      setBackdrop(false)
      dispatch(reset())
      setOpen(false);
    }
  }, [status])
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('qualifications', values.qualifications);
    formData.append('phone', values.phone);
    formData.append('image', values.image);
    
  //   for (const entry of formData.entries()) {
  // console.log(entry[0],' :', entry[1]);
  //   } 
    // console.log(formData);
    validPhoneNumber &&
   validPhoneNumber && dispatch(addInstructor(formData))
  }

  useEffect(() => {
    setValues({
      ...values,
      phone,
    });
    if (phone !== undefined) {
      setValidPhone(isValidPhoneNumber(phone));
    }
  }, [phone]);


  return (
    <>
      <Paper
  elevation={3}
  sx={{
    width: '100%',
    maxHeight: '80vh', // Set a maximum height (adjust as needed)
    overflowY: 'auto',
    p: 2,
        }}
    component="form"
    autoComplete="off"
    onSubmit={handleSubmit}
>
  
        <Grid container spacing={3}>
          
          <Grid item xs={12}>
            <TextField
              required
              name="name"
              label="Instructor Name"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sx={{ '& input': { p: 2, my: 2, },}}>
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
              required
              name="qualifications"
              label="Instructor Qualifications"
              fullWidth
              variant="outlined"
              onChange={handleInputChange} 
              multiline
            />
          </Grid>
          
          
          <Grid item xs={12}>
            <InputLabel htmlFor='image'>Upload Profile Image for the instructor</InputLabel>
            <TextField
              id='image'
              type='file'
              required
              name="image"
              // label="Upload thumbnail"
              fullWidth
              variant="outlined"
              onChange={handleImageChange}
            />
            {imageInput && <Image src={imageInput} width={100} height={100}/>}
          </Grid>
          
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>

          <Button onClick={() => {
            setOpen(false)
          }} sx={{ mt: 3, ml: 1 }}>
            Cancel
          </Button>


          <Button
            variant="contained"
            type='submit'
            sx={{ mt: 3, ml: 1 }}
          >
            Add
          </Button>
        </Box>
       
</Paper>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}

      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default NewInstructor