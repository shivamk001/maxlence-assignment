import jwt from 'jsonwebtoken';

import User, { Role } from "../models/user";
import { CustomError } from "../utils/error";
import { mailer } from "../utils/mailer";
import { Password } from '../utils/password';

export class AuthService{

    public static async signupService(email: string, userName: string, password: string): Promise<{jwt: string}>{
            const existingUser = await User.findOne({where: { email }});
    
            if(existingUser){
                throw new CustomError(401, 'Email in use'); 
            }
    
            let profileImage ='';

            let hash=await Password.hash(password);
    
            // save the user
            const user=User.build({email, userName, password: hash, role: Role.User, profileImage});
            await user.save(); 
    
            // verifyEmail
            this.sendVerificationEmail(user.id, email, userName);
    
            // generate JWT
            const userJWT=jwt.sign({
                id: user.id,
                email: user.email
            }, process.env.JWT_KEY!);

            return {
                jwt: userJWT
            }
    }

    public static async signinService(email: string, password: string): Promise<{jwt: string}>{
        const existingUser = await User.findOne({where: { email }});
        
        if(!existingUser){
            throw new CustomError(401, 'Invalid Credentials 1');
        }

        if(!existingUser.emailVerified){
            throw new CustomError(401, 'EMail not verified');
        }

        const passwordsMatch=await Password.compare( password, existingUser!.password);

        if(!passwordsMatch){
            throw new CustomError(401, 'Invalid Credentials');
        }

        //generate jwt
        const userJWT=jwt.sign({
            id: existingUser.id,
            email: existingUser.email,
        }, process.env.JWT_KEY!);

        // TODO: generate refresh token

        return {
                jwt: userJWT
        }
    }

    public static async verifyEmail(token: string): Promise<boolean>{
        let json = JSON.parse(Buffer.from(token as string, 'base64').toString('utf-8'));

        let { id, email, userName } = json;

        const existingUser = await User.findOne({where: { email, id, userName }});

        if(!existingUser){
            throw new CustomError(401, 'Unauthorized');
        }

        await existingUser.update({emailVerified: true});
        return true;
    }

    public static async sendResetPasswordMail(email: string): Promise<boolean>{
        const existingUser = await User.findOne({where: { email }});

        if(existingUser){
            throw new CustomError(401, 'Email in use'); 
        }

        // send password reset email
        let str = JSON.stringify({id: existingUser!.id, email: existingUser!.email, userName: existingUser!.userName});

        let payload = Buffer.from(str, 'utf-8').toString('base64');

        let baseUrl = process.env.BASE_URL;

        let passwordResetLink = `${baseUrl}/reset?token=${payload}`;

        let resetPasswordText = `
            Hi ${existingUser!.userName},

            Please click this link to reset your password
            ${passwordResetLink}
        `;

        let subject = 'Reset password';

        mailer(email, resetPasswordText, subject);

        return true;
    }

    public static async resetPassword(token: string, password: string): Promise<boolean>{
        let json = JSON.parse(Buffer.from(token as string, 'base64').toString('utf-8'));

        let { id, email, userName } = json;

        const existingUser = await User.findOne({where: { email, id, userName }});

        if(!existingUser){
            throw new CustomError(401, 'User does not exist');
        }

        let hash = await Password.hash(password);
        await existingUser.update({password: hash});
        return true;
    }

    public static sendVerificationEmail(id: string, email: string, userName: string){
        try{
            let str = JSON.stringify({id, email, userName});

            let payload = Buffer.from(str, 'utf-8').toString('base64');

            let baseUrl = process.env.BASE_URL;

            let emailVerificationLink = `${baseUrl}/verify?token=${payload}`;

            let verificationText = `
                Hi ${userName},

                Please click this link to verify your email
                ${emailVerificationLink}
            `;

            let subject = 'Email Verification'

            mailer(email, verificationText, subject);
        }
        catch(err){
            throw new Error('Verification Email failed');
        }
    }
}