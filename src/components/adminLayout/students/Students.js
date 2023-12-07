import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
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
import { toast } from 'react-toastify';
import Link from '../../Link';
import Title from '../../Title';
import Enrolled from './Enrolled';
import {
  getStudents,
  deleteStudent,
  reset,
} from '../../../../store/studentSlice';
import Contacted from './Contacted';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';

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

export default function Followup() {
  const { students, loading, status } = useSelector((state) => state.student);
  const [updatedStudent, setUpdatedStudent] = useState(null);

  const [openPoper, setOpenPoper] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [backdrop, setBackdrop] = useState(false);
  const [openContacted, setOpenContacted] = useState(false);
  const [openEnroll, setOpenEnroll] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getStudents());
     console.log('non contacted students: ', students)
  }, []);

  useEffect(() => {
    if (status === 'deleting') {
      setBackdrop(true);
    }
    if (status === 'deleted') {
      toast.success('Student Deleted!');
      setBackdrop(false);
      setOpenPoper(false);
      setOpenConfirm(false);
      dispatch(reset());
    }
  }, [status]);
  const handlePopperClick = (event, id) => {
    // 
    let student = students.find((c) => c._id === id);
    setUpdatedStudent(student);
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => !prev);
  };

  const handleDelete = () => {
    
    dispatch(deleteStudent(updatedStudent?._id));
  };

  const handleClose = () => {
    setOpenContacted(false);
    setOpenConfirm(false);
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
  const nonContactedStudents = students.filter(
    (student) => !student.contacted && student.status === 'registered'
  );
 
  return (
    <>
      <Title>
        Recent Registration{' '}
        <Box component='span' sx={{ fontWeight: '300' }}>
          {' '}
          ( {nonContactedStudents.length} )
        </Box>{' '}
      </Title>
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
              <TableCell colSpan={6}>
                <CircularProgress color='primary' sx={{ m: 'auto' }} />{' '}
              </TableCell>
            </TableRow>
          ) : (
            nonContactedStudents.map(
              (student, index) =>
                student && (
                  <TableRow key={index}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>
                      <Typography sx={{ fontWeight: '300' }}>
                        {student.course?.course?.courseName}
                      </Typography>

                      <Typography
                        sx={{ fontWeight: '400', color: 'primary.main' }}
                      >
                        {student?.schedule?.days && <div>
                          <div>{[...student?.schedule?.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(0, 1) + ' - ' + [...student?.schedule?.days].sort((a, b) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(a) - ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(b)).slice(-1)}</div>
                          <div>{Moment(student?.schedule?.startHour).format("h:mm A")} - {Moment(student?.schedule?.endHour).format("h:mm A")}</div>
                        </div>}
                      </Typography>
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
                                  <DomainVerificationIcon fontSize='small' />
                                }
                                onClick={() => {
                                  setOpenEnroll(true);
                                }}
                              >
                                Enroll Strudent
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
                                  setOpenConfirm(true);
                                }}
                              >
                                Delete Student
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
      <Modal open={openEnroll} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Enroll Student</h2>
          <p id='parent-modal-description'>
            Enter payment details of the student.
          </p>
          <Enrolled setOpen={handleClose} student={updatedStudent} />
        </Box>
      </Modal>
      <Modal open={openConfirm} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '60%' }}>
          <h2 id='parent-modal-title'>Delete Student</h2>
          <p id='parent-modal-description'>
            Are you sure to delete the student?
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
      <Modal open={openContacted} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Mark as contacted</h2>
          <p id='parent-modal-description'>
            You can put a remark about the student for a reminder.
          </p>
          <Contacted setOpen={handleClose} student={updatedStudent} />
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
