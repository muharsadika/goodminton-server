import "reflect-metadata"
import { DataSource } from "typeorm"
// import { User } from "../entity/User"
import * as dotenv from "dotenv"
dotenv.config()

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.EXPRESS_DB_HOST,
    port: 5432,
    username: process.env.EXPRESS_DB_USERNAME,
    password: process.env.EXPRESS_DB_PASSWORD,
    database: process.env.EXPRESS_DB_NAME,
    synchronize: true,
    logging: false,
    entities: [process.env.EXPRESS_ENTITIES],
    migrations: [process.env.EXPRESS_MIGRATIONS],
    subscribers: [process.env.EXPRESS_SUBSCRIBERS],
})
