
import {createRouter} from 'next-connect'
import connectMongo from '../../../utils/db'
import userAuth from '../../../middleware/userAuth'
import Ad from '../../../models/User'




  const router = createRouter();

  router
  .use(async (req, res, next) => {
    
    await connectMongo();
    
    await next(); // call next in chain
   
  }) .get(async (req, res) => {

    try {
   
      const ad = await Ad.find({ status: 'active' }).sort('-createdAt');

     
       res.json(ad);
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
  }).put(async (req, res) => {
    
    try {
      const {_id, status} = req.body;
   
        let ad = await Ad.findById(_id)
        if(!ad){
            return res.status(400).json({
                errors: [{ msg: 'Ad not found' }],
              });
        }
        ad.status = status;
       
       await ad.save();
       
       res.json(ad);
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
  }).post(async (req, res) => {
   const {mehtod,body} = req;
 const {description, link, title, status} = body;
 try {
    
    await connectMongo();
    
    
    // let user = await User.findOne({ $or: [{ email }, { phone }] });
    // if (user) {
    //   return res.status(400).json({
    //     errors: [{ msg: 'User already exists' }],
    //   });
    // }

   let ad = new Ad({
      description,
      link,
      title,
      status,
   });
     
     await ad.save()

    
   res.json(ad);
   console.log('Ad added successfully')
 } catch (err) {
     
     res.status(500).send('Server')
 }
  }).delete(async (req, res) => {
  const { _id } = req.query; // Use req.query to get parameters from the URL
  try {
    if (!_id) {
      return res.status(400).json({
        errors: [{ msg: 'Missing userid in the request parameters' }],
      });
    }

    await Ad.findOneAndDelete({ _id: _id });
    return res.json({ _id });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
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