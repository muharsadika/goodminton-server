import * as dotenv from "dotenv"
dotenv.config()

export default class Env {
  static EXPRESS_DB_TYPE: string = process.env.EXPRESS_DB_TYPE
  static EXPRESS_DB_HOST: string = process.env.EXPRESS_DB_HOST
  static EXPRESS_DB_PORT: string = process.env.EXPRESS_DB_PORT
  static EXPRESS_DB_USERNAME: string = process.env.EXPRESS_DB_USERNAME
  static EXPRESS_DB_PASSWORD: string = process.env.EXPRESS_DB_PASSWORD
  static EXPRESS_DB_NAME: string = process.env.EXPRESS_DB_NAME

  static EXPRESS_ENTITIES: string = process.env.EXPRESS_ENTITIES
  static EXPRESS_MIGRATIONS: string = process.env.EXPRESS_MIGRATIONS
  static EXPRESS_SUBSCRIBERS: string = process.env.EXPRESS_SUBSCRIBERS

  static EXPRESS_JWT_SECRET_KEY: string = process.env.EXPRESS_JWT_SECRET_KEY
  static EXPRESS_JWT_EXPIRED_TIME: number = parseInt(process.env.EXPRESS_JWT_EXPIRED_TIME)

  static EXPRESS_PORT: string = process.env.EXPRESS_PORT
}