import "reflect-metadata"
import { DataSource } from "typeorm"
import Env from "./utils/variable/Env"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: Env.EXPRESS_NEON_HOST,
    port: 5432,
    username: Env.EXPRESS_NEON_USERNAME,
    password: Env.EXPRESS_NEON_PASSWORD,
    database: Env.EXPRESS_NEON_NAME,
    synchronize: true,
    logging: false,
    entities: [Env.EXPRESS_ENTITIES],
    migrations: [Env.EXPRESS_MIGRATIONS],
    subscribers: [Env.EXPRESS_SUBSCRIBERS],
    ssl: true
})
