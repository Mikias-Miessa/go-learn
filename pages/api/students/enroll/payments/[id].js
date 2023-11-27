import { createRouter } from 'next-connect';
import slugify from 'slugify';
import Grid from 'gridfs-stream';
import connectMongo from '../../../../../utils/db';
import userAuth from '../../../../../middleware/userAuth';
import Class from '../../../../../models/Class';
import Course from '../../../../../models/Course';
import Student from '../../../../../models/Student';
import Payment from '../../../../../models/Payment';

const router = createRouter();

router
  .use(async (req, res, next) => {
    
    await connectMongo();
    
    await next(); // call next in chain
  })
  .put(async (req, res) => {
    //add payment to an enrolled student who didn't finish his payment.
    const { query, body } = req;
    
    try {
      const { reference, amount } = body;
      let updatedStudent = await Student.findById(query.id).populate({
        path: 'course',
        populate: {
          path: 'course',
        },
      });
      if (!updatedStudent) {
        return res.status(400).json({
          errors: [{ msg: 'Student not found' }],
        });
      }
      let studentPayment = await Payment.findById(updatedStudent.payment);

      let coursePrice = updatedStudent?.course?.course.price;

      studentPayment.amount = Number(amount) + Number(studentPayment.amount);
      studentPayment.status = 'complete';
      studentPayment.references.push(reference);

      if (amount <= coursePrice) {
        studentPayment.status = 'not_complete';
      }
      await studentPayment.save();

      let populatedUpdatedStudent = await Student.findById(query.id).populate(
        'course payment'
      );

      res.json(populatedUpdatedStudent);
    } catch (err) {
      
      res.status(500).send('Server Error');
    }
  });

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Server Error!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});
