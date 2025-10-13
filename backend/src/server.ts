import app from './app'
import dotenv from 'dotenv';
import sequelize from './config/database';

dotenv.config();
const PORT=process.env.PORT
sequelize.authenticate().then(()=>{console.log("We have successfully connected the Database")}).catch((err:Error)=>{console.log("Error has occured in connection to Database",err.message)})

app.listen(PORT,(err:Error|undefined)=>{
 if(err){
    console.log("Error in initializing our server", err.message)
    return;
}
console.log(`Server is Listening on PORT number: ${PORT}`);
})