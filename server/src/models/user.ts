import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export enum Role{
    User='user',
    Admin='admin'
}

// interface UserAttrs{
//     email: string;
//     username: string;
//     password: string;
//     profileImage: string;
//     role: Role;
// }

const sequelize = new Sequelize('mysql://root:asd123@localhost:3306/mydb');

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<string>;
    declare userName: string;
    declare email: string;
    declare password: string;
    declare profileImage: string;
    declare role: Role;
    declare emailVerified: CreationOptional<boolean>;

    // timestamps!
    // createdAt can be undefined during creation
    declare createdAt: CreationOptional<Date>;
    // updatedAt can be undefined during creation
    declare updatedAt: CreationOptional<Date>;
}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        userName: {
            type: new DataTypes.STRING(128)
        },
        email: {
            type: new DataTypes.STRING(128)
        },    
        password: {
            type: new DataTypes.STRING(128)
        },    
        profileImage: {
            type: new DataTypes.STRING(128),
            allowNull: true
        },    
        role: {
            type: DataTypes.ENUM,
            values: [Role.Admin, Role.User],
            defaultValue: Role.User
        },
        emailVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'users',
        sequelize // passing the `sequelize` instance is required
    }
);

export default User;