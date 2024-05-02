import { Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { buyerRegisterSchema, buyerLoginSchema } from "../../utils/validator/AuthValidator"
import * as bycrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { uploadToCloudinary } from "../../utils/cloudinary/CloudinaryUploader"
import { deleteFile } from "../../utils/file/fileHelper"
import { Repository } from "typeorm"
import { Buyer } from "../../../database/entities/BuyerEntity"
import Env from "../../utils/variable/Env"

export default new class AuthService {
  private readonly authRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)

  async registerBuyer(req: Request, res: Response): Promise<Response> {
    try {
      const {
        fullname,
        username,
        email,
        password,
        profile_picture
      } = req.body

      const { error, value } = buyerRegisterSchema.validate({
        fullname,
        username,
        email,
        password,
        profile_picture
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

      let clourinary_profile_picture: string = ""
      if (req.file?.filename) {
        clourinary_profile_picture = await uploadToCloudinary(req.file)
        deleteFile(req.file.path)
      }

      const hashedPassword = await bycrypt.hash(value.password, 10)
      const userData = this.authRepository.create({
        email: value.email,
        password: hashedPassword,
        fullname: value.fullname,
        username: value.username,
        profile_picture: clourinary_profile_picture,
        address: null,
        phone: null,
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
        username, password
      } = req.body

      const { error, value } = buyerLoginSchema.validate({
        username, password
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


  async CheckAuthBuyer(req: Request, res: Response): Promise<Response> {
    try {
      const auth = res.locals.auth
      console.log(auth);

      const buyerData = await this.authRepository.findOne({
        where: { id: auth.id },
        // relations: ["carts"],

        // select: {
        //   id: true,
        //   fullname: true,
        //   username: true,
        //   email: true,
        //   address: true,
        //   phone: true,
        //   profile_picture: true,
        //   carts: true
        // }
      })

      if (!buyerData) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "AUTH FAILED, CHECK YOUR INPUT",
          })
      }

      return res
        .status(200)
        .json({
          code: 200,
          message: "AUTH SUCCESS",
          data: buyerData
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