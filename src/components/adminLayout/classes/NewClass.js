import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux'
import { Grid, TextField, Box, Button, InputLabel, Select, MenuItem, FormHelperText, CircularProgress, Backdrop, Paper } from "@mui/material"
import { toast } from 'react-toastify';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { addClass, reset } from '../../../../store/classSlice';
import { getCourses } from '../../../../store/courseSlice';
import { getSchedules } from '../../../../store/scheduleSlice';


const NewCourse = ({ setOpen }) => {
  const { classes, loading, newClassAdded } = useSelector((state) => state.classroom)
  const { schedules } = useSelector((state) => state.schedule);
  const { courses } = useSelector((state) => state.course)
  const [backdrop, setBackdrop] = useState(false);
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    course: '',
    description: '',
    schedule: [],
    start_date: null,
    instructor: '',
    instructorQualification:'',
    prerequisites: '',
    WeeklyCommitment: '',
    WhyChooseUs: '',
    WhatYouWillGain: '',
    Curriculum: '',
    Modules: [],
    remark: '',
    thumbnail: null
  });

  const [imageInput, setImageInput] = useState(null)

  let courseOptions = [<MenuItem key={0} value=''>No Courses</MenuItem>];
  // let courseOptions =  <MenuItem value=''>Choose Courses</MenuItem>;
  if (courses.length > 0) {
    courseOptions = courses.map((course, index) => course && (
      <MenuItem key={index + 1} value={course._id && course._id}>{course.courseName && course.courseName}</MenuItem>
    ))
  }
  // console.log(courseOptions)

  useEffect(() => {
    dispatch(getCourses())
  }, [])

  useEffect(() => {
    dispatch(getSchedules())
  }, [])


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValues({
      ...values,
      thumbnail: file
    })
    if (file) {

      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setImageInput(e.target.result)

      }
      fileReader.readAsDataURL(file)
    }
  }

const handleModulesInputChange = (event) => {
  const { name, value } = event.target;

  // Remove extra spaces after commas
  const cleanedValue = value.replace(/,\s+/g, ',');

  // Split the cleaned input by commas
  const modulesArray = cleanedValue.split(',');

  setValues({
    ...values,
    Modules: modulesArray,
  });

  console.log(values.Modules);
};



  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    })
  }
  useEffect(() => {
    if (newClassAdded === 'pending') {
      setBackdrop(true)
    }
    if (newClassAdded === 'success') {
      toast.success('New Class added successfully!');
      setOpen(false);
      setBackdrop(false)
      dispatch(reset())
    }
    if( newClassAdded === 'failed'){
      toast.error('Failed to add Class')
      setBackdrop(false)
      dispatch(reset())
      setOpen(false);
    }
  }, [newClassAdded])
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('course', values.course);
    formData.append('description', values.description);
    formData.append('schedule', values.schedule);
    formData.append('start_date', values.start_date);
    formData.append('instructor', values.instructor);
    formData.append('instructorQualification', values.instructorQualification);
    formData.append('remark', values.remark);
    formData.append('thumbnail', values.thumbnail);
    formData.append('prerequisites', values.prerequisites);
    formData.append('WeeklyCommitment', values.WeeklyCommitment);
    formData.append('WhyChooseUs', values.WhyChooseUs);
    formData.append('WhatYouWillGain', values.WhatYouWillGain);
    formData.append('Curriculum', values.Curriculum);
      values.Modules.forEach((module, index) => {
    formData.append(`Modules[${index}]`, module);
  });
  //   for (const entry of formData.entries()) {
  // console.log(entry[0],' :', entry[1]);
  //   } 
    // console.log(formData);
    dispatch(addClass(formData))
  }

  const renderValue = (selected) => {
    if (!Array.isArray(selected)) {
      return '';
    }
    return selected.join(', ');
  };

  function summarizeSchedule(schedule) {
    const startTime = formatTime(schedule.startHour);
    const endTime = formatTime(schedule.endHour);
    const timeRange = `${startTime} to ${endTime}`;
    return `${[...schedule.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(0, 1) + ' - ' + [...schedule.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(-1)} (${timeRange})`;
  }

  function formatTime(time) {
    const [hour, minute] = time.split(':');
    const isPM = hour >= 12;
    const formattedHour = (hour % 12) || 12;
    const formattedMinute = String(minute).padStart(2, '0');
    const period = isPM ? 'pm' : 'am';
    return `${formattedHour}:${formattedMinute}${period}`;
  }

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
          <Grid item xs={12} sm={6}>
            <InputLabel id="courseSelect">Select Course</InputLabel>
            <Select
              labelId="courseSelect"
              value={values.course}
              name='course'
              label="Course *"
              onChange={handleInputChange}
              required
              sx={{
                minWidth: '200px'
              }}
            >
              {courseOptions}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel id="schedule">Choose Schedule</InputLabel>
            <Select
              labelId="schedule"
              id="schedule"
              label="Schedule *"
              name="schedule"
              multiple
              value={values.schedule}
              onChange={handleInputChange}
              sx={{
                minWidth: '200px'
              }}
            >
              {schedules.map((schedule) => (
                <MenuItem key={schedule._id} value={schedule._id}>
                  {summarizeSchedule(schedule)}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Required</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="description"
              label="Class description"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={values.description}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                required
                value={values.start_date}
                name='start_date'
                onChange={(newValue) => {
                  setValues({
                    ...values,
                    start_date: newValue
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              name="instructor"
              label="Course instructor"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={values.instructor}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="instructorQualification"
              label="Course instructor qualifications"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={values.instructorQualification}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="prerequisites"
              label="Course prerequisites"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={values.prerequisites}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="WeeklyCommitment"
              label="Course WeeklyCommitment"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={values.WeeklyCommitment}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="WhyChooseUs"
              label="Why Choose Us"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={values.WhyChooseUs}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="WhatYouWillGain"
              label="What you will gain"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={values.WhatYouWillGain}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="Curriculum"
              label="Curriculum overview"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={values.Curriculum}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              name="Modules"
              label="Enter Course Modules separated with a comma (,)"
              fullWidth
              variant="outlined"
              onChange={handleModulesInputChange}
              value={values.Modules.join(', ')} // Join the array back to a string for display
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor='thumbnail'>Upload thumbnail with a dimension of 1280 x 720</InputLabel>
            <TextField
              id='thumbnail'
              type='file'
              required
              name="thumbnail"
              // label="Upload thumbnail"
              fullWidth
              variant="outlined"
              onChange={handleImageChange}
            />
            {imageInput && <Image src={imageInput} width={200} height={100}/>}
          </Grid>
          <Grid item xs={12}>
            <TextField

              name="remark"
              label="Remark (Optional)"
              fullWidth
              variant="outlined"
              onChange={handleInputChange}
              value={values.remark}
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

export default NewCourse