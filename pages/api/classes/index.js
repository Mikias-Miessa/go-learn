import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import {createRouter} from 'next-connect'

import connectMongo from '../../../utils/db'
import userAuth from '../../../middleware/userAuth'
import Class from '../../../models/Class'
import Course from '../../../models/Course'


export const config ={
    api:{
        bodyParser: false 
    }
}

let storage = new GridFsStorage({
    url: process.env.ATLAS_MONGO_URI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
      const match = ["image/png", "image/jpeg"];
      if (match.indexOf(file.mimetype) === -1) {
        const filename = `${Date.now()}-gobeze-${file.originalname}`;
        return filename;
      }
console.log('got here')
      return {
        bucketName: 'files',
        filename: `${Date.now()}-gobeze-${file.originalname}`
      };
    }
  });

  const upload = multer({ storage });


  const router = createRouter();

  router
  .use(async (req, res, next) => {
    console.log('connecting...')
    await connectMongo();
    console.log('connected!')
    await next(); // call next in chain
   
  })
  .use(upload.single('thumbnail'))
  .post(async (req, res) => {
    try {
        const { course,description,schedule,start_date, instructor,remark } = req.body;

        const API =
        process.env.NODE_ENV == 'production'
          ? 'https://gobeze.com'
          : 'http://localhost:3000';

      const thumbnailImage =  API + '/api/files/images/' + req.file.filename;
console.log(thumbnailImage)
        let newClass = new Class({
            course,description,schedule,start_date,thumbnail:thumbnailImage, instructor,remark
        });
       await newClass.save()

       let populatedNewClass = await Class.findById(newClass._id).populate('course')

        res.json(populatedNewClass);
     } catch (err) {
         console.log(err);
         res.status(500).send('Server Error')
     }
  })

// create a handler from router with custom
// onError and onNoMatch
export default router.handler({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Server Error!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
});

 


// export default handler;
// export default userAuth(handler)