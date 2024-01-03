import * as React from 'react';
import Link from '@mui/material/Link';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
import Title from '../../Title';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getUsers, reset, deleteUser } from '../../../../store/userSlice';
import { getInstructors, reset } from '../../../../store/instructorSlice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlined from '@mui/icons-material/DeleteOutlineOutlined'
import { toast } from 'react-toastify'
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
  CircularProgress,
  IconButton,
  Popper,
  Fade,
  
  
} from '@mui/material';
import UpdateInstructor from './UpdateInstructor'
import NewInstructor from './NewInstructor'
import Image from 'next/image';

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

export default function Instructors() {
  const { instructors, loading, status,getInstructorStatus } = useSelector((state) => state.instructor);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [openPoper, setOpenPoper] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [deleteduser, setDeletedUser] = useState();

//     const handleUpdate = () => {
   
//     setUpdate(true);
//   };
//    const handlePopperClick = (event,id) => {
//     //
//     let user = users.find((u) => u._id === id);
//      setUpdatedUser(user);
//      setDeletedUser(user);
//      console.log(user)
//     setAnchorEl(event.currentTarget);
//     setOpenPoper((prev) => !prev);
//   };  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    setOpenPoper(false);
    setOpenDelete(false);
  };
//   const handleDelete = (e) => {
//     e.preventDefault()
//     dispatch(deleteUser({ userid: deleteduser._id }))
//   }
  
  

  useEffect(() => {
    if(getInstructorStatus === 'idel')
    dispatch(getInstructors());
    
  }, [getInstructorStatus]);
    
    useEffect(() => {
        if (status === 'success')
            dispatch(getInstructors());  
            dispatch(reset())
   },[status]) 
 
//   useEffect(() => {
//     if (deleteUserStatus === 'success') {
//       toast.success('User removed successfully!');
//       setOpenDelete(false)
//       dispatch(reset())
//     }
//   }, [deleteUserStatus])
  return (
    
     
        <React.Fragment>
          <Title>Users</Title>
         <Paper
        elevation={0}
        sx={{
          p: '24px',
        }}
      >
        <Button variant='contained' onClick={handleOpen}>
          New Instructor
        </Button>
      </Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Qualification</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <CircularProgress color="primary" sx={{ m: 'auto' }} />
                  </TableCell>
                </TableRow>
              ) : (
                instructors.map((instructor) => (
                  <TableRow key={instructor._id}>
                    <TableCell>
                      <div className='my-2'>
                        <Image src={instructor.imagePath} alt='Instructor Image'
                        className='rounded-full' width={100} height={100} />
                      </div>
                      
                    </TableCell>
                    <TableCell>{instructor.name}</TableCell>
                    <TableCell>{instructor.phone}</TableCell>
                    <TableCell>{instructor.email}</TableCell>
                    <TableCell>{instructor.qualifications}</TableCell>
                    {/* <TableCell>
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
                                    <EditOutlinedIcon fontSize='small' />
                                  }
                                  onClick={handleUpdate}
                                >
                                  Edit User
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
                                    <DeleteOutlineOutlined fontSize='small' />
                                  }
                                  onClick={() => {
                                    setOpenDelete(true);
                                    // setSelectedId(user._id)
                                  }}
                                >
                                  Delete User
                                </Button>
                              </Paper>
                            </Fade>
                          )}
                        </Popper>
                        <IconButton onClick={(e)=>{
                        
                          handlePopperClick(e,user._id && user._id)
                        }}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell> */}
                  </TableRow>
                ))
              )}
              {console.log(instructors)}
            </TableBody>
          </Table>
        {/* <Modal open={update} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '40%' }} className='rounded-md'>
          <h2 id='parent-modal-title' className='font-semibold text-lg'>Update User</h2>
          <p id='parent-modal-description' className=''>
            Update User.
          </p> */}
              {/* <UpdateUser setOpen={handleClose} user={updatedUser} /> */}
              
        {/* </Box>
      </Modal> */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '40%' }} className='rounded-md' >
          <h2 id='parent-modal-title' className='text-lg font-semibold'>New Instructor</h2>
          <p id='parent-modal-description' className='text-base font-medium'>
            Add a new Instructor.
          </p>
          <NewInstructor setOpen={setOpen} />
        </Box>
          </Modal>
          {/* <Modal open={openDelete} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '40%' }} className='rounded-md'>
          <h2 id='parent-modal-title' className='font-semibold text-lg' >Delete User</h2>
          <p id='parent-modal-description' className='text-base font-medium'>
            Are you sure do you want to delete the user?
          </p>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} sx={{ mt: 3, ml: 1 }}>
              Cancel
            </Button>

            <Button
              variant='contained'
              onClick={handleDelete}
              sx={{ mt: 3, ml: 1 }}
              className='hover:text-white hover:gobeze-primary-bg'
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal> */}
        </React.Fragment>
       
  );
}
