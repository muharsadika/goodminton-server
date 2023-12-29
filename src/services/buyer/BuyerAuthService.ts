import { Repository } from "typeorm"
import { Buyer } from "../../../database/entities/BuyerEntity"
import { AppDataSource } from "../../data-source"
import { Request, Response } from "express"
import { buyerRegisterSchema, buyerLoginSchema } from "../../utils/validator/AuthValidator"
import * as bycrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import Env from "../../utils/variable/Env"
import { v4 as uuidv4 } from 'uuid'



export default new class AuthService {
  private readonly authRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)

  async registerBuyer(req: Request, res: Response): Promise<Response> {
    try {
      const {
        fullname,
        username,
        email,
        password,
      } = req.body

      const { error, value } = buyerRegisterSchema.validate({
        fullname,
        username,
        email,
        password
      })

      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "REGISTER FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      const usernameFind = await this.authRepository.findOne({
        where: { username: value.username }
      })
      const emailFind = await this.authRepository.findOne({
        where: { email: value.email }
      })
      if (usernameFind || emailFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "USERNAME OR EMAIL ALREADY EXISTS, TRY ANOTHER ONE",
          })
      }

      const hashedPassword = await bycrypt.hash(value.password, 10)
      const userData = this.authRepository.create({
        id: uuidv4(),
        email: value.email,
        password: hashedPassword,
        fullname: value.fullname,
        username: value.username,
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


  async loginBuyer(req: Request, res: Response): Promise<Response> {
    try {
      const {
        username,
        password
      } = req.body

      const { error, value } = buyerLoginSchema.validate({
        username,
        password
      })

      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "LOGIN FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      const usernameFind = await this.authRepository.findOne({
        where: { username: value.username }
      })
      const passwordFind = await bycrypt.compare(
        value.password,
        usernameFind.password
      )

      if (!usernameFind || !passwordFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "USERNAME OR PASSWORD NOT WRONG, TRY AGAIN",
          })
      }

      const token = await jwt.sign({ id: usernameFind.id }, Env.EXPRESS_JWT_SECRET_KEY, {
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