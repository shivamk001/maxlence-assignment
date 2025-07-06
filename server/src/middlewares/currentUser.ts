import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { CustomError } from "../utils/error";
import { Env } from "../utils/env";

const currentUser = (req: Request, res: Response, next: NextFunction) =>{
    let secret=Env.get('JWT_KEY');
    console.log('session:', req.session, secret);
    
    let {jwt: jwtToken, rjwt: refreshToken} = req.session;

    if(!jwtToken){
        let err = new CustomError(401, 'Unauthorized User');
        next(err);
    }
    jwt.verify(jwtToken, secret, (err: any, user: any)=>{
        if(err && err.name=='TokenExpireError'){
            if(!refreshToken){
                return res.sendStatus(403);
            }
            
            // verify refresh token
            jwt.verify(refreshToken, secret, (err: any, user: any)=>{
                if(err){
                    return res.sendStatus(403);
                }

                // if user exists
                if(user){
                    console.log('NEW ACCESS TOKEN CURRENT USER:', user);
                    // generate access token
                    const newToken=jwt.sign({
                        id: user.id,
                        email: user.email,
                        role: user.role,
                        userName: user.userName
                    }, process.env.JWT_KEY!, {expiresIn: '15m'});

                    req.session={
                        jwt: newToken,
                        rwjt: refreshToken
                    }

                    req.currentUser=user;
                    next();
                }
                else {
                    let err = new CustomError(401, 'Unauthorized User');
                    next(err);
                }   
            })
        }

        if(user){
            console.log('CURRENT USER:', user);
            req.currentUser = user;
            next();
        }
        else {
            let err = new CustomError(401, 'Unauthorized User');
            next(err);
        }   
    });

    


    
}

export default currentUser;