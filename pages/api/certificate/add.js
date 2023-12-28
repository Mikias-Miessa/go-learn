import multer from 'multer';
import connectMongo from '../../../utils/db';
import Certificate from '../../../models/Certificate';
import { createRouter } from 'next-connect';
import { GridFsStorage } from 'multer-gridfs-storage';


export const config = {
  api: {
    bodyParser: false,
  },
};

// let storage = new GridFsStorage({
//   url: process.env.ATLAS_MONGO_URI,
//   file: (req, file) => {
//     const match = ['application/pdf'];
//     if (match.indexOf(file.mimetype) === -1) {
//       const filename = `${Date.now()}-gobeze-${file.originalname}`;
//       return { filename };
//     }

//     return {
//       bucketName: 'certificates',
//       filename: `${Date.now()}-gobeze-${file.originalname}`,
//     };
//   },
// });

// const upload = multer({ storage });

const router = createRouter();

router
  .use(async (req, res, next) => {
    await connectMongo();
    await next(); // call next in chain
  })
  // .use(upload.single('pdf'))

.post(async (req, res) => {
  try {
    // const { date, shareLink, name, course } = req.body;

    // const newCertificate = new Certificate({
    //   date: date,
    //   shareLink: shareLink,
    //   name: name,
    //   course: course,
    // });

    // await newCertificate.save();
    console.log('it works'+req.body);

    res.status(201).json({ message: 'Certificate saved successfully' });
  } catch (error) {
      console.log(error)
    console.error('Error saving certificate:', error);
    res.status(500).json({ error: 'this is Internal server error' });
  }
});

export default router;
