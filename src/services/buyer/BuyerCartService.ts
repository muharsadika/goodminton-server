import { Repository } from "typeorm"
import { Cart } from "../../../database/entities/CartEntity"
import { Product } from "../../../database/entities/ProductEntity"
import { AppDataSource } from "../../data-source"
import { Request, Response } from "express"


export default new class BuyerCartService {
  private readonly productRepository: Repository<Product> = AppDataSource.getRepository(Product)
  private readonly cartRepository: Repository<Cart> = AppDataSource.getRepository(Cart)

  async createCart(req: Request, res: Response): Promise<Response> {
    try {
      const {
        product_id,
        product_quantity
      } = req.body

      const productFind = await this.productRepository.findOne({
        where: { id: product_id }
      })

      if (!productFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT NOT FOUND"
          })
      }

      const cartFind = await this.cartRepository.findOne({
        where: { product: product_id }
      })

      if (cartFind) {
        return res
          .status(400)
          .json({
            code: 400,
            message: "PRODUCT ALREADY IN CART"
          })
      }

    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({
          code: 500,
          message: "INTERNAL SERVER ERROR"
        })
    }
  }
}