import { createRouter } from 'next-connect';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream'
import connectMongo from '../../../../utils/db'


let gfs;



const router = createRouter();

router
  .use(async (req, res, next) => {
    
    await connectMongo();
    
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
   gfs.collection('files');
    
       next(); // call next in chain
   
  })
  .get(async (req, res) => {
    const {query} = req;

    try {
     
        gfs.files.findOne({ filename: query.filename }, (err, file) => {
            //check if file
            if (!file || file.length === 0) {
              return res.status(404).json({
                err: 'no file exist',
              });
            }
      
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        });
        // res.send('wii do')
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
  })

export default router.handler({
    onError: (err, req, res, next) => {
      console.error(err.stack);
      res.status(500).end("Server Error!");
    },
    onNoMatch: (req, res) => {
      res.status(404).end("Page is not found");
    },
  });