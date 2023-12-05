import { useState, useEffect,useCallback,useRef } from 'react';
import Link from '@mui/material/Link';
import { useSelector, useDispatch } from 'react-redux';
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

import Title from '../../Title';
import NewCourse from './NewCourse';
import UpdateCourse from './UpdateCourse';
import { getCourses } from '../../../../store/courseSlice';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

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

function preventDefault(event) {
  event.preventDefault();
}

export default function Courses() {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [openPoper, setOpenPoper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [updatedCourse, setUpdatedCourse] = useState(null);
  // const buttonRef = useRef(null);
  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handlePopperClick = (event,id) => {
    // 
    let course = courses.find((c) => c._id === id);
    setUpdatedCourse(course);
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => !prev);
  };
  // const handlePopperClick = useCallback(event => {
  //   setAnchorEl(event.currentTarget);
  //   setOpenPoper((prev) => !prev);
  // }, []);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    setOpenPoper(false);
  };
  //   const updateCourse = (course)=>{
  // 
  //   }
  const handleUpdate = () => {
   
    setUpdate(true);
  };

  return (
    <>
      <Title>Courses </Title>
      <Paper
        elevation={0}
        sx={{
          p: '24px',
        }}
      >
        <Button variant='contained' onClick={handleOpen}>
          New Course
        </Button>
      </Paper>
      {loading ? (
        <CircularProgress color='primary' sx={{ margin: 'auto' }} />
      ) : courses.length > 0 ? (
        <>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Code</TableCell>
                <TableCell>Price</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                {/* <TableCell align="right">Sale Amount</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map(
                (course, index) =>
                  course && (
                    <TableRow key={index}>
                      <TableCell>
                        {course.courseName && course.courseName}
                      </TableCell>
                      <TableCell>
                        {course.courseCode && course.courseCode}
                      </TableCell>
                      <TableCell>{course.price && course.price}</TableCell>
                      {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                     
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
                                  Edit Course
                                </Button>
                                {/* <Button   sx={{border: 'none',color: 'secondary.main', fontWeight: '300', textTransform: 'none'}} variant="outlined" startIcon={<DeleteOutlineOutlinedIcon fontSize='small' />}>
  Delete Course
</Button> */}
                              </Paper>
                            </Fade>
                          )}
                        </Popper>
                        <IconButton onClick={(e)=>{
                        
                          handlePopperClick(e,course._id && course._id)
                        }}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )}
                {console.log(courses)}
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
      ) : (
        <>
          <Typography
            component='span'
            variant='body1'
            sx={{
              textAlign: 'center',
              margin: 'auto',
              color: 'secondary.light',
            }}
          >
            No courses added yet!
          </Typography>
        </>
      )}

      <Modal open={update} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Update course</h2>
          <p id='parent-modal-description'>
            Update In-person courses which are held on Gobeze.
          </p>
          <UpdateCourse setOpen={handleClose} course={updatedCourse} />
        </Box>
      </Modal>
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Add new course</h2>
          <p id='parent-modal-description'>
            Add In-person courses which are held on Gobeze.
          </p>
          <NewCourse setOpen={setOpen} />
        </Box>
      </Modal>
    </>
  );
}
