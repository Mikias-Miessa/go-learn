import slugify from'slugify'

import userAuth from '../../../middleware/userAuth'



import connectMongo from '../../../utils/db'
import Course from '../../../models/Course'


 const handler = async (req, res)=> {
 const {method,body,query} = req;
 const {id,courseName,courseCode,duration, price,online_url} = body;
 
 await connectMongo();
 
 if(method === 'POST') {
    try {
      const slug = slugify(courseName);
       
        let course = new Course({
            courseName,slug,courseCode,duration, price,online_url
        });
       await course.save();
        res.json(course);
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
 }
 if(method === 'PUT') {

    try {
      const slug = slugify(courseName);
   
        let course = await Course.findById(id)
        if(!course){
            return res.status(400).json({
                errors: [{ msg: 'Course not found' }],
              });
        }
        course.courseName = courseName;
        course.slug = slug;
        course.duration = duration;
        course.price = price;
        course.online_url = online_url;
       await course.save();
       
       res.json(course);
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
 }
 if(method === 'GET') {
    try {
       
 
        let courses = await Course.find()
   
        res.json(courses);
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
 }


}


export default handler
// export default userAuth(handler)