// get all problems
import express, { Request, Response, NextFunction } from 'express';
import { PaymentsController } from '../controllers/payments.controller';
import logger from '../utils/logger';

const router = express.Router();

router.use((req: Request, res: Response, next: NextFunction)=>{
    logger.info(`Problems Request: ${req.url}, ${req.method}, ${JSON.stringify(req.body)}`);
    next();
})

router.get('/payments/all', PaymentsController.getAllPayments);

router.get('/payments/:id', PaymentsController.getPayment);

export default router;
