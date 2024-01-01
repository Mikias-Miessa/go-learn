import { useState, useEffect, useCallback, useRef } from 'react';
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
  Popper,
  Fade,
  IconButton,
} from '@mui/material';
import { toast } from 'react-toastify'

import Title from '../../Title';
import { deleteSchedule, getSchedules, reset } from '../../../../store/scheduleSlice';
import NewSchedule from './NewSchedule';
import { DeleteOutlineOutlined, MoreVertOutlined } from '@mui/icons-material';

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

export default function Schedules() {
  const dispatch = useDispatch();
  const { schedules, loading, scheduleDeleted } = useSelector((state) => state.schedule);
  const [open, setOpen] = useState(false)
  const [openDelete, setOpenDelete] = useState(false)
  const [openPoper, setOpenPoper] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null)

  useEffect(() => {
    dispatch(getSchedules());
  }, []);

  const handlePopperClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
    setOpenPoper((prev) => !prev);
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (e) => {
    e.preventDefault()
    dispatch(deleteSchedule({ id: selectedId }))
    setOpen(false)
  }

  useEffect(() => {
    if (scheduleDeleted === 'success') {
      toast.success('Schedule removed successfully!');
      setOpenDelete(false)
      setOpen(false)
      dispatch(reset())
    }
  }, [scheduleDeleted])

  return (
    <>
      <Title>Schedules </Title>
      <Paper
        elevation={0}
        sx={{
          p: '24px',
        }}
      >
        <Button variant='contained' onClick={handleOpen}>
          New Schedule
        </Button>
      </Paper>
      {loading ? (
        <CircularProgress color='primary' sx={{ margin: 'auto' }} />
      ) : schedules.length > 0 ? (
        <>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Days</TableCell>
                <TableCell>Start Hour</TableCell>
                <TableCell>End Hour</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map(
                (schedule, index) =>
                  schedule && (
                    <TableRow key={index}>
                      <TableCell>
                        {schedule.days && schedule.days.join(', ')}
                      </TableCell>
                      <TableCell>
                        {schedule.startHour }
                      </TableCell>
                      <TableCell>{schedule.endHour}</TableCell>

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
                                    <DeleteOutlineOutlined fontSize='small' />
                                  }
                                  onClick={() => {
                                    setOpenDelete(true);
                                    setSelectedId(schedule._id)
                                  }}
                                >
                                  Delete Schedule
                                </Button>
                              </Paper>
                            </Fade>
                          )}
                        </Popper>
                        <IconButton onClick={(e) => {
                          handlePopperClick(e, schedule._id && schedule._id)
                        }}>
                          <MoreVertOutlined />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
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
            No schedules added yet!
          </Typography>
        </>
      )}

      <Modal open={openDelete} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '60%' }}>
          <h2 id='parent-modal-title'>Delete Schedule</h2>
          <p id='parent-modal-description'>
            Are you sure to delete the schedule?
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
      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...modalStyle, width: '80%' }}>
          <h2 id='parent-modal-title'>Add new schedule</h2>
          <NewSchedule setOpen={setOpen} />
        </Box>
      </Modal>
    </>
  );
}
