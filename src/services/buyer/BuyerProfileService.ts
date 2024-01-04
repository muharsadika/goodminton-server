import { Request, Response } from "express"
import { Repository } from "typeorm"
import { Buyer } from "../../../database/entities/BuyerEntity"
import { AppDataSource } from "../../data-source"
import { uploadToCloudinary } from "../../utils/cloudinary/CloudinaryUploader"
import { deleteFile } from "../../utils/file/fileHelper"


export default new class BuyerProfileService {
  private readonly authRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)
  async updateProfileBuyer(req: Request, res: Response): Promise<Response> {
    try {
      const auth = res.locals.auth
      const {
        fullname,
        username,
        email,
        phone,
        address,
        profile_picture
      } = req.body

      const buyerData = await this.authRepository.findOne({
        where: { id: auth.id }
      })

      if (!buyerData) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "AUTH FAILED, CHECK YOUR INPUT",
          })
      }

      let clourinary_buyer_profile_picture: string = ""
      if (req.file?.filename) {
        clourinary_buyer_profile_picture = await uploadToCloudinary(req.file)
        deleteFile(req.file.path)
      }

      const profileBuyerData = await this.authRepository.save({
        fullname: fullname,
        username: username,
        email: email,
        phone: phone,
        address: address,
        profile_picture: clourinary_buyer_profile_picture
      })

      const profilePictureDataUpdated = await this.authRepository.save(profileBuyerData)

      return res
        .status(200)
        .json({
          code: 200,
          message: "PROFILE UPDATED",
          data: profilePictureDataUpdated
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