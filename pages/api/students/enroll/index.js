import connectMongo from '../../../../utils/db';
import Class from '../../../../models/Class';
import Course from '../../../../models/Course';
import Student from '../../../../models/Student';
import Payment from '../../../../models/Payment';
import User from '../../../../models/User';

import { sendEmail } from '../../../../utils/email';
import userAuth from '../../../../middleware/userAuth';

const enrollStudent = async (req, res) => {
  const { method, body } = req;

  const { course, name, email, phone, bank, payment_with, reference, amount } =
    body;
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
        status: 'enrolled',
        registered_online: false,
        registered_by: req.user.id,
      });
      await newStudent.save();
      classFound.students.push(newStudent._id);
      await classFound.save();

      const newPayment = new Payment({
        student: newStudent._id,
        bank,
        payment_with,
        references: [reference],
        status: 'confirmed',
        amount,
      });
      await newPayment.save();
      newStudent.payment = newPayment._id;
      await newStudent.save();

      // const newStudentPayment = await Payment.findById(newPayment._id).populate({
      //     path: 'student',
      //     populate: {
      //         path: 'course',model:Class,
      //         populate:{
      //             path: 'course',model:Course
      //         }
      //     }
      // })
      // 
      // email && sendEmail(newStudentPayment)
      classFound = await Class.findById(course).populate({
        path: 'course students',
        populate: {
          path: ' course payment registered_by',
          populate: {
            path: 'course',
          },
        },
      });
      res.json(classFound);
    }
  } catch (err) {
    
    res.status(500).send('Server Error');
  }
};

export default userAuth(enrollStudent);
