import "reflect-metadata"
import { DataSource } from "typeorm"
import Env from "./utils/variable/Env"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Env.EXPRESS_DB_HOST,
    port: 5432,
    username: Env.EXPRESS_DB_USERNAME,
    password: Env.EXPRESS_DB_PASSWORD,
    database: Env.EXPRESS_DB_NAME,
    synchronize: true,
    logging: false,
    entities: [Env.EXPRESS_ENTITIES],
    migrations: [Env.EXPRESS_MIGRATIONS],
    subscribers: [Env.EXPRESS_SUBSCRIBERS],
})
