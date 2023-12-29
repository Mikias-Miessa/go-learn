import { createRouter } from 'next-connect';
import mongoose from 'mongoose';
import Grid from 'gridfs-stream';
import connectMongo from '../../../../utils/db';

let gfs;

const router = createRouter();

router.use(async (req, res, next) => {
  try {
    await connectMongo();

    // Connect to the 'pdfs' collection in GridFS
    gfs = Grid(mongoose.connection.db, mongoose.mongo);
    gfs.collection('pdfs');

    next(); // Call next in the chain
  } catch (err) {
    console.error(err);
    res.status(500).end('Server Error');
  }
});

router.get(async (req, res) => {
  const { query } = req;

  try {
    // Find the file in the 'pdfs' collection based on the filename
    // gfs.files.findOne({ filename: query.filename }, (err, file) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).json({ err: 'Internal Server Error' });
    //   }

    //   // Check if the file exists
    //   if (!file || file.length === 0) {
    //     return res.status(404).json({
    //       err: 'No file exists',
    //     });
    //   }

    //   console.log(file)
    //   // Set the appropriate headers for a PDF file
    //   res.setHeader('Content-Type', 'application/pdf');
    //   res.setHeader('Content-Disposition', `inline; filename="${file.filename}"`);

    //   // Create a read stream from GridFS and pipe it to the response
    //   const readstream = gfs.createReadStream(file.filename);
    //   readstream.pipe(res);
    // });
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
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

export default router.handler({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Server Error!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
});
