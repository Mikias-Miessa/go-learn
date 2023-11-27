
import {createRouter} from 'next-connect'
import slugify from'slugify'
import Grid from 'gridfs-stream'
import connectMongo from '../../../../utils/db'
import userAuth from '../../../../middleware/userAuth'
import Class from '../../../../models/Class'
import Course from '../../../../models/Course'
import Student from '../../../../models/Student'
import Payment from '../../../../models/Payment'


  const router = createRouter();

  router
  .use(async (req, res, next) => {
    
    await connectMongo();
    
    await next(); // call next in chain
   
  })
  .put(async (req, res) => {
    // 
    const {query,body} = req;
 
    
    
    try {
        const { remark} = body;
        let updatedStudent = await Student.findById(query.id);
        if(!updatedStudent){
          return res.status(400).json({
            errors: [{ msg: 'Student not found' }],
          });
        }
            
        updatedStudent.contacted = true;
        updatedStudent.remark = remark;
       
        
       await updatedStudent.save()

       let populatedUpdatedStudent = await Student.findById(query.id).populate('course payment')

        res.json(populatedUpdatedStudent);
     } catch (err) {
         
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

 
