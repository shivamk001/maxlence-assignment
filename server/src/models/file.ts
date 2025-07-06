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
    class File extends Model {}

    File.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
        },
        filename: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mimetype: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        data: {
            type: DataTypes.BLOB('long'), // Store binary data
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'File',
        tableName: 'files',
    }
    );
}

