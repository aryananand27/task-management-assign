import { Sequelize } from "sequelize";
import dotenv from 'dotenv'

dotenv.config();

const {DB_USER,DB_PASSWORD,DB_NAME,DB_HOST,DB_PORT}=process.env;


if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
  throw new Error("Missing database configuration in .env file");
}

const sequelize=new Sequelize(
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    {
        host:DB_HOST,
        port:Number(DB_PORT),
        dialect:"postgres",
        logging:false
    }
)
export default sequelize