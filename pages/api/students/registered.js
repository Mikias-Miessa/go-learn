import { createRouter } from 'next-connect';
import connectMongo from '../../../utils/db';
import userAuth from '../../../middleware/userAuth';
import Student from '../../../models/Student';
import Class from '../../../models/Class';
import Course from '../../../models/Course';
import Schedule from '../../../models/Schedule';

const router = createRouter();

router
  .use(async (req, res, next) => {
    
    await connectMongo();
    
    await next(); // call next in chain
  })
  .get(async (req, res) => {
    try {
      await Schedule.find({})
      let students = await Student.find({ status: 'registered' })
        .sort('-createdAt')
        .populate({
          path: 'course schedule',
          populate: {
            path: 'course schedule',
          },
        });

      res.json(students);
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

// export default handler;
// export default userAuth(handler)
