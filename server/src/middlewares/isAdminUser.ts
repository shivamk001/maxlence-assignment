import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";

const isAdminUser = (req: Request, res: Response, next: NextFunction) =>{
    let user = req.currentUser;
    if(!user){
        let err = new CustomError(401, 'Unauthorized User');
        return next(err);
    }

    // Check if user is admin
    if(user.role !== 'admin'){
        let err = new CustomError(403, 'Forbidden: Admin access required');
        return next(err);
    }
    
    next();
}

export default isAdminUser;