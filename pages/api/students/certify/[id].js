import { createRouter } from 'next-connect';
import slugify from 'slugify';
import Grid from 'gridfs-stream';
import connectMongo from '../../../../utils/db';
import userAuth from '../../../../middleware/userAuth';
import Class from '../../../../models/Class';
import Course from '../../../../models/Course';
import Student from '../../../../models/Student';
import Payment from '../../../../models/Payment';
import Certificate from '../../../../models/Certificate';

const router = createRouter();

router
  .use(async (req, res, next) => {
    
    await connectMongo();
    
    await next(); // call next in chain
  })
  .post(async (req, res) => {
    // 
    const { query, body } = req;

    
    
    try {
      const { certificateId, certificateImage } = body;
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
      const newCertificate = new Certificate({
        certificateId,
        certificateImage,
        student: updatedStudent._id,
      });
      await newCertificate.save();

      updatedStudent.status = 'certified';
      updatedStudent.certificate = newCertificate._id;
      await updatedStudent.save();

      let populatedUpdatedStudent = await Student.findById(query.id).populate(
        'course payment certificate'
      );

      res.json(populatedUpdatedStudent);
    } catch (err) {
      
      res.status(500).send('Server Error');
    }
  })
  .put(async (req, res) => {
    // 
    
    const { query, body } = req;

    try {
      const { certificateId, certificateImage } = body;

      let updatedStudent = await Certificate.find({
        student: query.id,
      }).populate({
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
      const updatedCertificate = await Certificate.findOne({
        certificate: updatedStudent.certificate,
      });
      if (updatedCertificate) {
        
        updatedCertificate.certificateId = certificateId;
        updatedCertificate.certificateImage = certificateImage;
        await updatedCertificate.save();
      }

      let populatedUpdatedStudent = await Student.findById(query.id).populate(
        'course payment certificate'
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
