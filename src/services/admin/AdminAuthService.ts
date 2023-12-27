import { Repository } from "typeorm"
import { Admin } from "../../database/entities/AdminEntity"
import { AppDataSource } from "../../data-source"
import { Request, Response } from "express"
import { adminRegisterSchema, adminLoginSchema } from "../../utils/validator/AuthValidator"
import * as bycrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import Env from "../../utils/variable/Env"


export default new class AdminAuthService {
  private readonly adminAuthRepository: Repository<Admin> = AppDataSource.getRepository(Admin)

  async registerAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body

      const { error, value } = adminRegisterSchema.validate(body)
      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "REGISTER FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      const isCheckEmailAdmin = await this.adminAuthRepository.findOne({
        where: { email: value.email }
      })
      const isCheckUsernameAdmin = await this.adminAuthRepository.findOne({
        where: { username: value.username }
      })
      if (isCheckEmailAdmin || isCheckUsernameAdmin) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "EMAIL OR USERNAME ALREADY EXISTS, TRY ANOTHER ONE",
          })
      }

      const hashedPassword = await bycrypt.hash(value.password, 10)
      const adminData = this.adminAuthRepository.create({
        email: value.email,
        password: hashedPassword,
        fullname: value.fullname,
        username: value.username,
        profile_picture: null,
      })
      const adminCreated = await this.adminAuthRepository.save(adminData)
      return res
        .status(201)
        .json({
          code: 201,
          message: "USER CREATED",
          data: adminCreated
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


  async loginAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const body = req.body
      // console.log(body);

      const { error, value } = adminLoginSchema.validate(body)
      if (error) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "LOGIN FAILED, CHECK YOUR INPUT",
            error: error
          })
      }

      const isCheckUsername = await this.adminAuthRepository.findOne({
        where: { username: value.username }
      })
      const isCheckPassword = await bycrypt.compare(
        value.password,
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
      console.log("time", Env.EXPRESS_JWT_EXPIRED_TIME);

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
          data: error
        })
    }
  }


  async checkAuthAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const auth = res.locals.auth
      // console.log(auth);

      const adminData = await this.adminAuthRepository.findOne({
        where: { id: auth.id }
      })
      return res
        .status(200)
        .json({
          code: 200,
          message: "AUTH SUCCESS",
          data: adminData
        })

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR",
          error: error
        })
    }
  }


  // async logout(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const {token} = req.params
  //     await this.

  //   } catch (error) {

  //   }
  // }
}