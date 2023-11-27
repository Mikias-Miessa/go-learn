import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Box, Button, Backdrop, CircularProgress } from "@mui/material"
import { toast } from 'react-toastify'
import { addCourse, reset } from '../../../../store/courseSlice';

const NewCourse = ({ setOpen }) => {
  const [values, setValues] = useState({
    courseName: '',
    courseCode: '',
    duration: '',
    price: '',
    online_url: '',

  })
  const [backdrop, setBackdrop] = useState(false);

  const { courses, loading, newCourseAdded } = useSelector((state) => state.course)
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
    
    dispatch(addCourse(values))
  }



  useEffect(() => {

    if (newCourseAdded === 'pending') {
      setBackdrop(true)
    }
    if (newCourseAdded === 'success') {
      toast.success('New course added successfully!');
      setOpen(false);
      setBackdrop(false)
      dispatch(reset())
    }
  }, [newCourseAdded])

  return (
    <><form action="" onSubmit={handleSubmit}>


      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="courseName"
            name="courseName"
            label="Course name"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="courseCode"
            name="courseCode"
            label="Course code"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="duration"
            label="Duration"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            name="price"
            label="Course price"
            fullWidth
            type='number'
            variant="standard"
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} >
          <TextField
            // required
            id="online_url"
            name="online_url"
            label="Url to Online course"
            fullWidth
            variant="standard"
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