import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export interface PlantsAttrs{
    common_name: string;
    scientific_name: string;
    family: string;
    location: string;
    status: string;
    image: string;
}

const sequelize = new Sequelize('mysql://root:asd123@localhost:3306/mydb');

class Plant extends Model<InferAttributes<Plant>, InferCreationAttributes<Plant>> {
    declare id: CreationOptional<number>;
    declare common_name: string;
    declare scientific_name: string;
    declare family: string;
    declare location: string;
    declare status: string;
    declare image: string;

    // timestamps!
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

Plant.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        common_name: {
            type: new DataTypes.STRING(128)
        },
        scientific_name: {
            type: new DataTypes.STRING(128)
        },    
        family: {
            type: new DataTypes.STRING(128)
        },    
        location: {
            type: new DataTypes.STRING(128)
        },    
        status: {
            type: new DataTypes.STRING(128)
        },          
        image: {
            type: new DataTypes.STRING(128)
        },    
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'plants',
        sequelize // passing the `sequelize` instance is required
    }
);

export default Plant;