import { useRouter } from 'next/router';
import { useState, useEffect,useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Link from '@mui/material/Link';
import Moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid,
  Container,
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
  Divider,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { getClass } from '../../../../store/classSlice';
import { saveCertificate } from '../../../../store/studentSlice';
import Title from '../../Title';
import NewStudent from './NewStudent';
import { TryOutlined } from '@mui/icons-material';
import { toast } from 'react-toastify';
import NewReference from './NewReference';
import AddIcon from '@mui/icons-material/Add';
// import Certificate from './Certificate';

import QRCode from "react-qr-code";

function getCurrentFormattedDate() {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];

  const currentDate = new Date();
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
}
// Generate Order Data


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

export default function Students() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { query } = router;
  const { singleClass, loading } = useSelector((state) => state.classroom);

  const [open, setOpen] = useState(false);
  const [openCertify, setOpenCertify] = useState(false)
  const [addReferenceModal, setAddReferenceModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [values, setValues] = useState({
      date :'',
      stname:'',
      course:'',
      courseType: '',
      shareLink: '',
      certificateId:'',
  })
  const fillCertificate = ( selectedStudent ) => {
    // console.log()
    if (selectedStudent) {
      const sanitizedName = selectedStudent.name.replace(/\s/g, '');
      const time = new Date();
      const year = time.getFullYear();
      const currentMonth = time.getMonth();
      const date = time.getDate();
      const seconds = time.getSeconds();
      const formatedDate = String(date).padStart(2, '0');
      const formattedSeconds = String(seconds).padStart(2, '0');
      const certificateId = `${sanitizedName}${year}${currentMonth}${formatedDate}${formattedSeconds}`;

      console.log(selectedStudent.name)

      setValues({
        date: formattedDate,
        stname: selectedStudent.name ? selectedStudent.name : '',
        course: selectedStudent.course ? selectedStudent.course.course.courseName : '',
        courseType:'Enter course Type here',
        shareLink: `http://localhost:3000/certificates/${certificateId}`,
        certificateId:certificateId,
      })
      
    }
  }
   const handleCertificateInputChange = (e)=>{
    const {name,value} = e.target;

    setValues({
      ...values,
      [name]:value
    })
  }
    const formattedDate = getCurrentFormattedDate();
  useEffect(() => {
    if (copied) {
      toast.success('Reference Id copied!');
      setCopied(false);
    }
  }, [copied]);
  useEffect(() => {
    
    query && dispatch(getClass(query.id));
  }, [query]);

  const getClassStudents = () => {
    dispatch(getClass(query.id));
  };

  const handleOpen = () => {
    setOpen(true);
  };
 

  const handleClose = () => {
    setOpen(false);
    setAddReferenceModal(false);
    setOpenCertify(false);
  };
  const enrolledStudents = singleClass?.students.filter(
    (student) => student.status === 'enrolled' || student.status === 'certified'
  );


  const containerRef = useRef(null);

    const convertToPdf = async () => {
  const containerElement = containerRef.current;

  if (!containerElement) {
    console.error('Container element not found');
    return;
  }

  try {
    const canvas = await html2canvas(containerElement);

    const pdf = new jsPDF({
      orientation: 'landscape', // or 'landscape'
      unit: 'mm',
      format: 'a4', // or [width, height]
    });

    pdf.addImage(
      canvas.toDataURL('image/png'),
      'PNG',
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height
    );

    // Convert the data URL to a Blob
    const blob = await fetch(pdf.output('blob')).then((res) => res.blob());

    // Create a File object from the Blob
    const pdfFile = new File([blob], `${values.stname}.pdf`, {
      type: 'application/pdf',
    });

    // Dispatch the action with the PDF file
    dispatch(saveCertificate({ ...values, pdf: pdfFile }));
  } catch (error) {
    console.error('Error converting to PDF', error);
  }
};


  return (
    <>
      <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {loading ? (
            <CircularProgress color='primary' sx={{ m: 'auto' }} />
          ) : (
            singleClass && (
              <>
                <Grid item xs={12}>
                  <Paper
                    sx={{ p: 2, display: 'flex', flexDirection: 'column' }}
                  >
                    <Box
                      sx={{
                        p: 2,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem',
                      }}
                    >
                      <div>
                        <Title>
                          {singleClass.course?.courseName}
                          <Box component='span' sx={{ fontWeight: '300' }} className='bg-red-500 h-10 w-10'>
                            {/* {l} */}
                            {singleClass.schedule._id}{' '}
                          </Box>
                        </Title>
                        <Typography variant='body1'>
                          {singleClass.course?.courseCode}
                        </Typography>
                      </div>

                      <Divider orientation='vertical' flexItem />
                      <div>
                        <Typography
                          variant='h2'
                          sx={{ fontSize: '1rem', color: 'primary.main' }}
                        >
                          Start Date :{' '}
                          {singleClass.start_date &&
                            Moment(singleClass.start_date).format(
                              'MMM DD YYYY '
                            )}
                        </Typography>
                        <Typography
                          variant='h2'
                          sx={{ fontSize: '1rem', mt: '1rem' }}
                        >
                          {enrolledStudents.length} Students
                        </Typography>
                      </div>
                      <Divider orientation='vertical' flexItem />

                      <div>
                        <Button
                          variant='contained'
                          sx={{ fontSize: '0.75rem', p: '4px 12px' }}
                          onClick={handleOpen}
                        >
                          Enroll New Student
                        </Button>
                      </div>
                    </Box>

                    <Paper
                      elevation={0}
                      sx={{
                        p: 2,
                      }}
                    >
                      <Typography
                        component='h4'
                        sx={{ fontSize: '1.125rem', fontWeight: '500' }}
                      >
                        List of Enrolled Students
                      </Typography>
                    </Paper>
                    <Table size='small'>
                      <TableHead>
                        <TableRow>
                          <TableCell>Name</TableCell>
                          <TableCell>Phone</TableCell>
                          <TableCell>Payment</TableCell>
                          <TableCell>Paid Amount</TableCell>
                          <TableCell>Certificate</TableCell>
                          {/* <TableCell>Price</TableCell> */}
                          {/* <TableCell align="right">Sale Amount</TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {enrolledStudents.length > 0 ? (
                          enrolledStudents.map(
                            (row, index) =>
                              row && (
                                <TableRow key={index}>
                                  <TableCell
                                    onClick={() => {
                                      
                                    }}
                                  >
                                    {row.name}
                                  </TableCell>
                                  <TableCell>{row.phone}</TableCell>
                                  {row.payment?.payment_with === 'cash' ? (
                                    <TableCell>Cash</TableCell>
                                  ) : (
                                    <TableCell>
                                      <Box>{row.payment?.bank}</Box>
                                      <Box>
                                        {row.payment?.references.map(
                                          (reference, index) => (
                                            <CopyToClipboard
                                              key={index}
                                              text={reference}
                                              onCopy={() =>
                                                setCopied(TryOutlined)
                                              }
                                            >
                                              <Box
                                                component='span'
                                                sx={{
                                                  cursor: 'pointer',
                                                  display: 'block',
                                                }}
                                              >
                                                {' '}
                                                {reference}
                                              </Box>
                                            </CopyToClipboard>
                                          )
                                        )}
                                      </Box>
                                    </TableCell>
                                  )}

                                  <TableCell>
                                    <Box sx={{ display: 'flex' }}>
                                      <Typography
                                        sx={{
                                          background:
                                            row.payment?.amount <
                                            row.course?.course?.price
                                              ? '#d73f3f'
                                              : 'green',
                                          borderRadius: 1,
                                          padding: '4px 8px',
                                          color: 'white',
                                        }}
                                      >
                                        {row.payment?.amount}
                                      </Typography>

                                      {row.payment?.amount <
                                        row.course?.course?.price && (
                                        <Tooltip
                                          title='Add Payment reference'
                                          placement='bottom'
                                        >
                                          <Button
                                            variant='contained'
                                            sx={{
                                              fontSize: '0.75rem',
                                              p: '0px',
                                              ml: 2,
                                              // color,
                                            }}
                                            onClick={() => {
                                              setAddReferenceModal(true);
                                              setSelectedStudent(row);
                                            }}
                                          >
                                            <AddIcon />
                                          </Button>
                                        </Tooltip>
                                      )}
                                    </Box>
                                  </TableCell>
                                  <TableCell>
                                    {row.status === 'certified' && (
                                      <Link
                                        href={`https://gobeze.com/certificate/${row.certificate?.certificateId}`}
                                        target='_blank'
                                      >
                                        {' '}
                                        Certificate{' '}
                                      </Link>
                                    )}
                                    {row.status === 'enrolled' &&
                                      'Not Certified'}
                                  </TableCell>
                                  <TableCell>
                                     <Button
                                            variant='contained'
                                            sx={{
                                              fontSize: '0.75rem',
                                              p: '0px',
                                              ml: 2,
                                              // color,
                                            }}
                                      onClick={() => {
                                        setOpenCertify(true);
                                        // setSelectedStudent(row);
                                        fillCertificate(row);
                                        // console.log(row.course.course.courseName);
                                      }}
                                      className='px-2 py-1'
                                          >
                                      {/* <AddIcon /> */}
                                      Certify Student
                                          </Button>
                                    {/* <Box  sx={{ display: 'flex', gap: '1rem' }}>
                <Typography>{row.enrolledStudents}</Typography>
         <Link href={`/admin/classes/students`}>See Students</Link>
    </Box> */}
                                  </TableCell>
                                  {/* <TableCell>{row.price}</TableCell> */}
                                  {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
                                </TableRow>
                              )
                          )
                        ) : (
                          <>
                            <TableRow>
                              <TableCell
                                sx={{ textAlign: 'center', color: 'gray' }}
                                colSpan={5}
                              >
                                No Students enrolled in this course
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
                  </Paper>
                </Grid>
              </>
            )
          )}
        </Grid>
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...modalStyle, width: 500 }}>
          <h2 id='parent-modal-title'>
            Enroll new Student in{' '}
            <Box
              component='span'
              sx={{ fontWeight: '300', color: 'primary.main' }}
            >
              {singleClass?.course?.courseName}{' '}
            </Box>{' '}
          </h2>
          <p id='parent-modal-description'>
            Add a student who has made payment.
          </p>
          <NewStudent
            setOpen={setOpen}
            course={singleClass?._id}
            price={singleClass?.course?.price}
          />
        </Box>
      </Modal>
      <Modal
        open={addReferenceModal}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...modalStyle, width: 500 }}>
          <h2 id='parent-modal-title'>
            Add another Payment for
            <Box
              component='span'
              sx={{
                display: 'block',
                fontWeight: '300',
                color: 'primary.main',
              }}
            >
              {selectedStudent?.name}{' '}
            </Box>{' '}
          </h2>
          <p id='parent-modal-description'>Add a reference Id of payment.</p>
          <NewReference
            setOpen={setAddReferenceModal}
            id={selectedStudent?._id}
            course={singleClass?._id}
            price={singleClass?.course?.price}
            getClassStudents={getClassStudents}
          />
        </Box>
      </Modal>
      <Modal
        open={openCertify}
        onClose={handleClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'
      >
        <Box sx={{ ...modalStyle, width: '70%' }}>
          <h2 id='parent-modal-title'>
            
            <Box
              component='span'
              sx={{
                display: 'block',
                fontWeight: '300',
                color: 'primary.main',
              }}
            >
             
            </Box>{' '}
          </h2>
          <div ref={containerRef}  className="h-fit  text-black flex flex-col items-center gap-10 bg-[url('/certeficateBg.png')] bg-center bg-contain bg-no-repeat">
      {/* <h1>.</h1> */}
      <div>
        {/* Additional content goes here */}
        {/* <p>.</p> */}
      </div>
      {/* <Certificate selectedStudent={selectedStudent}/> */}
      <div className='mt-20'>
          <form className='flex flex-col  items-center' >
              {/* <label htmlFor="name">Name:</label> */}
              <div className='-mt-4'>
          <input
            type="text"
            id="date"
            name="date"
            value={values.date}
            onChange={handleCertificateInputChange}
            className=' text-center  w-fit bg-transparent  text-gray-600 font-normal text-xl '
          />
              </div>

        <input
          type="text"
          id="stname"
          name="stname"
          value={values.stname}
          onChange={handleCertificateInputChange}
          className=' mt-44 text-center font-normal text-3xl w-fit bg-transparent'
        />

        <p className='text-orange-500 text-lg mb-10 '>Has Successfully completed the</p>

        <input
          type="text"
          id="course"
          name="course"
          value={values.course}
          onChange={handleCertificateInputChange}
          className=' text-center font-normal text-2xl w-screen flex bg-transparent py-1'
        />
        <input
          name='courseType'
          className='text-orange-500 text-lg  bg-transparent  text-center mb-2'
          value={values.courseType}
          onChange={handleCertificateInputChange}
        />
        <QRCode name='slug' value={values.shareLink} onChange={handleCertificateInputChange} className='w-14 h-14 mb-8' />
      </form>

    </div>
          </div>
          <div className='flex justify-end gap-4 '>
                
            <button onClick={handleClose} className='bg-white px-4 py-2 rounded text-orange-500 hover:scale-105 duration-200 shadow-sm' >Cancel</button>
            <button onClick={convertToPdf} className='bg-orange-500 px-4 py-2 rounded text-white hover:scale-105 duration-200' >Save</button>
          </div>
          
        </Box>
      </Modal>
    </>
  );
}
