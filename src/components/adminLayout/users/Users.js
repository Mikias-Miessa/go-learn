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
import { getUsers, reset, deleteUser } from '../../../../store/userSlice';
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
import UpdateUser from './UpdateUser'
import NewUser from './NewUser'

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

export default function Users() {
  const { users, loading, deleteUserStatus, getuser } = useSelector((state) => state.user);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [openPoper, setOpenPoper] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [deleteduser, setDeletedUser] = useState();

    const handleUpdate = () => {
   
    setUpdate(true);
  };
   const handlePopperClick = (event,id) => {
    //
    let user = users.find((u) => u._id === id);
     setUpdatedUser(user);
     setDeletedUser(user);
     console.log(user)
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => !prev);
  };  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    setOpenPoper(false);
  };
  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteUser({ userid: deleteduser._id }))
  }
  
  const admin = 'admin';

  useEffect(() => {
    if(getuser === 'idel')
    dispatch(getUsers());
    
  }, [getuser]);
  useEffect(() => {
    if (deleteUserStatus === 'success') {
      toast.success('Schedule removed successfully!');
      setOpenDelete(false)
      dispatch(reset())
    }
  }, [deleteUserStatus])
  return (
    <React.Fragment>
      {user && user.role === admin ? (
        <React.Fragment>
          <Title>Users</Title>
         <Paper
        elevation={0}
        sx={{
          p: '24px',
        }}
      >
        <Button variant='contained' onClick={handleOpen}>
          New User
        </Button>
      </Paper>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Email</TableCell>
                <TableCell></TableCell>
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
                users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.email}</TableCell>
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
                      </TableCell>
                  </TableRow>
                ))
              )}
              {console.log(users)}
            </TableBody>
          </Table>
          <Modal open={update} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Update course</h2>
          <p id='parent-modal-description'>
            Update Users.
          </p>
              <UpdateUser setOpen={handleClose} user={updatedUser} />
              
        </Box>
      </Modal>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Add new course</h2>
          <p id='parent-modal-description'>
            Add a new user.
          </p>
          <NewUser setOpen={setOpen} />
        </Box>
          </Modal>
          <Modal open={openDelete} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '60%' }}>
          <h2 id='parent-modal-title'>Delete User</h2>
          <p id='parent-modal-description'>
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
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
        </React.Fragment>
      ) : (
        <div>Unauthorized Page</div>
      )}
    </React.Fragment>
  );
}
