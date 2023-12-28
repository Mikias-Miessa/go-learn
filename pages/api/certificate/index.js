import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { createRouter } from 'next-connect';
import slugify from 'slugify';
import connectMongo from '../../../utils/db';
// import userAuth from '../../../middleware/userAuth';
import Certificate from '../../../models/Certificate';
// import Class from '../../../models/Class';
// import Course from '../../../models/Course';

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = new GridFsStorage({
  url: process.env.ATLAS_MONGO_URI,
  file: (req, file) => {
    const match = ['application/pdf'];

    if (match.indexOf(file.mimetype) === -1) {
      // If the file is not a PDF, generate a filename based on the original name
      // const filename = `${Date.now()}-gobeze-${file.originalname}`;
      const filename = req.body.certificateId ;
    
      return { filename };
    }

    // If the file is a PDF, store it in the 'pdfs' bucket with a unique filename
    return {
      bucketName: 'pdfs',
      // filename: `${Date.now()}-gobeze-${file.originalname}`,
      filename: req.body.certificateId,
      // certificateId: req.body.certificateId,
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
  .use(upload.single('pdf'))
  
  .post( async (req, res) => {
    try {
    if (!req.file) {
        // No file was provided in the request
        return res.status(400).json({
          errors: [{ msg: 'No file uploaded' }],
        });
      }
      const { name, course, shareLink, date, certificateId, } = req.body;
      const pdfFile = '/api/files/pdf/' + certificateId ;
      let newCertificate = new Certificate({
        name,
        course,
        shareLink,
        date,
        certificateId,
        pdfFile
      });
      await newCertificate.save();
      
      console.log('it works ' + name);
      console.log(req.file.filename)

    res.status(201).json({ message: 'Certificate saved successfully' });
  } catch (error) {
    console.error('Error saving certificate:', error);
    res.status(500).json({ error: 'this is Internal server error' });
  }
})

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
