import { NextFunction, Request, Response } from "express";
import { PaymentsService } from "../services/paymentsService";

export class PaymentsController{
    public static async getAllPayments(req: Request, res: Response, next: NextFunction){
        try{
            let problems = await PaymentsService.getAllProblems();
            res.json({
                ...problems
            });
        }
        catch(err){
            next(err);
        }
    }

    public static async getPayment(req: Request, res: Response, next: NextFunction){
        try{
            let {id} = req.params;

            let problem = await PaymentsService.getPaymentById(id);

            res.send(problem);
        }
        catch(err){
            next(err);
        }
    }
}