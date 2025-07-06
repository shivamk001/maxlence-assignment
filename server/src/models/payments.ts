import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import { Env } from '../utils/env';
import { Db } from '../db';

enum PaymentStatus{
    PROCESSING='processing',
    PENDING='pending',
    DONE='done'
}

export interface PlantsAttrs{
    status: PaymentStatus;
    email: string;
    amount: number
}

export const getPaymentsModel=(sequelize: Sequelize)=>{

    class Payments extends Model<InferAttributes<Payments>, InferCreationAttributes<Payments>> {
        declare id: CreationOptional<number>;
        declare status: PaymentStatus;
        declare email: string;
        declare amount: number;

        // timestamps!
        // createdAt can be undefined during creation
        declare createdAt: CreationOptional<Date>;
        // updatedAt can be undefined during creation
        declare updatedAt: CreationOptional<Date>;
    }

    Payments.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            status: {
                type: new DataTypes.ENUM,
                values: [PaymentStatus.PENDING, PaymentStatus.DONE, PaymentStatus.PROCESSING],
                defaultValue: PaymentStatus.PENDING
            },
            email: {
                type: new DataTypes.STRING(128)
            },    
            amount: {
                type: new DataTypes.NUMBER
            },    
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            tableName: 'Payments',
            sequelize // passing the `sequelize` instance is required
        }
    );

    return Payments;
}

