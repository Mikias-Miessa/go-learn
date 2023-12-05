
import {createRouter} from 'next-connect'
import connectMongo from '../../../utils/db'
import userAuth from '../../../middleware/userAuth'
import User from '../../../models/User'




  const router = createRouter();

  router
  .use(async (req, res, next) => {
    
    await connectMongo();
    
    await next(); // call next in chain
   
  }) .get(async (req, res) => {

    try {
   
      const users = await User.find({ role: 'user' }).sort('-createdAt');

     
       res.json(users);
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
  }).put(async (req, res) => {
    
    try {
      const {id, Name, Email, Phone} = req.body;
   
        let user = await User.findById(id)
        if(!user){
            return res.status(400).json({
                errors: [{ msg: 'User not found' }],
              });
        }
        user.name = Name;
        user.email = Email;
        user.phone = Phone;
       
       await user.save();
       
       res.json(user);
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
  }).post(async (req, res) => {
   const {mehtod,body} = req;
 const {name, email, phone, password,role} = body;
 try {
    
    await connectMongo();
    
    
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: 'User already exists' }],
      });
    }

    user = new User({
      name,
      email,
      phone,
      password,
      role
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);
    //Save to MongoDB
    await user.save();
    
   res.json(user);
   console.log('user added successfully')
 } catch (err) {
     
     res.status(500).send('Server')
 }
  }).delete(async (req, res) => {
  const { userid } = req.query; // Use req.query to get parameters from the URL
console.log('this is the user Id : ', userid)
  try {
    if (!userid) {
      return res.status(400).json({
        errors: [{ msg: 'Missing userid in the request parameters' }],
      });
    }

    await User.findOneAndDelete({ _id: userid });
    return res.json({ userid });
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