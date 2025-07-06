import nodemailer from 'nodemailer';
import { Env } from './env';
import logger from './logger';

export const mailer = (email: string, text: string, subject: string) =>{
    try{
        let user=Env.get('MAILER_USER');
        let pass=Env.get('MAILER_PASS');
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: user,
                pass: pass
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
                logger.info(error);
            } else {
                logger.info('Email sent: ' + info.response);
            }
        });
    }
    catch(err){

    }
}