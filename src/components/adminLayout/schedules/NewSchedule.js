import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Box, Button, Backdrop, CircularProgress, FormControl, FormGroup, FormControlLabel, FormLabel, Checkbox } from "@mui/material"
import { KeyboardTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { toast } from 'react-toastify'
import { addSchedule, reset } from '../../../../store/scheduleSlice';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';

const NewSchedule = ({ setOpen }) => {
    const [backdrop, setBackdrop] = useState(false);
    
    const { newScheduleAdded } = useSelector((state) => state.schedule)

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (days.length <= 0) {
            toast.error('Please select at least one day');
            return;
        } else {
            const scheduleData = {
                days,
                startHour,
                endHour
            };
            dispatch(addSchedule(scheduleData))   
        }
    }

    const [days, setDays] = useState([]);
    const [startHour, setStartHour] = useState(new Date());
    const [endHour, setEndHour] = useState(new Date());

    const handleDaysChange = (event) => {
        if(!days.includes(event.target.name)) {
            setDays([...days, event.target.name]);
        } else {
            setDays(days.filter((item) => item !== event.target.name))
        }
    };

    const handleStartHourChange = (date) => {
        setStartHour(date);
    };

    const handleEndHourChange = (date) => {
        setEndHour(date);
    };

    useEffect(() => {
        if (newScheduleAdded === 'pending') {
          setBackdrop(true)
        }
        if (newScheduleAdded === 'success') {
          toast.success('New schedule added successfully!');
          setOpen(false);
          setBackdrop(false)
          dispatch(reset())
        }
      }, [newScheduleAdded])

    return (
        <><form action="" onSubmit={handleSubmit}>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <FormLabel component="legend">Days</FormLabel>
                    <FormGroup sx={{pl: '20px', pt: '10px'}}>
                        <FormControlLabel
                            control={<Checkbox checked={days.includes('Monday')} onClick={handleDaysChange} name="Monday" />}
                            label="Monday"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={days.includes('Tuesday')} onChange={handleDaysChange} name="Tuesday" />}
                            label="Tuesday"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={days.includes('Wednesday')} onChange={handleDaysChange} name="Wednesday" />}
                            label="Wednesday"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={days.includes('Thursday')} onChange={handleDaysChange} name="Thursday" />}
                            label="Thursday"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={days.includes('Friday')} onChange={handleDaysChange} name="Friday" />}
                            label="Friday"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={days.includes('Saturday')} onChange={handleDaysChange} name="Saturday" />}
                            label="Saturday"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={days.includes('Sunday')} onChange={handleDaysChange} name="Sunday" />}
                            label="Sunday"
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={12} sm={6}>
        <TimePicker
          onChange={handleStartHourChange}
          value={startHour}
          clearIcon={null}
          clockAriaLabel="Start Hour"
        />
      </Grid>

      {/* End Hour */}
      <Grid item xs={12} sm={6}>
        <TimePicker
          onChange={handleEndHourChange}
          value={endHour}
          clearIcon={null}
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

NewSchedule.propTypes = {
    setOpen: PropTypes.func.isRequired
}

export default NewSchedule