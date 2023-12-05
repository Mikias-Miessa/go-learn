import connectMongo from '../../../utils/db'
import User from '../../../models/User'

 const handler = async (req, res)=> {
 const {method,body,query} = req;
 const {userid} = body;

 await connectMongo();

     if (method === 'DELETE') {
     console.log('this is userid: ', userid)
    try {
        await User.findOneAndDelete({ _id: userid })
        return res.json(id)
    } catch (err) {
        
        res.status(500).send('Server Error')
    }
 }
}

export default handler