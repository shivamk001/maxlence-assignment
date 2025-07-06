import { Env } from "./utils/env";
import { Sequelize } from "sequelize";

export class Db{
    static isInitialized = false;
    static Sequalize: Sequelize;

    public static init(){
        if(Db.isInitialized){
            return;
        }
        let db=Env.get('MYSQL_DATABASE');
        let username=Env.get('MYSQL_USERNAME');
        let password=Env.get('MYSQL_PASSWORD');
        let host=Env.get('MYSQL_HOST');
        console.log(db, username, password, host);
        Db.Sequalize=new Sequelize(
                db, 
                username, 
                password, 
                {
                    host: host,
                    dialect: 'mysql'
                }
            );
        Db.isInitialized=true;
    }
}