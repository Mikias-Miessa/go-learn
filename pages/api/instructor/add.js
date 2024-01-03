import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { createRouter } from 'next-connect';
import connectMongo from '../../../utils/db';
import Certificate from '../../../models/Certificate';

import { join } from 'path'; 
export const config = {
  api: {
    bodyParser: false,
  },
};


// const upload = multer({ storage });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = join(process.cwd(), 'public'); // Use process.cwd() to get the current working directory
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    // const uniqueName = req.body.certificateId
    // cb(null, uniqueName)
    cb(null, file.originalname);
  }
})

const upload = multer({ storage: storage })

const router = createRouter();

router
  .use(async (req, res, next) => {
    await connectMongo();
    await next(); // call next in chain
  })
//   .use(upload.single('pdf'))
  
  .post( async (req, res) => {
    try {
    // if (!req.file) {
    //     // No file was provided in the request
    //     return res.status(400).json({
    //       errors: [{ msg: 'No file uploaded' }],
    //     });
    //   }
      const { name, course, shareLink, date, certificateId, } = req.body;
      
      console.log('it works ' + name);
    //   console.log(req.file.filename)

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
