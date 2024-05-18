const { getDocument } = require('../utilities/db_mongo');

const my_email = 'testemail.comm';
const my_password = '455411';

const userValidator = async function(req, res) {

    const result = await getDocument('users', {userName : String(req.body.userName)});
    if(result !== -1){
      res.send(JSON.stringify("user already exist"));
    }else res.send(JSON.stringify("ok"));
  
    // console.log(req.body.userName);
}

const emailsender = async function(req, res){
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'your-email@gmail.com',
            pass: 'your-password'
        }
    });

    let mailOptions = {
        from: 'your-email@gmail.com',
        to: 'recipient-email@example.com',
        subject: 'Test Email',
        text: 'This is a test email sent using Nodemailer.'
    };

    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ' + error);
    }
}

module.exports = {userValidator, emailsender};