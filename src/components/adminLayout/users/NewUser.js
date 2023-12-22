import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Box, Button, Backdrop, CircularProgress } from "@mui/material"
import { toast } from 'react-toastify'
import { addUser, reset } from '../../../../store/userSlice';

const NewCourse = ({ setOpen }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''

  })
  const [backdrop, setBackdrop] = useState(false);

  const {newUserStatus } = useSelector((state) => state.user)
  // const {alert} = useSelector((state)=> state.alert)

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
      dispatch(addUser({ ...values, role:'user' }))
  }



  useEffect(() => {

    if (newUserStatus === 'pending') {
      setBackdrop(true)
    }
    if (newUserStatus === 'success') {
      toast.success('New User added successfully!');
      setOpen(false);
      setBackdrop(false)
      dispatch(reset())
    }
  }, [newUserStatus])

  return (
    <><form action="" onSubmit={handleSubmit}>


      <Grid container spacing={3} className="mt-4 flex flex-col ">
        <Grid item xs={12} >
          <TextField
            required
            id="name"
            name="name"
            label=" Name"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="phone"
            name="phone"
            label="Phone"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <TextField
            required
            name="price"
            label="Course price"
            fullWidth
            type='number'
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid> */}
        <Grid item xs={12}  >
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
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
          // onClick={handleSubmit}
          sx={{ mt: 3, ml: 1 }}
          className="hover:text-white"
        >
          Add
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