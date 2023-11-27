import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import connectMongo from '../../../utils/db';
import User from '../../../models/User';
import Payment from '../../../models/Payment';

export default async function reference(req, res) {
  //  const { email, password} = req.body;
  try {
    
    await connectMongo();
    

    // let payments = await Payment.updateMany({confirmed : true}, { $set: { references: [] } });
    let payments = await Payment.find();
    payments.forEach(async (payment) => {
      if (payment.reference) {
        
        await Payment.updateOne(
          { confirmed: true },
          { $set: { references: [payment.reference] } }
        );

        // payment.references = [payment.reference];
        // await payment.save();
      }
    });
    res.json({ msg: 'Reference fixed' });
  } catch (err) {
    
    res.status(500).send('Server Error');
  }
}
