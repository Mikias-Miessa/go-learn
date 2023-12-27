import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import { createRouter } from 'next-connect';
import slugify from 'slugify';
import connectMongo from '../../../utils/db';
import Certificate from '../../../models/Certificate';

export const config = {
  api: {
    bodyParser: false,
  },
};

let storage = new GridFsStorage({
  url: process.env.ATLAS_MONGO_URI,
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg','application/pdf'];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-gobeze-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: 'pdfs',
      filename: `${Date.now()}-gobeze-${file.originalname}`,
    };
  },
});

const upload = multer({ storage });

const handler = createRouter();

handler.post(upload.single('pdf'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // You can perform additional logic, such as saving metadata to a database
    const certificate = new Certificate({
      filename: req.file.filename,
      originalname: req.file.originalname,
      // Add other metadata as needed
    });

    await certificate.save();

    res.status(200).json({ file: req.file });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

handler.get(async (req, res) => {
  try {
    const files = await gfs.files.find().toArray();

    if (!files || files.length === 0) {
      return res.status(404).json({ msg: 'No files found' });
    }

    res.status(200).json({ files });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

handler.get('/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });

    if (!file) {
      return res.status(404).json({ msg: 'File not found' });
    }

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server Error' });
  }
});

export default handler;

// create a handler from router with custom
// onError and onNoMatch
// export default router.handler({
//   onError: (err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).end('Server Error!');
//   },
//   onNoMatch: (req, res) => {
//     res.status(404).end('Page is not found');
//   },
// });
