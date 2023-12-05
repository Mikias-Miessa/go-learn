import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import {useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Box, Button,Backdrop,CircularProgress } from "@mui/material"
import { toast} from 'react-toastify'
// import {updateCourse,reset} from '../../../../store/courseSlice';
import {updateUser,reset} from '../../../../store/userSlice';

const NewCourse = ({setOpen,user}) => {

// 
    const [values, setValues] = useState({
        Name: '',
        Email: '',
        Phone: '',
    })
  const [backdrop, setBackdrop] = useState(false);

  useEffect(() => {

   if(user){
       setValues({
        Name: user.name ? user.name : '',
        Email:user.email ? user.email : '',
        Phone:user.phone ? user.phone : '',
       })
   }
  }, [])
const {updateUserStatus} = useSelector((state)=> state.user)
// const {alert} = useSelector((state)=> state.alert)

const dispatch = useDispatch();
  const handleInputChange = (e)=>{
    const {name,value} = e.target;

    setValues({
      ...values,
      [name]:value
    })
  }
  const handleSubmit =(e)=>{
    e.preventDefault();
    
    dispatch(updateUser({
      ...values,
      id:user._id
    }))
  }

 

  useEffect(() => {

    if(updateUserStatus==='pending'){
      setBackdrop(true)
    }
    if(updateUserStatus === 'success'){
      toast.success('user updated successfully!');
      setOpen();
      setBackdrop(false)
      dispatch(reset())
    }
  }, [updateUserStatus])
  
  return (
    <><form action="" onSubmit={handleSubmit}>
      
      
    <Grid container spacing={3}>
    <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Name"
            name="Name"
            label="Name"
            fullWidth
            variant="standard"
            value={values.Name}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="Email"
            name="Email"
            label="Email"
            fullWidth
            variant="standard"
            value={values.Email}
            onChange={handleInputChange}
          />
        </Grid>
    <Grid item xs={12} sm={6}>
          <TextField
            required
            name="Phone"
            label="Phone"
            fullWidth
            variant="standard"
            value={values.Phone}
            onChange={handleInputChange}
          />
        </Grid>
       
       
        </Grid>
         <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                 
                    <Button onClick={()=>{
                      setOpen()
                    }} sx={{ mt: 3, ml: 1 }}>
                      Cancel
                    </Button>
                 

                  <Button
                    variant="contained"
                    type='submit'
                    // onClick={handleSubmit}
                    sx={{ mt: 3, ml: 1 }}
                  >
                   Update
                  </Button>
                </Box>
                </form>
                <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}

NewCourse.propTypes = {
  setOpen: PropTypes.func.isRequired
}

export default NewCourse