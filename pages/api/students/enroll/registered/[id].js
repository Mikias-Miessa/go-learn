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
    console.log('connecting...');
    await connectMongo();
    console.log('connected!');
    await next(); // call next in chain
  })
  .put(async (req, res) => {
    // console.log(req)
    const { query, body } = req;

    console.log(query);
    console.log(body);
    try {
      const { remark, payment_with, reference, amount, bank, course } = body;
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
      // console.log('coursePrice: ' + coursePrice);
      // console.log('paidAmount: ' + amount);
      studentPayment.payment_with = payment_with;
      studentPayment.confirmed = true;
      studentPayment.amount = amount;

      studentPayment.status = 'complete';

      if (payment_with === 'bank') {
        studentPayment.bank = bank;
        studentPayment.references.push(reference);
      }
      if (amount <= coursePrice) {
        studentPayment.status = 'not_complete';
      }
      await studentPayment.save();

      updatedStudent.status = 'enrolled';
      console.log(updatedStudent.course._id);
      console.log(course);
      if (updatedStudent.course._id != course) {
        const [updatedClass, prevClass] = await Promise.all([
          Class.findById(course),
          Class.findById(updatedStudent.course._id),
        ]);
        // let updatedClass = await Class.findById(course);
        // let prevClass = await Class.findById(updatedStudent.course);
        //Get remove Index
        console.log(prevClass.students);
        console.log(updatedStudent._id);
        const removeIndex = prevClass.students.indexOf(updatedStudent._id);
        console.log('removeIndex');
        console.log(removeIndex);
        prevClass.students.splice(removeIndex, 1);
        updatedClass.students.push(updatedStudent._id);

        updatedStudent.course = course;
        await Promise.all([updatedClass.save(), prevClass.save()]);
        // await prevClass.save();
        // await updatedClass.save();
      }

      await updatedStudent.save();

      let populatedUpdatedStudent = await Student.findById(query.id).populate(
        'course payment'
      );

      res.json(populatedUpdatedStudent);
    } catch (err) {
      console.log(err);
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
