import React from 'react'

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
    const formattedDate = getCurrentFormattedDate();
  return (
      <div>
          <form className='flex flex-col  items-center' >
              {/* <label htmlFor="name">Name:</label> */}
              <div className='-mt-2'>
                <input type="text" id="date" name="date" value={formattedDate} className=' text-center  w-fit bg-transparent  text-gray-600 font-normal text-xl ' />
              </div>
        

        {/* <label htmlFor="email">Email:</label> */}
              {/* <div className='text-center -mt-16'> */}
                  <input type="text" id="stname" name="stname" value={selectedStudent.name?selectedStudent.name:''} className=' mt-48 text-center font-normal text-4xl w-fit bg-transparent'  />
              <p className='text-orange-500 text-lg mb-10 mt-2'>Has Successfully completed the</p>
                  <input type="text" id="course" name="course" value={selectedStudent.course?selectedStudent.course.course.courseName:''} className=' text-center font-normal text-3xl w-screen flex bg-transparent py-1' />
              <input className='text-orange-500 text-lg  bg-transparent mb-28 text-center' />
              {/* </div> */}
              
        {/* Add more form elements as needed */}
      </form>

    </div>
  )
}

export default Certificate