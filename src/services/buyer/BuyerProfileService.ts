import { Request, Response } from "express"
import { Repository } from "typeorm"
import { Buyer } from "../../../database/entities/BuyerEntity"
import { AppDataSource } from "../../data-source"


export default new class BuyerProfileService {
  private readonly authRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)
  async updateProfile(req: Request, res: Response): Promise<Response> {
    try {
      const {
        fullname,
        username,
        email,
        phone,
        address,
        profile_picture
      } = req.body

      const auth = res.locals.auth

      const buyerData = await this.authRepository.findOne({
        where: { id: auth.id }
      })

      if (!buyerData) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "AUTH FAILED, CHECK YOUR INPUTs",
          })
      }

      const buyerProfileUpdate = await this.authRepository.save({
        fullname,
        username,
        email,
        phone,
        address,
        profile_picture
      })

      return res
        .status(200)
        .json({
          code: 200,
          message: "PROFILE UPDATED",
          data: buyerProfileUpdate
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