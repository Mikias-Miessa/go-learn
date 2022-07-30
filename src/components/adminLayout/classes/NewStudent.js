import {useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { Grid, TextField, Box, Button,InputLabel, Select, MenuItem,FormHelperText,CircularProgress,Backdrop,Typography } from "@mui/material"
import { toast } from 'react-toastify';
import PhoneInput,{isValidPhoneNumber} from 'react-phone-number-input';
import 'react-phone-number-input/style.css'

import { addStudent,reset} from '../../../../store/studentSlice';


const NewStudent = ({setOpen, course,price}) => {
  console.log(course)
const {loading,status} = useSelector((state)=> state.student)
const [backdrop, setBackdrop] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    course: course? course: '',
    bank: 'cbe',
    amount:price? price: 0
  });
  const [phone,setPhone] = useState('');
  const [validPhoneNumber,setValidPhone] = useState(false);

  const handleInputChange = (e)=>{
    const {name,value} = e.target;

    setValues({
      ...values,
      [name]:value
    })
  }

  useEffect(() => {
    setValues({
      ...values,
      phone
    })
    if(phone !== undefined){
     setValidPhone(isValidPhoneNumber(phone));
    }
  }, [phone])

  useEffect(() => {
    if(status==='pending'){
      setBackdrop(true)
    }
    if(status === 'success'){
      toast.success('New Student added successfully!');
      setOpen(false);
      setBackdrop(false)
      dispatch(reset())
    }
  }, [status])
  const handleSubmit =(e)=>{
    e.preventDefault();
    console.log(values)
    
    // dispatch(addStudent(values))
  }
  
  return (
    <>
  <Box
      component="form"
      sx={{
       width: '100%'
      }}
      // noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
   
             <Grid container spacing={3}>
    <Grid item xs={12} >
          <TextField
            required
            id="name"
            name="name"
            label="Full Name"
            fullWidth
            variant="outlined"
            value={values.name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            // required
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            type='email'
            onChange={handleInputChange}
value={values.email}
          />
        </Grid>
    <Grid item xs={12}>
         
               <Grid item xs={12}>
               <Grid item xs={12} sx={{
                 '& input':{
                    p: 2,my:2
                 }
               }}>
               <PhoneInput
               international
                defaultCountry="ET"
                name='phone'
      placeholder="phone number"
      value={values.phone}
      onChange={setPhone}
      required      
      />
     {!validPhoneNumber && <Typography sx={{color: 'red', p: '8px 16px'}}>
        Not a valid phone number.
      </Typography>} 
              </Grid>
      <InputLabel id="bank">Payment with</InputLabel>
  <Select
    labelId="bank"
    value={values.bank}
    label="Bank of Choice *"
    fullWidth
    name='bank'
    onChange={handleInputChange}
  >
    <MenuItem value='cbe'>CBE</MenuItem>
    <MenuItem value='dashen'>DASHEN BANK</MenuItem>
  </Select>
  <FormHelperText>Required</FormHelperText>
      </Grid>
    
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            inputProps={{ min: 1}}
            type='number'
            name="amount"
            label="Paid amount in ETB"
            fullWidth
            variant="outlined"
            value={values.amount}
            onChange={handleInputChange}
          />
        </Grid>
        </Grid>
             
          
         <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                 
                    <Button onClick={()=>{
                      setOpen(false)
                    }} sx={{ mt: 3, ml: 1 }}>
                      Cancel
                    </Button>
                 

                  <Button
                    variant="contained"
                    type='submit'
                    // fullWidth
                    // onClick={handleSubmit}
                    sx={{ mt: 3,color: 'white',
                    ':hover':{
                      backgroundColor: 'primary.main'
                    },
                  }}
                  >Enroll
                  </Button>
                </Box>
               
                </Box> 
      {/* </Box> */}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

export default NewStudent