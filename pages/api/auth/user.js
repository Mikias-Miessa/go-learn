
import userAuth from '../../../middleware/userAuth'



import connectMongo from '../../../utils/db'
import User from '../../../models/User'


 const getUser = async (req, res)=> {
//  
//  
 try {
    
    await connectMongo();
    
    let user = await User.findById(req.user.id).select('-password');
   
    res.json(user);
 } catch (err) {
    // 
     res.status(500).send('Server Error')
 }

}

export default userAuth(getUser)