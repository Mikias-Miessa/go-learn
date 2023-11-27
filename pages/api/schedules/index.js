import connectMongo from '../../../utils/db'
import Schedule from '../../../models/Schedule'

 const handler = async (req, res)=> {
 const {method,body,query} = req;
 const {id, days, startHour, endHour} = body;

 await connectMongo();
 
 if(method === 'POST') {
    try {
        let schedule = new Schedule({
            days, startHour, endHour
        });
       await schedule.save();
        res.json(schedule);
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
 }

 if(method === 'GET') {
    try {
        let schedules = await Schedule.find()
        res.json(schedules);
     } catch (err) {
         
         res.status(500).send('Server Error')
     }
 }

 if (method === 'DELETE') {
    try {
        await Schedule.findOneAndDelete({ _id: id })
        return res.json(id)
    } catch (err) {
        
        res.status(500).send('Server Error')
    }
 }
}

export default handler