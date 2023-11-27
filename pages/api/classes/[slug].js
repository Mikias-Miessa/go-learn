import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { createRouter } from 'next-connect';
import slugify from 'slugify';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import connectMongo from '../../../utils/db';
import userAuth from '../../../middleware/userAuth';
import Class from '../../../models/Class';
import Course from '../../../models/Course';
import Student from '../../../models/Student';
import Payment from '../../../models/Payment';
import User from '../../../models/User';
import Certificate from '../../../models/Certificate';
import Schedule from '../../../models/Schedule';

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = new GridFsStorage({
  url: process.env.ATLAS_MONGO_URI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg'];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-gobeze-${file.originalname}`;
      return filename;
    }
    
    return {
      bucketName: 'files',
      filename: `${Date.now()}-gobeze-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

let gfs;
const router = createRouter();

router
  .use(async (req, res, next) => {
    
    await connectMongo();
    
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('files');
    await next(); // call next in chain
  })
  .get(async (req, res) => {
    const { query } = req;
    // 
    try {
      await Schedule.find({})
      let course = await Class.findOne({ slug: query.slug })
      .populate({
        path: 'course students schedule',
        populate: {
          path: ' course payment registered_by certificate',
          populate: {
            path: 'course',
          },
        },
      })
      .lean();
      if (!course) {
        return res.status(400).json({
          errors: [{ msg: 'Course not found' }],
        });
      }
      let classes = await Class.find({ course: course?.course?._id });
      
      
      if (classes.length > 1) {
        course.schedules = [];
        classes.forEach((training) => {
          course.schedules.push({
            name: training.schedule,
            value: training._id,
          });
        });
      }
      res.json(course);
    } catch (err) {
      
      res.status(500).send('Server Error');
    }
  })
  // .post(async (req, res) => {
  //   const { query } = req;

  //   try {
  //     let course = await Class.findOne({ slug: query.slug }).populate({
  //       path: 'course students',
  //       populate: {
  //         path: ' course payment registered_by certificate',
  //         populate: {
  //           path: 'course',
  //         },
  //       },
  //     });
  //     if (!course) {
  //       return res.status(400).json({
  //         errors: [{ msg: 'Course not found' }],
  //       });
  //     }

  //     res.json(
  //       course.students
  //         .filter((student) => student.status == 'enrolled')
  //         .map((student) => {
  //           return {
  //             id: student._id,
  //             name: student.name,
  //             // certificate: student.certificate.certificateId,
  //           };
  //         })
  //     );
  //   } catch (err) {
  //     
  //     res.status(500).send('Server Error');
  //   }
  // })
  .use(upload.single('thumbnail'))
  .put(async (req, res) => {
    const { query } = req;
    
    
    try {
      const { course, description, schedule, start_date, instructor, remark } =
        req.body;
      let updatedClass = await Class.findById(query.slug);
      if (!updatedClass) {
        return res.status(400).json({
          errors: [{ msg: 'Class not found' }],
        });
      }
      
      // gfs.remove(
      //   {
      //     filename: updatedClass.thumbnail.replace('/api/files/images/', ''),
      //     root: 'files',
      //   },
      //   async (err, gridStore) => {
      //     if (err) {
      //       return res.status(404).json({
      //         err: err,
      //       });
      //     } else {
      //       //image is removed from db
      //       
      //     }
      //   }
      // );
      // const thumbnailImage = '/api/files/images/' + req.file.filename;

      let selectedCourse = await Course.findById(course);
      if (!selectedCourse) {
        return res.status(400).json({
          errors: [{ msg: 'Course not found' }],
        });
      }
      const slug = slugify(selectedCourse.courseName + '-' + schedule);

      updatedClass.course = course;
      updatedClass.slug = slug;
      updatedClass.description = description;
      updatedClass.schedule = schedule;
      updatedClass.start_date = start_date;
      // updatedClass.thumbnail = thumbnailImage;
      updatedClass.instructor = instructor;
      updatedClass.remark = remark;

      await updatedClass.save();

      let populatedUpdatedClass = await Class.findById(query.slug).populate(
        'course'
      );

      res.json(populatedUpdatedClass);
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
