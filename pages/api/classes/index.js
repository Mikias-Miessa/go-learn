import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { createRouter } from 'next-connect';
import slugify from 'slugify';
import connectMongo from '../../../utils/db';
import userAuth from '../../../middleware/userAuth';
import Class from '../../../models/Class';
import Course from '../../../models/Course';

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = new GridFsStorage({
  url: process.env.ATLAS_MONGO_URI,
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

const router = createRouter();

router
  .use(async (req, res, next) => {
    await connectMongo();
    await next(); // call next in chain
  })
  .use(upload.single('thumbnail'))
  .post(async (req, res) => {
    try {
      if (!req.file) {
        // No file was provided in the request
        return res.status(400).json({
          errors: [{ msg: 'No file uploaded' }],
        });
      }

      const { course, description, schedule, start_date, instructor, remark } =
        req.body;

      // const API =
      //   process.env.NODE_ENV == 'production'
      //     ? 'https://gobeze.com'
      //     : 'http://localhost:3000';
      const API =
        process.env.NODE_ENV == 'production'
          ? 'https://gobezelearning.vercel.app'
          : 'http://localhost:3000';

      const thumbnailImage = '/api/files/images/' + req.file.filename;
      let selectedCourse = await Course.findById(course);
      if (!selectedCourse) {
        return res.status(400).json({
          errors: [{ msg: 'Course not found' }],
        });
      }
      const slug = slugify(selectedCourse.courseName + schedule);
      let newClass = new Class({
        course,
        slug: slug,
        description,
        schedule,
        start_date,
        thumbnail: thumbnailImage,
        instructor,
        remark,
        status: 'running',
      });
      await newClass.save();

      let populatedNewClass = await Class.findById(newClass._id).populate(
        'course'
      );

      res.json(populatedNewClass);
    } catch (err) {
      console.error(err);

      if (err instanceof multer.MulterError) {
        // Multer error occurred (e.g., file size exceeded)
        return res.status(400).json({
          errors: [{ msg: 'File upload error', detail: err.message }],
        });
      }

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
