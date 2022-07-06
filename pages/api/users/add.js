import connectMongo from '../../../utils/db'
import User from '../../../models/User'
import bcrypt from 'bcryptjs';


export default async function addUser(req, res){

  const {mehtod,body} = req;
 const {name, email, phone, password,role} = body;
 try {
    console.log('connecting...')
    await connectMongo();
    console.log('connected!')
    console.log('creating user...')
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
    console.log('created user')
    res.json(user);
 } catch (err) {
     console.log(err);
     res.status(500).send('Server')
 }

}