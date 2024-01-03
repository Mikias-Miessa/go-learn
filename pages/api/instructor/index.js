import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { createRouter } from 'next-connect';
// import slugify from 'slugify';
import connectMongo from '../../../utils/db';
// import userAuth from '../../../middleware/userAuth';
import Class from '../../../models/Class';
import Instructor from '../../../models/Instructor';
import { join } from 'path'; 
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
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const uploadFolder = join(process.cwd(), 'public'); // Use process.cwd() to get the current working directory
//     cb(null, uploadFolder);
//   },
//   filename: function (req, file, cb) {
//     // const uniqueName = req.body.certificateId
//     // cb(null, uniqueName)
//     cb(null, file.originalname);
//   }
// })

// const upload = multer({ storage: storage })
const upload = multer({ storage });

const router = createRouter();

router
  .use(async (req, res, next) => {
    await connectMongo();
    await next(); // call next in chain
  })
  .use(upload.single('image'))
   .post(async (req, res) => {
  try {
    console.log('Body:', req.body);
    console.log('file:', req.file);
    const imagePath = '/api/files/images/' + req.file.filename;
    const { name, email, qualifications, phone } = req.body
    
    let newInstructor = new Instructor({
        name,
        email,
        qualifications,
        phone,
        imagePath : imagePath,
      });
      await newInstructor.save();

    res.json(newInstructor);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
})
  .delete(async (req, res) => {
    const { id } = req.query;
    console.log('id from the backnd', id);
    try {
      if (!id) {
        return res.status(400).json({
          errors: [{ msg: 'missing class id in the request parameter' }],
        });
      }
      await Class.findByIdAndDelete({ _id: id });
      return res.json({id})
    } catch (e) {
      console.log(e)
      res.status(500).send('Server Error');
    }
  })
    .get(async (req, res) => {
      
        try {
            let instructors = await Instructor.find();
           return res.json(instructors)
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
       
  } )

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
