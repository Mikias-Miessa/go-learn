import { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import {useSelector, useDispatch } from 'react-redux';
import { Grid, TextField, Box, Button,Backdrop,CircularProgress } from "@mui/material"
import { toast} from 'react-toastify'
import {markAsContacted,reset} from '../../../../store/studentSlice';

const Contacted = ({setOpen,student}) => {
  const dispatch = useDispatch();
  const [values, setValues] = useState({
    id: student?._id ? student?._id : '', 
    remark:''
  });
  const [backdrop, setBackdrop] = useState(false);

  const {status} = useSelector((state)=> state.student)
// const {alert} = useSelector((state)=> state.alert)
useEffect(() => {

  if(status==='pending' ){
    setBackdrop(true)
  }
  if(status === 'contacted'){
    toast.success('Marked as contacted!');
    setBackdrop(false);
    setOpen()
    dispatch(reset())
  }
}, [status])
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
    dispatch(markAsContacted(values))
  }

 

  useEffect(() => {

    if(status==='pending'){
      setBackdrop(true)
    }
    if(status === 'contacted'){
      toast.success('Marked as contacted!');
      setOpen(false);
      setBackdrop(false)
      dispatch(reset())
    }
  }, [status])
  
  return (
    <><form action="" onSubmit={handleSubmit}>
      
      
    <Grid container spacing={3}>
    <Grid item xs={12} >
          <TextField
            // required
            id="remark"
            name="remark"
            label="Remark"
            fullWidth
            variant="standard"
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
                    Mark as Contacted
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

Contacted.propTypes = {
  setOpen: PropTypes.func.isRequired
}

export default Contacted