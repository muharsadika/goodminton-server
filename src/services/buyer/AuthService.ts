import { Repository } from "typeorm"
import { Buyer } from "../../database/entities/BuyerEntity"
import { AppDataSource } from "../../data-source"
import { Request, Response } from "express"
import { buyerRegisterSchema, buyerLoginSchema } from "../../utils/validator/AuthValidator"
import * as bycrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import Env from "../../utils/variable/Env"



export default new class AuthService {
  private readonly authRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      const { error } = buyerRegisterSchema.validate(body)
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

      const { error } = buyerLoginSchema.validate(body)
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

      const token = await jwt.sign({ id: isCheckUsername.id }, Env.EXPRESS_JWT_SECRET_KEY, {
        expiresIn: Env.EXPRESS_JWT_EXPIRED_TIME
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