import {getPaymentsModel}  from "../models/payments";
import { Db } from "../db";
import { CustomError } from "../utils/error";
import logger from "../utils/logger";

interface Query{
    name?: string;
    topic?: string;
    level?: string;
}

// TODO: complete this
export class PaymentsService{
    public static async getAllProblems(): Promise<any>{
        let Payments=getPaymentsModel(Db.Sequalize);
        let payments=await Payments.findAll();
        // console.log(problems); 
        return payments;
    }

    public static async getPaymentById(id: string): Promise<any>{
        let Payments=getPaymentsModel(Db.Sequalize);
        let problem=await Payments.findOne({where: {id}});
        // console.log(problem); 

        return problem;
    }
}