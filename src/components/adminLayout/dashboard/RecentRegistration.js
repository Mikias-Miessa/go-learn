import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Moment from 'moment';
import Link from '../../Link';
import {
  Table,
  CircularProgress,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Typography,
  Popper,
  Fade,
  Paper,
  Button,
  IconButton,
  Backdrop,
  Modal,
} from '@mui/material';

import Title from '../../Title';
import Contacted from '../students/Contacted';
import Enrolled from '../students/Enrolled';
import {
  getRegisteredStudents,
  reset,
  deleteStudent,
} from '../../../../store/studentSlice';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import NewStudent from '../students/NewStudent';

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

export default function RecentRegistration() {
  const { students, status, loading } = useSelector((state) => state.student);
  const [updatedStudent, setUpdatedStudent] = useState(null);
  const [openPoper, setOpenPoper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [backdrop, setBackdrop] = useState(false);
  const [openContacted, setOpenContacted] = useState(false);
  const [openEnroll, setOpenEnroll] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRegisteredStudents());
  }, []);
  useEffect(() => {
    if (status === 'deleting') {
      setBackdrop(true);
    }
    if (status === 'deleted') {
      toast.success('Student Deleted!');
      setBackdrop(false);
      setOpenPoper(false);
      dispatch(reset());
    }
  }, [status]);
  const handlePopperClick = (event, id) => {
    // console.log(id);
    let student = students.find((c) => c._id === id);
    setUpdatedStudent(student);
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => !prev);
  };

  const handleDelete = () => {
    console.log(`will delete ${updatedStudent?._id}`);
    dispatch(deleteStudent(updatedStudent?._id));
  };
  const handleClose = () => {
    setOpenContacted(false);
    setOpenPoper(false);
    setOpenEnroll(false);
  };
  const getDuration = (date) => {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const createdDate = new Date(date);
    const today = new Date();
    const utc1 = Date.UTC(
      createdDate.getFullYear(),
      createdDate.getMonth(),
      createdDate.getDate()
    );
    const utc2 = Date.UTC(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const dayDifference = Math.floor((utc2 - utc1) / _MS_PER_DAY);
    return dayDifference === 0 ? 'Today' : dayDifference + ' days ago';
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 1,
          my: 1,
        }}
      >
        <Title>Recent Registration </Title>
        <Button variant='contained' onClick={handleOpen}>
          Register New Student
        </Button>
      </Box>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Registered Date</TableCell>
            <TableCell></TableCell>
            {/* <TableCell align="right">Sale Amount</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>
                <CircularProgress color='primary' sx={{ m: 'auto' }} />{' '}
              </TableCell>
            </TableRow>
          ) : (
            students
              .filter((student) => !student.contacted)
              .slice(0, 8)
              .map(
                (student, index) =>
                  student && (
                    <TableRow key={index}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.phone}</TableCell>
                      <TableCell>{student.email}</TableCell>
                      <TableCell>
                        {student.course?.course?.courseName}
                      </TableCell>
                      <TableCell>
                        {student.createdAt &&
                          Moment(student.createdAt).format('MMM DD YYYY ')}
                        <Typography
                          sx={{ color: 'primary.main', fontSize: '0.875rem' }}
                        >
                          {getDuration(student.createdAt && student.createdAt)}
                        </Typography>
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
                                    <EditOutlinedIcon fontSize='small' />
                                  }
                                  onClick={() => {
                                    setOpenContacted(true);
                                  }}
                                >
                                  Mark as contacted
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
                                  onClick={handleDelete}
                                >
                                  Delete Student
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
                                    <DomainVerificationIcon fontSize='small' />
                                  }
                                  onClick={() => {
                                    setOpenEnroll(true);
                                  }}
                                >
                                  Enroll Strudent
                                </Button>
                              </Paper>
                            </Fade>
                          )}
                        </Popper>
                        <IconButton
                          onClick={(e) => {
                            handlePopperClick(e, student._id && student._id);
                          }}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
              )
          )}
        </TableBody>
      </Table>
      <Box sx={{ mt: 3, '& a': {} }}>
        <Link href='/admin/students'>See more</Link>
      </Box>
      <Modal open={openContacted} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Mark as contacted</h2>
          <p id='parent-modal-description'>
            You can put a remark about the student for a reminder.
          </p>
          <Contacted setOpen={handleClose} student={updatedStudent} />
        </Box>
      </Modal>

      <Modal open={openEnroll} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Enroll Student</h2>
          <p id='parent-modal-description'>
            Enter payment details of the student.
          </p>
          <Enrolled setOpen={handleClose} student={updatedStudent} />
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Register new Student.</h2>
          <p id='parent-modal-description'>Add Student details.</p>
          <NewStudent setOpen={setOpen} />
        </Box>
      </Modal>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
}
