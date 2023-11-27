import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import {useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Box, Button,Backdrop,CircularProgress } from "@mui/material"
import { toast} from 'react-toastify'
import {updateCourse,reset} from '../../../../store/courseSlice';

const NewCourse = ({setOpen,course}) => {

// 
    const [values, setValues] = useState({
        courseName: '',
    courseCode: '',
    duration: '',
    price: '',
    online_url: '',
    })
  const [backdrop, setBackdrop] = useState(false);

  useEffect(() => {

   if(course){
       setValues({
        courseName: course.courseName ? course.courseName : '',
        courseCode:course.courseCode ? course.courseCode : '',
        duration:course.duration ? course.duration : '',
        price:course.price ? course.price : '',
        online_url:course.online_url ? course.online_url : '',
       })
   }
  }, [])
const {newCourseAdded} = useSelector((state)=> state.course)
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
    // 
    dispatch(updateCourse({
      ...values,
      id:course._id
    }))
  }

 

  useEffect(() => {

    if(newCourseAdded==='pending'){
      setBackdrop(true)
    }
    if(newCourseAdded === 'success'){
      toast.success('Course updated successfully!');
      setOpen();
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
            value={values.courseName}
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
            value={values.courseCode}
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
            value={values.duration}
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
            value={values.price}
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
            value={values.online_url}
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