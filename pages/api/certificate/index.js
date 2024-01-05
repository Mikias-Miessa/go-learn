import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { createRouter } from 'next-connect';
import slugify from 'slugify';
import connectMongo from '../../../utils/db';
// import userAuth from '../../../middleware/userAuth';
import Certificate from '../../../models/Certificate';
import Student from '../../../models/Student';
// import Course from '../../../models/Course';
import { sendEmail } from '../../../utils/certifiedEmail';
export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = new GridFsStorage({
  url: process.env.ATLAS_MONGO_URI,
  file: (req, file) => {
    const match = ['image/png', 'application/pdf'];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = file.originalname;
      return { filename };
    }

    if (file.mimetype === 'image/png') {
      return {
        bucketName: 'files', // Use the "files" bucket for images
        filename: file.originalname,
      };
    }

    // Use the "pdfs" bucket for PDFs
    return {
      bucketName: 'pdfs',
      filename: file.originalname,
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
   .use(upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'image', maxCount: 1 }]))
  
  .post( async (req, res) => {
    try {
    if (!req.files|| !req.files.pdf|| !req.files.image  ) {
        // No file was provided in the request
        return res.status(400).json({
          errors: [{ msg: 'PDF and image files are required' }],
        });
      }
      const { name, course, shareLink, date, certificateId, studentId } = req.body;
      const pdfFile = '/api/files/pdf/' + certificateId;
      const imageFile = '/api/files/images/' + certificateId;
      let newCertificate = new Certificate({
        name,
        course,
        shareLink,
        date,
        certificateId,
        pdfFile,
        imageFile
      });
      await newCertificate.save();

      try {
        const updatedStudent = await Student.findOneAndUpdate(
          { _id: studentId },
          { $set: { status: 'certified' } },
          { new: true } // Return the modified document
           );
      if (!updatedStudent) {
      console.log('Student not found.');
      } else {
        sendEmail(req.body);
      console.log('Student updated successfully:', updatedStudent);
        }
        
      } catch (error) {
        console.error('Error updating student:', error.message);
      }
      
      
      console.log('it works ' + name);
      // console.log(req.file.filename)

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
