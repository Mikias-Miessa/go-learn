import React,{useEffect, useState} from 'react'
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
const Certificate = ({ selectedStudent }) => {
  const [values, setValues] = useState({
      date :'',
      stname:'',
      course:'',
      courseType: '',
      slug:'',
  })
  useEffect(() => {
    if (selectedStudent) {
     const certificateId = `${selectedStudent.name}`
      setValues({
        date: formattedDate,
        stname: selectedStudent.name ? selectedStudent.name : '',
        course: selectedStudent.course ? selectedStudent.course.course.courseName : '',
        courseType:'Enter course Type here',
        slug:`https://gobezelearning.vercel.app/certificate/${certificateId}`,
      })
      
    }
    
  }, []) 
  const handleInputChange = (e)=>{
    const {name,value} = e.target;

    setValues({
      ...values,
      [name]:value
    })
  }
    const formattedDate = getCurrentFormattedDate();
  return (
      <div className='mt-20'>
          <form className='flex flex-col  items-center' >
              {/* <label htmlFor="name">Name:</label> */}
              <div className='-mt-4'>
          <input
            type="text"
            id="date"
            name="date"
            value={values.date}
            onChange={handleInputChange}
            className=' text-center  w-fit bg-transparent  text-gray-600 font-normal text-xl '
          />
              </div>

        <input
          type="text"
          id="stname"
          name="stname"
          value={values.stname}
          onChange={handleInputChange}
          className=' mt-44 text-center font-normal text-3xl w-fit bg-transparent'
        />

        <p className='text-orange-500 text-lg mb-10 '>Has Successfully completed the</p>

        <input
          type="text"
          id="course"
          name="course"
          value={values.course}
          onChange={handleInputChange}
          className=' text-center font-normal text-2xl w-screen flex bg-transparent py-1'
        />
        <input
          name='courseType'
          className='text-orange-500 text-lg  bg-transparent  text-center mb-2'
          value={values.courseType}
          onChange={handleInputChange}
        />
        <QRCode name='slug' value={values.slug} onChange={handleInputChange} className='w-14 h-14 mb-8' />
      </form>

    </div>
  )
}

export default Certificate