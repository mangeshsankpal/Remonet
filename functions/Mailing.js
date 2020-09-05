module.exports = {

    mailing: function (email) {
        const nodemailer = require("nodemailer");

        
          // create reusable transporter object using the default SMTP transport
          let transporter = nodemailer.createTransport({
            service: 'gmail', // true for 465, false for other ports
            auth: {
              user: 'dummy@gmail.com', // generated ethereal user
              pass: 'dummy@' // generated ethereal password
            }
          });
        
          // setup email data with unicode symbols
          let mailOptions = {
            from: 'dummy@gmail.com', // sender address
            to: 'dummy@gmail.com', // list of receivers
            subject: "Request for user registration", // Subject line
            text: `User email : `+email+`\n Requesting for approval!!!`, // plain text body
            html: "<a href='https://dummy/users/userManagement'>Verify</a> " // html body
          };
        
          // send mail with defined transport object
          transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });
        
          
        }
        
      

        
    }



