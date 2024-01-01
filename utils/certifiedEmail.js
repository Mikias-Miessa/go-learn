import nodemailer from 'nodemailer';
import followRedirects from 'follow-redirects'

const https = followRedirects.https;

export const sendEmail = async (obj) => {
  
  const { name, email, course, shareLink } = obj;
  
  

  
  try {
   


   let  msg = `
       
  <p>Dear ${name},</p>
  <p>Congratulations!</p>
 
  <p>You have sucessfully completed ${course} Training.</p>
  <div style="margin : 20px 0">
    <p>You can download your certificate using the link below</p>
    <h3>
    <a href="${shareLink}">Click Here To Download</a>
    </h3>
  <p>If you need assistance please call 0118633128</p>
 
  </div>
  <p> Best Regards,</p>
  <p> Gobeze Team.</p>
          
          `;
    const emailSubject = `Course completion for ${
      course
    } - gobeze.com`;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'traingobeze@gmail.com', // generated ethereal user
        pass: process.env.emailPassword, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Gobeze Training" <traingobeze@gmail.com>', // sender address
      to: `${email}`, // list of receivers
      subject: `${emailSubject}`, // Subject line
      text: 'msg', // plain text body
      html: msg, // html body
      // cc: 'meaza2095@gmail.com, nfeleke568@gmail.com',
    });
// luwamaddis@gmail.com --- will add these for production, later
    
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (err) {
    console.error(err);
  }
};
