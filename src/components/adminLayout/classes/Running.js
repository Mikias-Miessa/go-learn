"use client"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from '../../Link';
import Moment from 'moment';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Paper,
  Box,
  Modal,
  Typography,
  Popper,
  Fade,
  IconButton,
  CircularProgress,
} from '@mui/material';

import Title from '../../Title';
import NewClass from './NewClass';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { getRunningClasses, deleteClass } from '../../../../store/classSlice';
import UpdateClass from './UpdateClass';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};



export default function Classes() {



  const [update, setUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  
  const { } = useSelector((state) => state.user);
  const { runningClasses, loading, newClassAdded, classDeleted } = useSelector((state) => state.classroom);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [openPoper, setOpenPoper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [updatedClass, setupdatedClass] = useState();
  const [deletedClass, setDeletedClass] = useState();
  

  useEffect(() => {
    dispatch(getRunningClasses());
  }, [newClassAdded, classDeleted]);

    function preventDefault(event) {
  event.preventDefault();
}
const handleUpdate = () => {
  setUpdate(true);
  console.log('update clicked')
  };
  const handleDelete = () => {
    dispatch(deleteClass(deletedClass));
  console.log('delete clicked')
}
  const handlePopperClick = (event, id) => {
    let choosedClass = runningClasses.find((c) => c._id === id);
    setupdatedClass(choosedClass);
    setDeletedClass(choosedClass);
    console.log(choosedClass);
    console.log(id)
    //  let user = users.find((u) => u._id === id);
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => !prev);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    setOpenDelete(false);
  };



  return (
    <>
      <Title>{`Running Classes (${runningClasses.length})`}</Title>
      <Paper
        elevation={0}
        sx={{
          p: '24px',
        }}
      >
        <Button variant='contained' onClick={handleOpen}>
          New Class
        </Button>
      </Paper>
      {loading ? (
        <CircularProgress color='primary' sx={{ m: 'auto' }} />
      ) : (
        <>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Schedule</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Enrolled Students</TableCell>
                <TableCell></TableCell>
                {/* <TableCell>Price</TableCell> */}
                {/* <TableCell align="right">Sale Amount</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {runningClasses.length > 0 ? (
                runningClasses.map(
                  (item, index) =>
                    item && (
                      <TableRow key={index}>
                        <TableCell>{item.course?.courseName}</TableCell>
                        <TableCell>
                          {item.schedule && item.schedule.map((scheduleItem, scheduleIndex) => (
                            <div key={scheduleIndex}>
                              <div>{[...scheduleItem.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(0, 1) + ' - ' + [...scheduleItem.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(-1)}</div>
                              <div>{Moment(scheduleItem.startHour).format("h:mm A")} - {Moment(scheduleItem.endHour).format("h:mm A")}</div>
                            </div>
                          ))}
                        </TableCell>
                        <TableCell>
                          {item.start_date &&
                            Moment(item.start_date).format('MMM DD YYYY ')}
                        </TableCell>
                        <TableCell>
                          {item.instructor && item.instructor}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Typography>
                              {item.students
                                ? item.students.filter(
                                  (student) =>
                                    student.status === 'enrolled' ||
                                    student.status === 'certified'
                                ).length
                                : 0}
                            </Typography>
                            <Link
                              href={`/admin/classes/${item.slug && item.slug}`}
                            >
                              See Students
                            </Link>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Popper
                            open={openPoper}
                            anchorEl={anchorEl}
                            placement='bottom-end'
                            transition
                          >
                            {({ TransitionProps }) => (
                              <Fade {...TransitionProps} timeout={350}>
                                <Paper
                                  sx={{
                                    p: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                  }}
                                >
                                  <Button
                                    sx={{
                                      border: 'none',
                                      color: 'secondary.main',
                                      fontWeight: '300',
                                      textTransform: 'none',
                                    }}
                                    variant='outlined'
                                    startIcon={
                                      <DoDisturbAltOutlinedIcon fontSize='small' />
                                    }
                                  >
                                    End Class
                                  </Button>
                                  <Button
                                    sx={{
                                      border: 'none',
                                      color: 'secondary.main',
                                      fontWeight: '300',
                                      textTransform: 'none',
                                    }}
                                    variant='outlined'
                                    startIcon={
                                      <EditOutlinedIcon fontSize='small' />
                                    }
                                    onClick={handleUpdate}
                                  >
                                    Edit Class
                                  </Button>
                                  <Button
                                    sx={{
                                      border: 'none',
                                      color: 'secondary.main',
                                      fontWeight: '300',
                                      textTransform: 'none',
                                    }}
                                    variant='outlined'
                                    startIcon={
                                      <DeleteOutlineOutlinedIcon fontSize='small' />
                                    }
                                    onClick={() => {
                                    setOpenDelete(true)
                                    }}
                                  >
                                    Delete Class
                                  </Button>
                                </Paper>
                              </Fade>
                            )}
                          </Popper>
                          <IconButton onClick={(e)=>{
                        
                          handlePopperClick(e,item._id && item._id)
                        }}>
                            <MoreVertIcon />
                          </IconButton>
                        </TableCell>
                        {/* <TableCell>{row.price}</TableCell> */}
                        {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                      </TableRow>
                    )
                )
              ) : (
                <>
                  <TableRow>
                    <TableCell colSpan={5} sx={{ textAlign: 'center' }}>
                      <Typography
                        component='span'
                        variant='body1'
                        sx={{ color: 'secondary.light' }}
                      >
                        There are no running classes.
                      </Typography>
                    </TableCell>
                  </TableRow>
                </>
              )}
            </TableBody>
          </Table>
          <Link
            color='primary'
            href='#'
            onClick={preventDefault}
            sx={{ mt: 3 }}
          >
            See more
          </Link>
        </>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Add new class</h2>
          <p id='parent-modal-description'>
            Add In-person classes which are held on Gobeze.
          </p>
          <NewClass setOpen={setOpen} />
        </Box>
      </Modal>
       <Modal open={update} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Update class</h2>
          <p id='parent-modal-description'>
            Update class.
          </p>
          <UpdateClass setOpen={handleClose} selectedClass={updatedClass}/>
          {/* <UpdateUser setOpen={handleClose} user={updatedUser} /> */}
          
              
        </Box>
      </Modal>
       <Modal open={openDelete} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '60%' }}>
          <h2 id='parent-modal-title'>Delete Class</h2>
          <p id='parent-modal-description'>
            Are you sure do you want to delete this class?
          </p>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} sx={{ mt: 3, ml: 1 }}>
              Cancel
            </Button>

            <Button
              variant='contained'
              onClick={handleDelete}
              sx={{ mt: 3, ml: 1 }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
