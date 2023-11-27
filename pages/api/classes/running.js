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
      let classes = await Class.find({ status: 'running' }).populate(
        'course students schedule'
      );

      
      res.json(classes);
    } catch (err) {
      
      res.status(500).send('Server Error');
    }
  }
};

export default handler;
// export default userAuth(handler)
