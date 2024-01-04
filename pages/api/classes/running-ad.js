import userAuth from '../../../middleware/userAuth';

import connectMongo from '../../../utils/db';
import Class from '../../../models/Class';
import Course from '../../../models/Course';
import Student from '../../../models/Student';

const handler = async (req, res) => {
  const { method } = req;
  
  await connectMongo();
  

  if (method === 'GET') {
    try {
      let classes = await Class.find({ status: 'running' })
        .populate('course students instructor')
        .lean();
      let foundId = '';
      
      const adClasses = [];
      classes.forEach((training) => {
        const courseFound = adClasses.find(
          (cl) => cl?.course?._id === training?.course?._id
        );
        if (!courseFound) {
          adClasses.push(training);
        } else {
          foundId = courseFound._id;
          
          courseFound.schedules = [
            {
              name: courseFound.schedule,
              value: courseFound._id,
            },
            {
              name: training.schedule,
              value: training._id,
            },
          ];
          
        }
      });
      // 
      // 
      res.json(adClasses);
    } catch (err) {
      
      res.status(500).send('Server Error');
    }
  }
};

export default handler;
// export default userAuth(handler)
