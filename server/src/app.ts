import express, {NextFunction, Request, Response} from "express";
import bodyParser from "body-parser";
import cookieSession from 'cookie-session';
import cors from 'cors';
import AuthRouter from "./routes/auth";
import PaymentsRouter from './routes/payments';
import logger from "./utils/logger";
import { Env } from "./utils/env";
import errorHandlingMiddleware from "./middlewares/errorHandler";

const app = express();

const allowedOrigins = ['http://localhost:5173', 'http://127.0.0.1:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        } else {
        callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));

app.use(bodyParser.json());

app.use(cookieSession({
    signed: false,
    secure: process.env['NODE_ENV']=='production',
    // domain: process.env.COOKIE_DOMAIN
}))

app.use((req: Request, res: Response, next: NextFunction)=>{
    logger.info(`New Request: ${req.url}, ${req.method}, ${JSON.stringify(req.body)}`);
    next();
})

app.get('/uptime', (req: Request, res: Response)=>{
    res.send('Up and running');
})

app.use(AuthRouter);

app.use(PaymentsRouter);

app.use(errorHandlingMiddleware);

export default app; 
