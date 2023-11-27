import { createRouter } from 'next-connect';
import slugify from 'slugify';
import Grid from 'gridfs-stream';
import connectMongo from '../../../utils/db';
import userAuth from '../../../middleware/userAuth';
import Class from '../../../models/Class';
import Course from '../../../models/Course';
import Student from '../../../models/Student';
import Payment from '../../../models/Payment';

const router = createRouter();

router
  .use(async (req, res, next) => {
    
    await connectMongo();
    

    await next(); // call next in chain
  })
  .get(async (req, res) => {
    const { query } = req;

    try {
      let student = await Student.findOne({ _id: query.id }).populate(
        'course payment'
      );
      if (!student) {
        return res.status(400).json({
          errors: [{ msg: 'Student not found' }],
        });
      }

      res.json(student);
    } catch (err) {
      
      res.status(500).send('Server Error');
    }
  })
  .delete(async (req, res) => {
    const { query } = req;

    
    try {
      //remove review from Hospitals and doctors data

      let updatedStudent = await Student.findById(query.id);
      if (!updatedStudent) {
        return res.status(400).json({
          errors: [{ msg: 'Student not found' }],
        });
      }

      await Student.findOneAndRemove({
        _id: query.id,
      });
      await Payment.deleteMany({ student: query.id });
      await Class.updateMany({}, { $pullAll: { students: [query.id] } });
      res.json({ id: query.id, msg: 'Student deleted' });
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
