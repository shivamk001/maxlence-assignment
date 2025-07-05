import nodemailer from 'nodemailer';

export const mailer = (email: string, text: string, subject: string) =>{
    try{
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '',
                pass: ''
            }
        });
    
        let mailOptions = {
            from: 'Shivam Kesarwani',
            to: email,
            subject: subject,
            text: text
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
    catch(err){

    }
}