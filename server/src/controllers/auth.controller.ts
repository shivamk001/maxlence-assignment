import { NextFunction, Request, Response } from "express";

import { AuthService } from "../services/authService";
import { CustomError } from "../utils/error";
import { validationResult } from "express-validator";

export class AuthController{
    public static async signin(req: Request, res: Response, next: NextFunction){
        try{
            const error=validationResult(req);

            if(!error.isEmpty()){
                throw new CustomError(400, error.array().join(' '));
            }

            const { email, password } = req.body;

            let result = await AuthService.signinService(email, password);

            if(result){
                // store it on session object
                // TODO: both not shown
                req.session={
                    jwt: result.jwt,
                    // rjwt: result.rjwt
                }
                
                res.status(200).send('Login Successful');
            }
        }catch(err){
            next(err);
        } 
    }

    public static async signup(req: Request, res: Response, next: NextFunction){
        try{
            const error=validationResult(req);

            if(!error.isEmpty()){
                throw new CustomError(400, error.array().join(' '));
            }

            const { email, userName, password }=req.body;

            let result = await AuthService.signupService(email, userName, password);

            if(result){
                req.session={
                    jwt: result.jwt,
                    rjwt: result.rjwt
                };
                res.status(201).send('Signup Successful');
                return;
            }
            else{
                res.status(401).send('Bad Request');
            }
        }
        catch(err){
            next(err);
        }
    }

    public static async verifyEmail(req: Request, res: Response, next: NextFunction){
        try{
            const error=validationResult(req);
            let { token } = req.query;

            let result = await AuthService.verifyEmail(token as string);

            if(result){
                res.send('EMail Verified');
                return;
            }
            res.status(401).send('Unauthorized User');
        }
        catch(err){
            next(err);
        }
    }

    public static async sendResetPasswordMail(req: Request, res: Response, next: NextFunction){
        try{
            const error=validationResult(req);

            if(!error.isEmpty()){
                throw new CustomError(400, error.array().join(' '));
            }

            let { email } = req.body;

            let result = await AuthService.sendResetPasswordMail(email);

            if(result){
                res.send('EMail Verified');
                return;
            }
            res.status(401).send('Unauthorized User');
        }
        catch(err){
            next(err);
        }

    }

    public static async resetPassword(req: Request, res: Response, next: NextFunction){
        try{
            const error=validationResult(req);

            if(!error.isEmpty()){
                throw new CustomError(400, error.array().join(' '));
            }

            let { token } = req.query;
            let { password } = req.body;

            let result = await AuthService.resetPassword(token as string, password);

            if(result){
                res.send('Password Reset');
                return;
            }
            res.status(401).send('Unauthorized User');
        }
        catch(err){
            next(err);
        }

    }

    public static async signout(req: Request, res: Response){
        req.session=null;
        res.send({});
    }

    public static async currentUser(req: Request, res: Response){
        res.send(req.currentUser);
    }

    public static async getAllUsers(req: Request, res: Response, next: NextFunction){
        try{
            let result = await AuthService.getAllUsers();

            if(result){
                res.send(result);
                return;
            }
            res.status(404).send('No Users Found');
        }
        catch(err){
            next(err);
        }
    }
}