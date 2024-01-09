import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Box, Button, Backdrop, CircularProgress } from "@mui/material"
import { toast } from 'react-toastify'
import { addUser, reset } from '../../../../store/userSlice';

const NewAd = ({ setOpen }) => {
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
    
      dispatch(addAd({ ...values, status:'off' }))
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
            id="title"
            name="title"
            label="Title"
            fullWidth
            multiline
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            multiline
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            required
            id="link"
            name="link"
            label="Link"
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
        {/* <Grid item xs={12}  >
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            variant="outlined"
            onChange={handleInputChange}
          />
        </Grid> */}
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
          className="hover:text-white hover:bg-orange-500"
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

NewAd.propTypes = {
  setOpen: PropTypes.func.isRequired
}

export default NewAd