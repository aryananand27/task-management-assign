import sequelize from '../config/database'
import { DataTypes, Model, Optional } from 'sequelize'
import User from './user'
import { TaskRequests } from '../types/task'

interface TaskAttributes extends TaskRequests{
     id: number;
}

const Task=sequelize.define<Model<Optional<TaskAttributes, 'id'|'status'>>>("Task",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    },
   status:{
    type:DataTypes.BOOLEAN,
    defaultValue:false
   },
   userId:{
    type:DataTypes.INTEGER,
    allowNull:false
   }
},{
    tableName:"tasks",
    timestamps:true
}
)
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Task;