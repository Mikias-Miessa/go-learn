import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



import connectMongo from '../../../utils/db'
import User from '../../../models/User'


export default async function loginUser(req, res){
 const { email, password} = req.body;
 try {
    console.log('connecting...')
    await connectMongo();
    console.log('connected!')
    console.log('loging env varaibles')
    console.log('jwtSecret:'+process.env.jwtSecret)
    console.log('emailPassword:'+process.env.emailPassword)
    console.log('ATLAS_MONGO_URI:'+process.env.ATLAS_MONGO_URI)
    console.log('MONGO_URI:'+process.env.MONGO_URI)
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: 'Invalid Credentials' }],
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
 
    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: 'Invalid Credentials' }],
      });
    }

    //Return jsonwebtoken :to login the users right away when they register
    const payload = {
      user: {
        id: user.id,
      },
    };
// console.log('secrret' + process.env.jwtSecret)
    jwt.sign(
      payload,
      process.env.jwtSecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.json({ token,user });
      }
    );
 } catch (err) {
     console.log(err);
     res.status(500).send('Server Error')
 }

}
