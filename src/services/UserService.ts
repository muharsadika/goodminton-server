import { Repository } from "typeorm"
import { User } from "../database/entities/UserEntity"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { loginSchema, registerSchema } from "../utils/validator/AuthValidator"
import * as bycrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import * as dotenv from "dotenv"
dotenv.config()



export default new class UserService {
  private readonly authRepository: Repository<User> = AppDataSource.getRepository(User)

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      const { error } = registerSchema.validate(body)
      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "REGISTER FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      const isCheckEmail = await this.authRepository.findOne({
        where: { email: body.email }
      })
      const isCheckUsername = await this.authRepository.findOne({
        where: { username: body.username }
      })
      if (isCheckEmail || isCheckUsername) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "EMAIL OR USERNAME ALREADY EXISTS, TRY ANOTHER ONE",
          })
      }

      const hashedPassword = await bycrypt.hash(body.password, 10)
      const userData = this.authRepository.create({
        email: body.email,
        password: hashedPassword,
        fullname: body.fullname,
        username: body.username,
        address: null,
        phone: null,
        profile_picture: null,
      })
      const userCreated = await this.authRepository.save(userData)
      return res
        .status(201)
        .json({
          code: 201,
          message: "USER CREATED",
          data: userCreated
        })

    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
          error: error
        })
    }
  }


  async login(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      const { error } = loginSchema.validate(body)
      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "LOGIN FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      const isCheckUsername = await this.authRepository.findOne({
        where: { username: body.username }
      })
      const isCheckPassword = await bycrypt.compare(
        body.password,
        isCheckUsername.password
      )
      if (!isCheckUsername || !isCheckPassword) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "USERNAME OR PASSWORD NOT WRONG, TRY AGAIN",
          })
      }

      const token = await jwt.sign({ id: isCheckUsername.id }, process.env.EXPRESS_JWT_SECRET, {
        expiresIn: "500000"
      })
      return res
        .status(200)
        .json({
          code: 200,
          message: "LOGIN SUCCESS",
          token: token
        })

    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
          error: error
        })
    }
  }
}