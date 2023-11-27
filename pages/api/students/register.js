import connectMongo from '../../../utils/db';
import Class from '../../../models/Class';
import Course from '../../../models/Course';
import Student from '../../../models/Student';
import Payment from '../../../models/Payment';

import { sendEmail } from '../../../utils/email';

export default async function addStudent(req, res) {
  const { method, body } = req;

  const { name, email, phone, bank, course, remark, contacted, schedule } = body;
  try {
    
    await connectMongo();
    
    if (method === 'POST') {
      let classFound = await Class.findById(course);
      if (!classFound) {
        return res.status(400).json({
          errors: [{ msg: 'Class not found' }],
        });
      }
      const newStudent = new Student({
        name,
        email,
        phone,
        course,
        schedule
      });
      await newStudent.save();
      classFound.students.push(newStudent._id);
      await classFound.save();
      const newPayment = new Payment({
        student: newStudent._id,
        bank,
      });
      await newPayment.save();
      newStudent.payment = newPayment._id;
      
      

      if (contacted !== undefined && contacted) {
        newStudent.contacted = true;
        newStudent.remark = remark;
      }
      await newStudent.save();
      const newStudentPayment = await Payment.findById(newPayment._id).populate(
        {
          path: 'student',
          populate: {
            path: 'course',
            model: Class,
            populate: {
              path: 'course',
              model: Course,
            },
          },
        }
      );
      // 
      if (contacted == undefined && email) {
        sendEmail(newStudentPayment);
      }

      res.json(newStudent);
    }
  } catch (err) {
    
    res.status(500).send('Server Error');
  }
}
