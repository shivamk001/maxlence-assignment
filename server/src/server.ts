declare global{
    namespace Express {
        interface Request {
            session: any;
            currentUser: any;
        }
    }
}

import app from "./app";
import logger from "./utils/logger";
import { Env } from "./utils/env";
import {Db} from "./db";

let startServer = async () =>{

    if(!process.env.USE_SECRET)
        Env.init();

    Db.init();

    try {
        Db.Sequalize.authenticate();
        await Db.Sequalize.sync({ alter: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }


    let port = Env.get('APP_PORT');
    app.listen(port, ()=>{
        console.log('App started', port);
    });
}

startServer()
.then(()=>{
    logger.info('Server started!');
})
.catch((err)=>{
    logger.info('Error starting server', err);
})