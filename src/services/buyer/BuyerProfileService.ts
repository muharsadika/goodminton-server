import { Request, Response } from "express"
import { Repository } from "typeorm"
import { Buyer } from "../../../database/entities/BuyerEntity"
import { AppDataSource } from "../../data-source"
import { uploadToCloudinary, extractPublicIdFromImageUrl, deleteFromCloudinary } from "../../utils/cloudinary/CloudinaryUploader"
import { deleteFile } from "../../utils/file/fileHelper"
import { Product } from "../../../database/entities/ProductEntity"


export default new class BuyerProfileService {
  private readonly authRepository: Repository<Buyer> = AppDataSource.getRepository(Buyer)
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)

  async getProfileBuyer(req: Request, res: Response): Promise<Response> {
    try {
      const auth = res.locals.auth
      const buyer = await this.authRepository.findOne({
        where: { id: auth.id },
        relations: ["carts", "carts.product"],
      })

      const buyerWithProduct = {
        ...buyer,
        carts: buyer.carts.map((cart) => ({
          ...cart,
          // product_name: cart.product.product_name,
          subtotal: cart.product.product_price * cart.product_quantity
        })),
        total: buyer.carts.reduce((acc, cart) => acc + (cart.product.product_price * cart.product_quantity), 0),
      }

      // const totalPrice = buyerWithProduct.carts.reduce((total, cart) => total + cart.subtotal, 0);

      return res
        .status(200)
        .json({
          code: 200,
          data: buyerWithProduct
        })
    } catch (error) {
      return res
        .status(500)
        .json({
          code: 500,
          message: "PROFILE FETCH FAILED",
          error: error
        })
    }
  }


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

      const buyerFind = await this.authRepository.findOne({
        where: { id: auth.id }
      })

      if (!buyerFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "AUTH FAILED, CHECK YOUR INPUT",
          })
      }

      let clourinary_buyer_profile_picture: string = ""
      if (req.file?.filename) {
        if (buyerFind.profile_picture) {
          const publicId = extractPublicIdFromImageUrl(buyerFind.profile_picture);
          await deleteFromCloudinary(publicId);
        }
        clourinary_buyer_profile_picture = await uploadToCloudinary(req.file)
        deleteFile(req.file.path)
      }

      if (fullname) buyerFind.fullname = fullname
      if (username) buyerFind.username = username
      if (email) buyerFind.email = email
      if (phone) buyerFind.phone = phone
      if (address) buyerFind.address = address
      if (clourinary_buyer_profile_picture) buyerFind.profile_picture = clourinary_buyer_profile_picture

      const profilePictureDataUpdated = await this.authRepository.save(buyerFind)

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

  //test!
}