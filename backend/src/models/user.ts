import sequelize from '../config/database'
import { DataTypes, Model,Optional } from 'sequelize'
import { AuthRequest } from '../types/user';

interface UserAttributes extends AuthRequest {
    id:number;
    refreshToken:string|null;
}

const User=sequelize.define<Model<Optional<UserAttributes,'id'|'refreshToken'>>>("User",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    refreshToken:{
        type:DataTypes.TEXT,
        allowNull:true
    },
},{
    tableName:"users",
    timestamps:true
}
)

export default User;